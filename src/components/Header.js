function Header({ name }) {
  return (
    <header className="app-header">
      <img src={`${name}.png`} alt="React logo" />
      <h1>The {name} Quiz</h1>
    </header>
  );
}

export default Header;
