import { ChevronRight, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

function HistoryCard({ item }: any) {
  const diseaseName = item.result?.diseases?.[0]?.name || "Unknown";

  return (
    <Link to={`/history/${item.id}`}>
      <div className="p-5 bg-white rounded-2xl shadow border hover:shadow-lg transition cursor-pointer flex justify-between items-center">

        <div>
          <p className="text-sm text-gray-500">{item.timestamp}</p>

          <h2 className="text-xl font-semibold text-blue-700 mt-1 flex items-center gap-1">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            {diseaseName}
          </h2>

          <p className="text-gray-600 mt-1 line-clamp-1">
            Symptoms: {item.symptoms}
          </p>
        </div>

        <ChevronRight className="text-gray-400" />
      </div>
    </Link>
  );
}

export default HistoryCard;
