"use client";

import api from "@/lib/app";
import { todo, todoResponse, TodoState } from "@/types/type";
import { TodoDisplay } from "./TodoDisplay";
import {TodoSkeleton} from "./TodoSkeleton"
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { TodoAdd } from "./TodoAdd";
import { TodoError } from "./TodoError";

export const TodoConfig = () => {
  const [status, setStatus] = useState<TodoState>("loading");
  const { user, isLoading } = useAuth();
  const [userTodos, setUserTodos] = useState<todo[] | []>([]);

  const getUserTodos = async () => {
    try {
      const response = await api.get<todoResponse>("/todos");
      setUserTodos(response.data.todos);
      setStatus("success")
    } catch (err) {
      console.log(err);
      setStatus("error")
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      getUserTodos();
    }
  }, [isLoading, user]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Workspace Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight  sm:text-3xl lg:text-4xl bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Workspace Dashboard
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Review active tasks, update progression status, and add new items.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Todo List */}
        
        {/*status success */}
        {status==="success" && (<div className="w-full lg:col-span-8 order-2 lg:order-1 space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <h3 className="text-lg font-semibold text-foreground">Your Tasks</h3>
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
              {userTodos.length} {userTodos.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          {userTodos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userTodos.map((todo: todo) => (
                <TodoDisplay key={todo._id} todo={todo} setUserTodos={setUserTodos} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center backdrop-blur-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">No tasks found</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Get started by creating a new task on the right.
              </p>
            </div>
          )}
        </div>
        )}
        {/* status loading */}
        {status ==="loading" && <TodoSkeleton/>}

        {/* status error */}
        {status ==="error" && <TodoError getUserTodos={getUserTodos}/>}
        {/* Right Side: Add Todo (Sticky Sidebar) */}
        <div className="w-full lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-6">
          <TodoAdd userTodos={userTodos} setUserTodos={setUserTodos} setStatus={setStatus} />
        </div>
      </div>
    </div>
  );
};