import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
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
      todo.id === id
        ? { ...todo, completed: !todo.completed, completionTimestamp: Date.now() }
        : todo
    );

    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-4">
      <div className="header d-flex justify-content-between align-items-center w-100">
        <img
          src="https://lh6.ggpht.com/aiY9J8YK8Lzr7hMC7nZWlZGiBn8TF_PY7NVNy5U1i5g4zG8yEPzEZTJK2WwbWJUogg"
          alt="TODO App"
          className="img-fluid"
          style={{ width: '80px', height: '80px' }}
        />
        <button onClick={resetTodos} className="btn btn-danger">
          Reset
        </button>
      </div>
      <div className="input-container input-group mb-4 w-100">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new todo..."
          className="form-control"
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="btn btn-primary">
          +
        </button>
      </div>
      <div className="todo-list w-100">
        {todos
          .filter((todo) => !todo.completed)
          .sort((a, b) => b.timestamp - a.timestamp) // Sort active todos by creation time
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-card alert alert-primary d-flex justify-content-between align-items-center`}
              onClick={() => toggleComplete(todo.id)}
            >
              <div
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.text}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-sm">
                *
              </button>
            </div>
          ))}
        {todos
          .filter((todo) => todo.completed)
          .sort((a, b) => b.completionTimestamp - a.completionTimestamp) // Sort completed todos by completion time
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo-card alert alert-success d-flex justify-content-between align-items-center`}
              onClick={() => toggleComplete(todo.id)}
            >
              <div
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.text}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-sm">
                *
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
  