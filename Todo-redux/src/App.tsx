import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  addTodo,
  selectTodos,
  toggleTodo,
  deleteTodo,
} from "./features/todoSlice";
import { Todo } from "./features/todoSlice";
import { toast } from "react-toastify";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/ui/theme-provider"; // Adjust the path as necessary
import { Button } from "./components/ui/button";

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-white">
            TODO APP using REACT + TYPESCRIPT + REDUX
          </h1>
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md dark:bg-gray-700"
          >
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 leading-tight text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Write your task here..."
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Todo
              </Button>
            </div>
          </form>
          <ul className="p-4 bg-white rounded shadow-md dark:bg-gray-700 list-reset">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className={`flex justify-between items-center p-2 ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="mr-2"
                />
                <span className="flex-1 cursor-pointer">{todo.text}</span>
                <Button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="px-2 py-1 font-bold text-white bg-red-500 rounded dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:shadow-outline"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
