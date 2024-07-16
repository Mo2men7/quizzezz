import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions: num, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the React quiz</h2>
      <h3>{num} questions to test your mastery</h3>
      <button
        style={{ marginBottom: "10px" }}
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "backToChoice" })}
      >
        Back to Choice
      </button>
    </div>
  );
}

export default StartScreen;
