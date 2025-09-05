import { useState } from "react";
import { fv } from "../../utils/financial"; // Only import what you're using

export default function FinancialPanel({ onResult } : { onResult: (expr: string, result: string) => void }) {
  // provide simple FV/PV forms for demonstration
  const [pvVal, setPvVal] = useState("");
  const [rate, setRate] = useState("");
  const [n, setN] = useState("");

  const handleFV = () => {
    const r = parseFloat(rate) / 100;
    const nNum = parseFloat(n);
    const pvNum = parseFloat(pvVal);
    const result = fv(pvNum, r, nNum);
    onResult(`${pvNum}*(1+${r})^${nNum}`, String(result));
  };

  return (
    <div>
      <div className="mb-2">FV from PV</div>
      <input placeholder="PV" value={pvVal} onChange={e=>setPvVal(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input placeholder="rate (%)" value={rate} onChange={e=>setRate(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <input placeholder="periods" value={n} onChange={e=>setN(e.target.value)} className="w-full mb-2 p-2 border rounded" />
      <button onClick={handleFV} className="w-full bg-green-500 text-white p-2 rounded">Calculate FV</button>
      {/* Add more forms for PV, NPV, IRR as needed */}
    </div>
  );
}