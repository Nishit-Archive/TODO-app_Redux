// src/App.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  addTodo,
  selectTodos,
  toggleTodo,
  deleteTodo,
} from "./features/todoSlice"; // Import deleteTodo
import { Todo } from "./features/todoSlice";
import { toast } from "react-toastify";

function App() {
  const [text, setText] = useState("");
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
    toast.success("Task added successfully!");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        {/* Heading added here */}
        <h1 className="mb-4 text-2xl font-bold text-center">
          TODO APP using REACT + TYPESCRIPT + REDUX
        </h1>
        <form
          onSubmit={handleSubmit}
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Add Todo"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Todo
            </button>
          </div>
        </form>
        <ul className="p-4 bg-white rounded shadow-md list-reset">
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                className="mr-2"
              />
              <span className="flex-1 cursor-pointer">{todo.text}</span>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
