"use client";
import { DeleteDialog } from "./DeleteDialog";
import { UpdateDialog } from "./UpdateDialog";
import { todo } from "@/types/type";

interface Todohandler {
  todo: todo;
  setUserTodos: React.Dispatch<React.SetStateAction<todo[] | []>>;
}

export const TodoDisplay = ({ todo, setUserTodos }: Todohandler) => {
  const statusTone =
    todo.status === "completed"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : todo.status === "in progress"
        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        : "bg-amber-500/10 text-amber-400 border-amber-500/20";

  return (
    <article className="group w-full rounded-2xl border border-white/10 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-cyan-950/10">
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="space-y-4">
          {/* Header: Label + Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Task
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusTone}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {todo.status}
            </span>
          </div>

          {/* Title */}
          <p className="wrap-break-word text-base font-semibold leading-relaxed text-slate-200 group-hover:text-white sm:text-lg">
            {todo.title}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-3.5">
          <UpdateDialog todo={todo} setUserTodos={setUserTodos} />
          <DeleteDialog todo={todo} setUserTodos={setUserTodos} />
        </div>
      </div>
    </article>
  );
};
