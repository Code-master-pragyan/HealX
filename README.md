# HealX – AI Medical Diagnosis Assistant for Rural India 🇮🇳  
### *Smart Symptom Analysis • Offline Triage • Multilingual Care*

---

## 🏷️ Badges  
![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-blue)  
![Tailwind](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)  
![Flask](https://img.shields.io/badge/Backend-Flask%20(Python)-yellow)  
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)  
![Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange)  
![Offline](https://img.shields.io/badge/Offline--Support-Enabled-green)  
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🧩 Overview  
**HealX** is an AI-powered medical diagnosis assistant specifically designed for **rural India**, where healthcare access is still limited.  
Developed for the **GUVI Hackathon**, HealX empowers frontline workers, rural patients, and small clinics with fast diagnosis, emergency detection, and multilingual medical explanations.

Powered by **Gemini 2.5 Flash**, with **automatic fallback to Gemini Pro**, HealX ensures reliable AI responses even under variable network conditions.  
Combined with a strong offline mode and local SQLite storage, it remains functional even in low-connectivity villages.

---

## 🚨 Problem Statement  
Rural India experiences significant healthcare challenges:

- 🚑 **Shortage of medical specialists**  
- 📶 **Weak or inconsistent internet connectivity**  
- 🗣️ **Language barriers in healthcare communication**  
- ⏱️ **Delay in emergency triage and diagnosis**

**HealX** addresses these challenges by providing an AI-driven, multilingual, offline-capable medical assistant accessible to anyone.

---

## ⭐ Key Features  

- 🤖 **AI Symptom Analysis** using Gemini 2.5 Flash  
- 🩺 **Differential Diagnosis** with confidence scoring  
- 🧒 **Child-safe Age + Weight Based Dosage Estimates**  
- ⚠️ **Emergency Detection & Referral Alerts**  
- 💊 **Basic Drug Interaction Warnings**  
- 📡 **Offline Safe-Triage Mode** for low network areas  
- 💾 **SQLite-based Patient History (Local Storage)**  
- 🔄 **Automatic AI Model Fallback (Flash → Pro)**  
- 🌐 **Multilingual Support** (English, Hindi, Tamil, Telugu, Bengali)  
- 🧑‍🤝‍🧑 **Patient-friendly explanations** in user-selected language  


---

## 🛠️ Tech Stack  

### **Frontend**
- React  
- TypeScript  
- Tailwind CSS  

### **Backend**
- Python  
- Flask  

### **Database**
- SQLite  

### **AI Model**
- Gemini 2.5 Flash (Primary)  
- Gemini Pro (Fallback)

---

## 🔍 How HealX Works  

1. User enters symptoms, age, weight, and preferred language.  
2. Frontend sends data to Flask backend.  
3. Backend queries **Gemini Flash** for diagnosis.  
4. If the Flash model fails, system automatically switches to **Gemini Pro**.  
5. AI generates:  
   - Differential diagnosis  
   - Confidence scores  
   - Dosage recommendations  
   - Drug interaction warnings  
   - Emergency referral check  
6. Result is translated (if needed) into the selected language.  
7. Data is saved to **SQLite local history**.  
8. If offline, HealX uses a **local safe-triage workflow** with cached mappings.


---

## ⚙️ Setup Instructions  

### 🔧 **Backend Setup (Flask)**  

```bash
# Clone the repository
git clone https://github.com/yourusername/healx.git
cd healx/backend

# Create virtual environment
python -m venv venv

# Activate environment
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run Flask backend
python app.py
```

### 🔧 **Frontend Setup (TypeScript + React)** 

```bash
cd healx/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 👥 Team

HealX was created as a submission to the GUVI Hackathon, built with dedication to improving healthcare access for rural India.
