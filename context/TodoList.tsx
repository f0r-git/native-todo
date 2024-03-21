import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { TODO } from "../types";

type TodoContextType = {
  todoList: TODO[];
  addTodo: (newTodo: TODO) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updatedTodo: TODO) => void;
  clearTodoList: () => void;
  loading: boolean;
  fetchTodoList: () => void;
};

// Create a context for todos
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Create a provider component
export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState<TODO[]>([]);
  const [loading, setLoading] = useState(false);

  const addTodo = (newTodo: TODO) => {
    setTodoList((todoList) => [...todoList, newTodo]);
  };

  const removeTodo = (id: string) => {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, updatedTodo: TODO) => {
    setTodoList((todoList) =>
      todoList.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  const clearTodoList = () => setTodoList([]);

  const fetchTodoList = () => {
    setLoading(true);
    supabase
      .from("todo_list")
      .select("*")
      .then(({ data, error }) => {
        if (!error) {
          setTodoList(data);
        }
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   setLoading(true);
  //   supabase
  //     .from("todo_list")
  //     .select("*")
  //     .then(({ data, error }) => {
  //       if (!error) {
  //         setTodoList(data);
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        addTodo,
        removeTodo,
        updateTodo,
        clearTodoList,
        loading,
        fetchTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the todo context
export const useTodoList = () => useContext(TodoContext);
