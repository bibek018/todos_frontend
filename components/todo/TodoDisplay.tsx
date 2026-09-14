"use client";
import { DeleteDialog } from "./DeleteDialog";
import { UpdateDialog } from "./UpdateDialog";
import { todo } from "@/types/type";

interface Todohandler {
  todo: todo;
  setUserTodos: React.Dispatch<React.SetStateAction<todo[] | []>>;
  getUserTodos:()=>{}
}

export const TodoDisplay = ({ todo, setUserTodos, getUserTodos }: Todohandler) => {
  const statusTone =
    todo.status === "completed"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
      : todo.status === "in progress"
        ? "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20"
        : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
  const priorityTone =
    todo.priority === "high"
      ? "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      : todo.priority === "medium"
        ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";

  return (
    <div className="aura aura-dual text-cyan-500/50 duration-2000 rounded-3xl">
  <div className="card bg-card rounded-3xl">
      <article className="group w-full rounded-2xl border border-border bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-card hover:shadow-xl hover:shadow-cyan-950/5">
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          {/* Header: Label + Status + Priority*/}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Task
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusTone}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {todo.status}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${priorityTone}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {todo.priority}
            </span>
          </div>
          {/* Title */}
          <p className="wrap-break-word text-base font-semibold leading-relaxed text-foreground/90 group-hover:text-foreground sm:text-lg">
            {todo.title}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-border/50 pt-3.5">
          <UpdateDialog todo={todo} setUserTodos={setUserTodos} />
          <DeleteDialog todo={todo} setUserTodos={setUserTodos} getUserTodos={getUserTodos}/>
        </div>
      </div>
    </article>
    </div>
    </div>
    
  );
};
