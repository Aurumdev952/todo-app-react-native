import { Todo } from "@/@types/Todo";
import { create } from "zustand";

interface Store {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  setTodos: (todos: Todo[]) => void;
}

const useStore = create<Store>((set) => ({
  todos: [],
  addTodo(todo) {
    set((state) => ({
      todos: [...state.todos, todo],
    }));
  },
  deleteTodo(id) {
    set((state) => {
      const todo = state.todos.filter((todo) => todo.id !== id);
      return {
        todos: todo,
      };
    });
  },
  updateTodo(todo) {
    set((state) => {
      const newtodo = state.todos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        } else {
          return t;
        }
      });
      return {
        todos: newtodo,
      };
    });
  },
  setTodos(todos) {
    set({
      todos,
    });
  },
}));

export default useStore;
