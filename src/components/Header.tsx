import { Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useState } from "react";

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

function Header({ language, setLanguage }: HeaderProps) {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/Signin");
    } catch (err: any) {
      console.error(err?.message || err);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md border-b border-blue-100">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center justify-between">

            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-3 rounded-xl shadow-lg">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">HealX</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Designed for Rural Healthcare Centers in India
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <Link
                to="/history"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition"
              >
                History
              </Link>

              <div className="hidden md:flex items-center gap-3">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  AI-Powered
                </span>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                  <option value="bn">বাংলা</option>
                </select>
              </div>

              <button
                onClick={() => setShowLogoutDialog(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-sm transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
