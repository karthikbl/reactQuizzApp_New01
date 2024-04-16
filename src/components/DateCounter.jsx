import { useReducer } from "react";

const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  console.log(state, action);
  // if (action.type === "inc") return state + 1;
  // if (action.type === "dec") return state - 1;
  // if (action.type === "setCount") return action.payload;

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
      case "reset":
        return initialState
    default:
      throw new Error("unknown action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // date part
  const date = new Date();
  date.setDate(date.getDate() + count);
  console.log(date);

  const decrement = () => {
    // setCount((c) => c - 1);
    // setCount((c) => c - step);

    dispatch({ type: "dec" });
  };

  const increment = () => {
    // setCount((c) => c + 1);
    // setCount((c) => c + step);
    dispatch({ type: "inc" });
  };

  const defineStep = (e) => {
    // console.log("value frm defineStep", Number(e.target.value));
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const defineCount = (e) => {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const reset = () => {
    // setCount(0);
    // setStep(1);
    dispatch({type:'reset'})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={decrement}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={increment}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>reset!</button>
      </div>
    </div>
  );
}
export default DateCounter;
