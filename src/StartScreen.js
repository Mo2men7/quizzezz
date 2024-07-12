function StartScreen({ num }) {
  return (
    <div className="start">
      <h2>Welcome to the React quiz</h2>
      <h3>{num} questions to test your mastery</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
}

export default StartScreen;
