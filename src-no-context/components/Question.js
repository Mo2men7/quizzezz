import Options from "./Options";

function Question({ question, dispatch, answer, choice }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        choice={choice}
      />
    </div>
  );
}

export default Question;
