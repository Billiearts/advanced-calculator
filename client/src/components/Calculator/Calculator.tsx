import { useReducer } from "react"; // Remove useEffect import since it's not used
import Display from "./Display";
import Keypad from "./Keypad";
import ScientificPanel from "./ScientificPanel";
import FinancialPanel from "./FinancialPanel";
import api from "../../api/api";

type Mode = "scientific" | "financial";

type State = {
  input: string;
  output: string;
  mode: Mode;
};

type Action =
  | { type: "INPUT"; payload: string }
  | { type: "CLEAR" }
  | { type: "DELETE" }
  | { type: "SET_OUTPUT"; payload: string }
  | { type: "TOGGLE_MODE"; payload?: Mode };

const initialState: State = { input: "", output: "", mode: "scientific" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INPUT":
      return { ...state, input: state.input + action.payload };
    case "CLEAR":
      return { ...state, input: "", output: "" };
    case "DELETE":
      return { ...state, input: state.input.slice(0, -1) };
    case "SET_OUTPUT":
      return { ...state, output: action.payload };
    case "TOGGLE_MODE":
      return { ...state, mode: action.payload || (state.mode === "scientific" ? "financial" : "scientific") };
    default:
      return state;
  }
}

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Calculator</h2>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => dispatch({ type: "TOGGLE_MODE" })}
          >
            Mode: {state.mode}
          </button>
        </div>

        <Display input={state.input} output={state.output} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Keypad
              onInput={(s) => dispatch({ type: "INPUT", payload: s })}
              onClear={() => dispatch({ type: "CLEAR" })}
              onDelete={() => dispatch({ type: "DELETE" })}
              onEvaluate={(result) => {
                dispatch({ type: "SET_OUTPUT", payload: result });
                // save to server:
                api.post("/calculations", { expression: state.input, result, type: state.mode }).catch(console.error);
              }}
            />
          </div>

          <div>
            {state.mode === "scientific" ? (
              <ScientificPanel onInsert={(s) => dispatch({ type: "INPUT", payload: s })} />
            ) : (
              <FinancialPanel onResult={(expression, result) => {
                dispatch({ type: "SET_OUTPUT", payload: result });
                api.post("/calculations", { expression, result, type: "financial" }).catch(console.error);
              }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}