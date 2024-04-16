import DateCounter from "./DateCounter";
import Header from "./Header";
import Mmain from "./Mmain";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import NextButton from "./NextButton";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";

import { useEffect, useReducer } from "react";


const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      // to get which question we are in?
      const que = state.questions.at(state.index);
      console.log("thee question present", que);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === que.correctOption
            ? state.points + que.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

      case "finish": return{...state, status:'finished' ,highScore: state.points>state.highScore ? state.points:state.highScore }

    default:
      throw new Error("unkown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highScore } = state;
  // console.log('state is', state, questions, status)

  // calculate derived state
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  console.log("the check is", questions[index]);

  return (
    <div className="app">
      <Header />

      <Mmain>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton dispatch={dispatch} answer={answer} index={index}numQuestions={numQuestions} />
          </>
        )}

{status==='finished' && <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} />}
      </Mmain>
    </div>
  );
}

export default App;
