import { useQuiz } from "../contexts/QuizContext";

function Header() {
  const { choice: name } = useQuiz;
  return (
    <header className="app-header">
      <img src={`${name}.png`} alt={`${name} logo `} />
      <h1>The {name} Quiz</h1>
    </header>
  );
}

export default Header;
