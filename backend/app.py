from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json
from dotenv import load_dotenv

from database import create_tables, save_diagnosis, get_last_diagnoses

# Load .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize database
create_tables()


# ----------------------------------------------------
# Detect complex cases → required for Pro model
# ----------------------------------------------------
def is_complex_case(symptoms: str) -> bool:
    symptoms = symptoms.lower()
    red_flags = [
        "chest pain",
        "unconscious",
        "seizure",
        "convulsion",
        "difficulty breathing",
        "breathing difficulty",
        "respiratory distress",
        "bleeding",
        "pregnancy",
        "severe abdominal pain",
        "blood in stool",
        "blood vomiting"
    ]
    return any(flag in symptoms for flag in red_flags)


# ----------------------------------------------------
# GEMINI CALL (models/2.5-flash → fallback to 2.5-pro)
# ----------------------------------------------------
def call_gemini(prompt, use_pro=False, timeout_seconds=25):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("❌ GEMINI_API_KEY missing in .env")

    # Correct model names from your API list
    model = "models/gemini-2.5-pro" if use_pro else "models/gemini-2.5-flash"

    print(f"🤖 Using model: {model}")

    # Correct API endpoint
    url = f"https://generativelanguage.googleapis.com/v1beta/{model}:generateContent?key={api_key}"

    headers = {"Content-Type": "application/json"}

    # Correct request structure
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=timeout_seconds)
        response.raise_for_status()
        return response.json()

    except Exception as err:
        print("⚠️ Flash failed → switching to Pro...", err)
        if not use_pro:
            return call_gemini(prompt, use_pro=True)
        raise err


# ----------------------------------------------------
# DIAGNOSE ENDPOINT
# ----------------------------------------------------
@app.route("/api/diagnose", methods=["POST"])
def diagnose():
    data = request.get_json() or {}

    symptoms = data.get("symptoms", "")
    age = data.get("age", 0)
    weight = data.get("weight", 0)
    gender = data.get("gender", "")
    history = data.get("medicalHistory", "")
    language = data.get("language", "en")

    use_pro = is_complex_case(symptoms)

    prompt = f"""
You are an experienced medical diagnostic assistant for rural India.
Respond ONLY with valid JSON. No markdown.

PATIENT:
Age: {age}
Weight: {weight}
Gender: {gender}
Symptoms: {symptoms}
{f"Medical History: {history}" if history else ""}

LANGUAGE: {language}

OUTPUT FORMAT:
{{
  "diseases": [
    {{"name": "Disease name", "confidence": 80}}
  ],
  "immediateRecommendations": ["string"],
  "dosageRecommendations": ["string"],
  "referralWarning": "string",
  "patientExplanation": "string"
}}

RULES:
- List 2–4 possible diseases (confidence 0–100).
- Provide safe recommendations (ORS, hydration, rest).
- Paracetamol dosage = 15 mg × weight (kg) per dose.
- NO antibiotics or injections.
- If danger signs → emergency referral.
- patientExplanation must be in {language}.
- Add disclaimer: "This is not a replacement for a doctor."
- Return ONLY JSON.
"""

    try:
        raw = call_gemini(prompt, use_pro=use_pro)

        # Extract proper response from Gemini v1beta output
        candidates = raw.get("candidates", [])
        if not candidates:
            raise ValueError("❌ AI returned no candidates")

        parts = candidates[0]["content"].get("parts", [])
        if not parts:
            raise ValueError("❌ AI returned no content parts")

        text_out = parts[0].get("text", "")
        if not text_out:
            raise ValueError("❌ AI returned empty text")

        result = json.loads(text_out)

        save_diagnosis(symptoms, result, language)

        return jsonify(result)

    except Exception as e:
        print("❌ AI ERROR:", e)

        fallback = {
            "diseases": [{"name": "General Infection (Offline Mode)", "confidence": 50}],
            "immediateRecommendations": ["ORS", "Hydration", "Rest"],
            "dosageRecommendations": [f"Paracetamol: {15 * weight} mg every 6–8 hours"],
            "referralWarning": "Visit nearest PHC if symptoms worsen.",
            "patientExplanation": "AI unavailable. This is a safe fallback triage. Not a replacement for a doctor."
        }

        save_diagnosis(symptoms, fallback, language)
        return jsonify(fallback), 503


# ----------------------------------------------------
# HISTORY ENDPOINT
# ----------------------------------------------------
@app.route("/api/history", methods=["GET"])
def history():
    return jsonify(get_last_diagnoses())


# ----------------------------------------------------
# START SERVER
# ----------------------------------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
