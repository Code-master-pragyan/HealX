export interface PatientData {
  symptoms: string;
  age: number;
  weight: number;
  gender: string;
  medicalHistory: string;
  language?: string;
}

export interface Disease {
  name: string;
  confidence: number;
}

export type DiagnosisResult = {
  diseases: { name: string; confidence: number }[];
  immediateRecommendations: string[];
  dosageRecommendations: string[];
  referralWarning?: string;
  patientExplanation?: string;
};
