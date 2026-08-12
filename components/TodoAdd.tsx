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
      className="w-fit h-fit rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-md sm:p-8"
    >
      <div className="mb-5 space-y-2">
        <h2 className="text-xl font-semibold text-white">Add a todo</h2>
        <p className="text-sm leading-6 text-slate-400">
          Capture a new task in one step and keep the list moving.
        </p>
      </div>
      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write your next task"
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="inline-flex  items-center justify-center rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};
