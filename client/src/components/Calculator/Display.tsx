export default function Display({ input, output }: { input: string; output: string; }) {
  return (
    <div className="bg-gray-50 p-4 rounded">
      <div className="text-right text-sm text-gray-500">{input}</div>
      <div className="text-right text-2xl font-mono">{output || "0"}</div>
    </div>
  );
}
