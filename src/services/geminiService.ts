export type PatientData = {
  symptoms: string;
  age: number;
  weight: number;
  gender?: string;
  medicalHistory?: string;
  language?: string;
};

export type DiagnosisResult = {
  diseases: { name: string; confidence: number }[];
  immediateRecommendations: string[];
  dosageRecommendations: string[];
  referralWarning?: string;
  patientExplanation?: string;
};

const API_BASE = import.meta.env.VITE_API_URL;

export async function analyzeSymptomsWithGemini(data: PatientData): Promise<DiagnosisResult> {
  const res = await fetch(`${API_BASE}/api/diagnose`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  return (await res.json()) as DiagnosisResult;
}
