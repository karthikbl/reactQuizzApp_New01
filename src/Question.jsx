import React from "react";

function Question({ question }) {
  console.log("the question is", question.options);
  return (
    <div>
      <h4>{question.question}</h4>
    
    </div>
  );
}

export default Question;
