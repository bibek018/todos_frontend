"use client";
import api from "../src/app";
import { todo, todoResponse } from "../types/type";
import { TodoDisplay } from "../components/TodoDispaly";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
const getUserTodos = async (): Promise<todo[]> => {
  const response = await api.get<todoResponse>("/todos");
  return response.data.todos;
};
export const TodoConfig = () => {
  const {user, isLoading} = useAuth();
  const [userTodos, setUserTodos] = useState<todo[] | []>([]);

  useEffect(() => {
    if(!isLoading || !user)
    {
      const getUserTodos = async () => {
      try {
        const response = await api.get("/todos");

        setUserTodos(response.data.todos);
      } catch (err) {
        console.log(err);
      }
    };

    getUserTodos();
    }
  }, [isLoading, user]);

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-md sm:p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Your todos</h2>
          <p className="text-sm leading-6 text-slate-400">
            Review what is active and what still needs attention.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
          {userTodos.length} items
        </span>
      </div>

      <div className="space-y-3">
        {userTodos.length > 0 ? (
          userTodos.map((todo: todo) => (
            <TodoDisplay key={todo._id} todo={todo} />
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-10 text-sm text-slate-400">
            No todos yet. Add your first task to get started.
          </div>
        )}
      </div>
    </section>
  );
};
