"use client";
import { DeleteDialog } from "./DeleteDialog";
import { UpdateDialog } from "./UpdateDialog";
import { todo } from "@/types/type";

interface Todohandler {
  todo: todo;
}

export const TodoDisplay = ({ todo }: Todohandler) => {
  const statusTone =
    todo.status === "completed"
      ? "bg-emerald-400/15 text-emerald-300"
      : todo.status === "in progress"
        ? "bg-cyan-400/15 text-cyan-300"
        : "bg-amber-400/15 text-amber-300";

  return (
    <article className="w-full min-h-45 rounded-2xl border border-white/10 bg-slate-950/20 p-5 transition hover:border-cyan-400/30 hover:bg-white/5 sm:min-h-47.5">
      <div className="flex h-full flex-col justify-between gap-6">
        {/* Todo information */}
        <div className="min-w-0 space-y-5">
          {/* Title */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
              Task
            </p>

            <p className="mt-2 wraps-break-words text-base font-semibold leading-7 text-slate-100 sm:text-lg">
              {todo.title}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
              Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${statusTone}`}
            >
              {todo.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
          <UpdateDialog todo={todo} />
          <DeleteDialog todo={todo} />
        </div>
      </div>
    </article>
  );
};
