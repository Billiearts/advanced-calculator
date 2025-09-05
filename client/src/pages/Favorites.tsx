import { useEffect, useState } from "react";
import api from "../api/api";

interface Calculation {
  expression: string;
  result: string;
}

interface Favorite {
  _id: string;
  calculation: Calculation;
  createdAt: string;
}

export default function Favorites() {
  const [favs, setFavs] = useState<Favorite[]>([]);
  
  useEffect(() => { 
    api.get("/favorites").then(res => setFavs(res.data)).catch(console.error); 
  }, []);
  
  const remove = (id: string) => { 
    api.delete(`/favorites/${id}`).then(() => setFavs(favs.filter(f => f._id !== id))).catch(console.error); 
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      {favs.map(f => (
        <div key={f._id} className="bg-white p-3 mb-2 rounded flex justify-between">
          <div>
            <div className="text-sm text-gray-500">{new Date(f.createdAt).toLocaleString()}</div>
            <div className="font-mono">{f.calculation.expression} = {f.calculation.result}</div>
          </div>
          <button onClick={() => remove(f._id)} className="bg-red-400 px-3 py-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
}