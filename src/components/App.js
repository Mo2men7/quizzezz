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
  const { status, choice, quizNames, dispatch } = useQuiz();
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
          <Header />
          <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && <StartScreen />}
            {status === "active" && (
              <>
                <Progress />
                <Question />
                <Footer>
                  <Timer />
                  <NextButton />
                </Footer>
              </>
            )}
            {status === "finished" && <FinishScreen />}
          </Main>
        </>
      )}
    </div>
  );
}
