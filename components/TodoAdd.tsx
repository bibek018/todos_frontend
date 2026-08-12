"use client";
import api from "@/src/app";
import { useState } from "react";
import { todo } from "@/types/type";
interface UsersAllTodos {
  userTodos: todo[];
  setUserTodos: React.Dispatch<React.SetStateAction<todo[] | []>>;
}
export const TodoAdd = ({ userTodos, setUserTodos }: UsersAllTodos) => {
  const [title, setTitle] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    try {
      const response = await api.post("/todos", { title: title.trim() });
      setUserTodos((current) => [...current, response.data.todo]);
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-lg sm:p-8"
    >
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Create Task</h2>
        <p className="text-sm leading-6 text-slate-400">
          Capture a new task in one step and add it to your backlog.
        </p>
      </div>
      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="todo-title-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Task Name
          </label>
          <input
            id="todo-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
