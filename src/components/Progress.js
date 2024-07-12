function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
  choice,
}) {
  return (
    <header className="progress">
      <progress
        className={`${choice}-progress`}
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
