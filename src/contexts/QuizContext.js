import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const quizNames = [
  { id: 8000, name: "React" },
  { id: 8001, name: "Angular" },
  { id: 8002, name: "Laravel" },
];
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  choice: "",
  choiceID: null,
};
const SECS_PER_QUESTION = 11;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // return { ...state, index: 0, answer: null, points: 0, status: "active" };
      return { ...initialState, questions: state.questions, status: "ready" };
    case "second":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "setChoice":
      return {
        ...state,
        choice: action.payload.name,
        choiceID: action.payload.id,
      };
    case "backToChoice":
      return { ...initialState };
    default:
      throw new Error("Action unknown");
  }
}
function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      choice,
      choiceID,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(
    function () {
      if (choiceID) {
        fetch(`http://localhost:${choiceID}/questions`)
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch((err) => dispatch({ type: "dataFailed" }));
      }
    },
    [choiceID]
  );
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        choice,
        choiceID,
        numQuestions,
        maxPossiblePoints,
        quizNames,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the provider");
  return context;
}

export { QuizProvider, useQuiz };
