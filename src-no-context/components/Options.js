function Options({ question, dispatch, answer, choice }) {
  const hasAnswered = answer !== null;
  return (
    <>
      <div className="options">
        {question.options.map((opt, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? `${choice}-correct`
                  : `${choice}-wrong`
                : ""
            }`}
            key={opt}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

export default Options;
