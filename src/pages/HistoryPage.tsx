import { useEffect, useState } from "react";
import { fetchHistory } from "../services/historyService";
import HistoryCard from "../components/HistoryCard";
import { Clock } from "lucide-react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory().then(setHistory).catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
        <Clock className="text-blue-600" />
        Diagnosis History
      </h1>

      <p className="text-gray-600 mb-6">
        View the previously diagnosed cases (offline + online mode supported).
      </p>

      <div className="space-y-4">
        {history.length === 0 && (
          <div className="text-gray-500 p-6 bg-gray-100 rounded-xl text-center">
            No past diagnoses found.
          </div>
        )}

        {history.map((item: any) => (
          <HistoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
