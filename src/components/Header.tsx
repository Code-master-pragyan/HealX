import { Stethoscope } from 'lucide-react';
import { Link } from "react-router-dom";


interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

function Header({ language, setLanguage }: HeaderProps) {
  return (
    <header className="bg-white shadow-md border-b border-blue-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-3 rounded-xl shadow-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                AI Medical Diagnosis Assistant
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Designed for Rural Healthcare Centers in India
              </p>
            </div>
          </div>

          <Link to="/history" className="text-blue-600 font-medium">
            History
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              AI-Powered
            </span>

            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={language}
              onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>
        </div>

        <div className="md:hidden mt-4 flex gap-3">
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            AI-Powered
          </span>

          <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" value={language}
            onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
