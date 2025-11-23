import { AlertTriangle, Pill, FileText, AlertCircle, MessageSquare } from 'lucide-react';
import type { DiagnosisResult } from '../types';

interface OutputCardProps {
  result: DiagnosisResult;
  isOnline: boolean;
}

function OutputCard({ result, isOnline }: OutputCardProps) {
  return (
    <div className="mt-8 space-y-6 animate-slideUp">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          Diagnosis Results
        </h2>
        {!isOnline && (
          <div className="p-4 bg-yellow-200 text-yellow-800 rounded-lg border border-yellow-300 text-center">
            ⚠️ Offline Mode Active — Showing Safe Triage Only
          </div>
        )}


        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Possible Diseases (Differential Diagnosis)
            </h3>
            <div className="space-y-3">
              {result.diseases.map((disease, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <span className="font-semibold text-gray-800">{disease.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-teal-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${disease.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-blue-600 min-w-[3rem]">
                      {disease.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-green-600" />
              Recommended Immediate Treatment
            </h3>
            <ul className="space-y-2">
              {result.immediateRecommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-purple-600" />
              Dosage Recommendations
            </h3>
            <ul className="space-y-2">
              {result.dosageRecommendations.map((dosage, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{dosage}</span>
                </li>
              ))}
            </ul>
          </div>

          {result.referralWarning && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-300">
              <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Referral Warning
              </h3>
              <p className="text-gray-800 font-medium">{result.referralWarning}</p>
            </div>
          )}

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              Explanation in Simple Language
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.patientExplanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutputCard;
