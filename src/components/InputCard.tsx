import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import type { PatientData } from '../types';
import toast from "react-hot-toast";

interface InputCardProps {
  onAnalyze: (data: PatientData) => void;
  isAnalyzing: boolean;
  language: string;
}

function InputCard({ onAnalyze, isAnalyzing, language  }: InputCardProps) {
  const [formData, setFormData] = useState<PatientData>({
    symptoms: '',
    age: 0,
    weight: 0,
    gender: '',
    medicalHistory: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.symptoms.trim()) {
      toast.error("Please enter patient symptoms");
      return;
    }

    if (!formData.age || formData.age <= 0) {
      toast.error("Please enter a valid age");
      return;
    }

    if (!formData.weight || formData.weight <= 0) {
      toast.error("Please enter a valid weight");
      return;
    }

    if (!formData.gender) {
      toast.error("Please select a gender");
      return;
    }

    onAnalyze({...formData, language});
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Search className="w-6 h-6 text-blue-500" />
        Patient Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Patient Symptoms *
          </label>
          <textarea
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            placeholder="e.g., Fever for 3 days, headache, body pain, loss of appetite"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            rows={4}
            disabled={isAnalyzing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age (years) *
            </label>
            <input
              type="number"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              placeholder="25"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight (kg) *
            </label>
            <input
              type="number"
              value={formData.weight || ''}
              onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
              placeholder="65"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              disabled={isAnalyzing}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Medical History (Optional)
          </label>
          <textarea
            value={formData.medicalHistory}
            onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
            placeholder="e.g., Diabetes, hypertension, previous surgeries, allergies"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
            rows={3}
            disabled={isAnalyzing}
          />
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing symptoms...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Analyze Symptoms
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default InputCard;
