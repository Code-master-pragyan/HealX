import { useState, useEffect } from 'react';
import Header from './components/Header';
import InputCard from './components/InputCard';
import OutputCard from './components/OutputCard';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailsPage from "./pages/HistoryDetailsPage";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { analyzeSymptomsWithGemini } from './services/geminiService';
import type { PatientData, DiagnosisResult } from './types';
import { generateOfflineResponse } from "./offlineTriage";

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [language, setLanguage] = useState("en");
  const [isOnline, setIsOnline] = useState(true);

  const location = useLocation(); // ← add this

  const handleAnalyze = async (patientData: PatientData) => {
    setIsAnalyzing(true);
    setError('');
    setDiagnosisResult(null);

    if (!isOnline) {
      const offlineResult = generateOfflineResponse(
        patientData.symptoms,
        language
      );
      setDiagnosisResult(offlineResult);
      setIsAnalyzing(false);
      return;
    }

    try {
      const result = await analyzeSymptomsWithGemini({
        ...patientData,
        language,
      });
      setDiagnosisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50">

      {/* Hide Header for SignIn + SignUp */}
      {location.pathname !== "/Signup" && location.pathname !== "/Signin" && (
        <Header language={language} setLanguage={setLanguage} />
      )}

      <main className="container mx-auto px-4 py-8 max-w-6xl">

        <Routes>
          <Route path="/" element={
            <>
              {!isOnline && (
                <div className="p-3 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg mb-4 text-center">
                  ⚠️ Offline Mode Enabled — Showing Safe Triage Recommendations Only
                </div>
              )}

              <InputCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} language={language} />

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {diagnosisResult && <OutputCard result={diagnosisResult} isOnline={isOnline} />}
            </>
          } />

          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetailsPage />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Signin" element={<SignIn />} />
        </Routes>

      </main>

      <Footer />
    </div>
  );
}

export default App;
