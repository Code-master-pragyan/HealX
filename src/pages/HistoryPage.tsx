import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHistory } from "../services/historyService";
import HistoryCard from "../components/HistoryCard";
import { Clock, ArrowLeft  } from "lucide-react";

function HistoryPage() {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory().then(setHistory).catch(console.error);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">

            {/* Back Button */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Diagnosis
            </button>

            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Clock className="text-blue-600" />
                Diagnosis History
            </h1>

            <p className="text-gray-600 mb-6">
                View the previously diagnosed cases.
            </p>

            <div className="space-y-6 mt-5">
                {history.length === 0 && (
                    <div className="text-gray-500 p-6 bg-gray-100 rounded-xl text-center">
                        No past diagnoses found.
                    </div>
                )}

                {history.map((item: any) => (
                    <div key={item.id} className="py-2">
                        <HistoryCard item={item} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default HistoryPage;
