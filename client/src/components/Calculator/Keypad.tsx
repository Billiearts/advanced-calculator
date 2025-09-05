export default function Keypad({ onInput, onClear, onDelete, onEvaluate } : {
  onInput: (s: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEvaluate: (result: string) => void;
}) {
  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","=", "+"
  ];

  const handleClick = (btn: string) => {
    if (btn === "=") {
      try {
        // Use a safer approach than eval
        const currentExpression = (window as unknown as { currentExpression?: string }).currentExpression || "";
        
        // Simple expression evaluation (for demonstration only)
        // In production, use a proper math evaluation library like mathjs
        const sanitizedExpression = currentExpression
          .replace(/[^-()\d/*+.]/g, '') // Basic sanitization
          .replace(/(\d)(\()/g, '$1*$2') // Handle implicit multiplication: 2(3) -> 2*(3)
          .replace(/(\))(\d)/g, '$1*$2'); // Handle implicit multiplication: (2)3 -> (2)*3
        
        const result = Function(`"use strict"; return (${sanitizedExpression})`)();
        onEvaluate(String(result));
      } catch (err) {
        console.error("Evaluation error:", err);
        onEvaluate("Error");
      }
      return;
    }
    onInput(btn);
    
    // Update the global currentExpression with proper typing
    const windowWithExpression = window as unknown as { currentExpression?: string };
    windowWithExpression.currentExpression = (windowWithExpression.currentExpression || "") + btn;
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <button onClick={onClear} className="col-span-2 p-2 bg-red-200 rounded">C</button>
      <button onClick={onDelete} className="p-2 bg-yellow-100 rounded">DEL</button>
      <div />
      {buttons.map(b => (
        <button key={b} onClick={() => handleClick(b)} className="p-3 bg-gray-100 rounded">{b}</button>
      ))}
    </div>
  );
}