"use client"
import { DeleteDialog } from "./DeleteDialog"
import { UpdateDialog } from "./UpdateDialog";
import { todo } from "@/types/type";
interface Todohandler{
    todo:todo
}
export const TodoDisplay = ({todo}:Todohandler) => {
  const statusTone =
    todo.status === "completed"
      ? "bg-emerald-400/15 text-emerald-300"
      : todo.status === "in progress"
        ? "bg-cyan-400/15 text-cyan-300"
        : "bg-amber-400/15 text-amber-300";

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/20 p-4 transition hover:border-cyan-400/30 hover:bg-white/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Task
            </p>
            <p className="mt-2 wrap-break-words text-base font-medium text-slate-100">
              {todo.title}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Status
            </p>
            <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${statusTone}`}>
              {todo.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:pt-1">
          <UpdateDialog todo={todo} />
          <DeleteDialog todo={todo} />
        </div>
      </div>
    </article>
  )
}
