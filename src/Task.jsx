const ToDo = ({ todo, toggleTask, removeTask }) => {
  return (
    <div key={todo.id + todo.key} className="stonks_todoer">
      <div
        onClick={() => toggleTask(todo.id)}
        className={todo.complete ? "stonks_text stonks_strike" : "stonks_text"}
		
      >
        {todo.task}
      </div>
      <div className="stonk_deliter" onClick={() => removeTask(todo.id)}>
        [X]
      </div>
    </div>
  );
};

export default ToDo;