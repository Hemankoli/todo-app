import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Home.css'
function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Load todos from local storage on component mount
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todos change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText.trim() === '') return;

    const newTodo = {
      id: uuidv4(),
      text: inputText,
      completed: false,
      timestamp: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>TODO App</h1>
        <button onClick={resetTodos} className="reset-button">
          Reset
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      <div className="todo-list">
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </div>
          ))}
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-card completed`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
