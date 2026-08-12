"use client";

import api from "../src/app";
import { todo, todoResponse } from "../types/type";
import { TodoDisplay } from "./TodoDisplay";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { TodoAdd } from "./TodoAdd";

export const TodoConfig = () => {
  const { user, isLoading } = useAuth();
  const [userTodos, setUserTodos] = useState<todo[] | []>([]);

  useEffect(() => {
    if (!isLoading && user) {
      const getUserTodos = async () => {
        try {
          const response = await api.get<todoResponse>("/todos");

          setUserTodos(response.data.todos);
        } catch (err) {
          console.log(err);
        }
      };

      getUserTodos();
    }
  }, [isLoading, user, userTodos]);

  return (
    <section className=" rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-md sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Your todos
          </h2>

          <p className="text-sm leading-6 text-slate-400">
            Review what is active and what still needs attention.
          </p>
        </div>
      </div>

      <div className="flex flex-col w-screen lg:flex-row lg:items-start lg:justify-around">
        <div className="w-full lg:w-1/2 space-y-3">
          <div className="w-full flex flex-row justify-end ">
            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            {userTodos.length} items
          </span>
          </div>
          {userTodos.length > 0 ? (
            userTodos.map((todo: todo) => (
              <TodoDisplay key={todo._id} todo={todo} />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-8 text-center text-base text-slate-400 sm:py-10 sm:text-xl">
              No todos yet. Add your first task to get started.
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2">
          <TodoAdd userTodos={userTodos} setUserTodos={setUserTodos} />
        </div>
      </div>
    </section>
  );
};
