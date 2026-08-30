"use client";
import api from "@/lib/app";
import { useState } from "react";
import { todo, TodoState } from "@/types/type";
import { Label } from "../ui/label";

interface UsersAllTodos {
  getUserTodos: () => void;
  setStatus: React.Dispatch<React.SetStateAction<TodoState>>;
}

export const TodoAdd = ({ getUserTodos, setStatus }: UsersAllTodos) => {
  const [title, setTitle] = useState<string>("");
  const [msg, setMsg] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formdata = new FormData(e.currentTarget);
    const status = formdata.get("status");
    const priority = formdata.get("priority");

    if (title.trim().length < 8) {
      setMsg(true);
      return;
    }

    try {
      const response = await api.post("/todos", {
        title: title.trim(),
        status,
        priority,
      });
      await getUserTodos();
      setTitle("");
      setMsg(false);
      form.reset();
      setStatus("success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="aura  aura-dual text-cyan-500/50 duration-2500 w-full overflow-hidden rounded-3xl ">
      <div className="card bg-card rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="w-full h-fit border border-border bg-card/60 p-6 shadow-xl shadow-cyan-950/5 backdrop-blur-md sm:p-8 rounded-3xl"
        >
          <div className="mb-6 space-y-2">
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Create Task
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Capture a new task in one step and add it to your backlog.
            </p>
          </div>
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="todo-title-input"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Task Name
              </label>
              <input
                id="todo-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
              />
              <Label
                htmlFor="todo-status-input"
                className="text-muted-foreground"
              >
                Status
              </Label>

              <select
                id="todo-status-input"
                name="status"
                defaultValue="not started"
                className="h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground outline-none transition duration-200 focus:ring-2 focus-visible:ring-ring/50"
              >
                <option
                  value="not started"
                  className="bg-background text-foreground"
                >
                  not started
                </option>
                <option
                  value="in progress"
                  className="bg-background text-foreground"
                >
                  in progress
                </option>
                <option
                  value="completed"
                  className="bg-background text-foreground"
                >
                  completed
                </option>
              </select>
              <Label
                htmlFor="todo-priority-input"
                className="text-muted-foreground"
              >
                Priority
              </Label>
              <select
                name="priority"
                id="todo-priority-input"
                defaultValue="medium"
                className="h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-sm text-foreground outline-none transition duration-200 focus:ring-2 focus-visible:ring-ring/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            {msg && (
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 transition-all duration-200">
                Task title must be at least 8 characters long.
              </p>
            )}
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex w-full items-center justify-center rounded-2xl bg-cyan-600 dark:bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-white dark:text-slate-950 transition-all duration-200 hover:bg-cyan-500 dark:hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
