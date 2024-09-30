import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = todos.map((todo, i) => 
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Add a new task..."
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index} className={todo.completed ? 'completed' : ''}>
                        <span onClick={() => toggleTodo(index)}>{todo.text}</span>
                        <button className="delete-btn" onClick={() => deleteTodo(index)}>×</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
