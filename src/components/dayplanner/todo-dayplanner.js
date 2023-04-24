import React from "react";

function Todolist({ todoItem, addTodos, setTodoItem}) {
  const handleAddTodo = () => {
    if (todoItem) {
      addTodos(todoItem); 
    }
  };
  const removeAll = () => {
      setTodoItem([]);
  }

  return (
    <div className="day-planner-list">
      <h2>Todo List</h2>
      <p>Click the Activities to add them to the list</p>
      <hr></hr>
      <ul>
        {todoItem.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      {handleAddTodo}
      <button className="clear-btn" onClick={removeAll}>Clear</button>
    </div>
  );
}

export default Todolist;