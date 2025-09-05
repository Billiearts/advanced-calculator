export default function ScientificPanel({ onInsert } : { onInsert: (s: string) => void }) {
  const btns = ["sin(", "cos(", "tan(", "log(", "ln(", "pi", "e", "^", "(", ")"];
  return (
    <div className="grid grid-cols-2 gap-2">
      {btns.map(b => (
        <button key={b} onClick={() => onInsert(b === "pi" ? "pi" : b)} className="p-2 bg-blue-100 rounded">
          {b}
        </button>
      ))}
    </div>
  );
}
