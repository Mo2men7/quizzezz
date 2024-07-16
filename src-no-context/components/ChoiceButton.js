function ChoiceButton({ name, id, dispatch }) {
  return (
    <img
      className="choice"
      src={`${name}.png`}
      alt={name}
      onClick={() => dispatch({ type: "setChoice", payload: { name, id } })}
    />
  );
}

export default ChoiceButton;
