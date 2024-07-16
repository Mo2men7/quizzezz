import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import ChoiceButton from "./ChoiceButton";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    choice,
    numQuestions,
    maxPossiblePoints,
    quizNames,
    dispatch,
  } = useQuiz();
  return (
    <div className="app">
      {!choice ? (
        <>
          <h2 style={{ marginTop: "10px" }}>Choose a framework!</h2>
          <div className="choices">
            {quizNames.map((name) => (
              <>
                <ChoiceButton
                  name={name.name}
                  id={name.id}
                  dispatch={dispatch}
                />
              </>
            ))}
          </div>
        </>
      ) : null}
      {choice && (
        <>
          <Header name={choice} />
          <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
              <StartScreen num={numQuestions} dispatch={dispatch} />
            )}
            {status === "active" && (
              <>
                <Progress
                  numQuestions={numQuestions}
                  index={index}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                  choice={choice}
                />
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                  choice={choice}
                />
                <Footer>
                  <Timer
                    secondsRemaining={secondsRemaining}
                    dispatch={dispatch}
                  />
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    index={index}
                    numQuestions={numQuestions}
                  />
                </Footer>
              </>
            )}
            {status === "finished" && (
              <FinishScreen
                dispatch={dispatch}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                choice={choice}
              />
            )}
          </Main>
        </>
      )}
    </div>
  );
}
