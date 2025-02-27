import React from "react";
import Options from "./Options";

function Question({ question, dispatch, answer }) {
  console.log("the question is", question.options);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
