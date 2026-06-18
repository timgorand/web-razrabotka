import { useState } from "react";

const ToDoForm = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stonks_form">
      <input
        value={inputValue}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder="Следующая цель..."
        className="stonks_input"
      />
      <button className="stonks_button">Записать</button>
    </form>
  );
};

export default ToDoForm;
