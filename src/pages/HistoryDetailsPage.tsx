import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHistory } from "../services/historyService";
import OutputCard from "../components/OutputCard";

function HistoryDetailsPage() {
  const { id } = useParams();
  const [record, setRecord] = useState<any>(null);

  useEffect(() => {
    fetchHistory().then((all) => {
      const found = all.find((x: any) => String(x.id) === id);
      setRecord(found);
    });
  }, [id]);

  if (!record)
    return (
      <div className="p-10 text-center text-gray-500">
        Loading diagnosis...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Diagnosis Details</h1>
      <OutputCard result={record.result} isOnline={true} />
    </div>
  );
}

export default HistoryDetailsPage;
