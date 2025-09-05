import { useEffect, useState } from "react";
import api from "../api/api";

interface HistoryItem {
  _id: string;
  expression: string;
  result: string;
  createdAt: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  useEffect(() => {
    api.get("/calculations").then(res => setHistory(res.data)).catch(console.error);
  }, []);

  const favorite = (calcId: string) => {
    api.post("/favorites", { calculationId: calcId }).then(() => alert("Favorited")).catch(console.error);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Calculation History</h2>
      <ul>
        {history.map(h => (
          <li key={h._id} className="bg-white p-3 mb-2 rounded flex justify-between">
            <div>
              <div className="text-sm text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
              <div className="font-mono">{h.expression} = {h.result}</div>
            </div>
            <button onClick={() => favorite(h._id)} className="bg-yellow-400 px-3 py-1 rounded">⭐</button>
          </li>
        ))}
      </ul>
    </div>
  );
}