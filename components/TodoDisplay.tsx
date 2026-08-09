import api from "../src/app";
import { todo, todoResponse } from "../types/type";
const getUserTodos = async (): Promise<todo[]> => {
  const response = await api.get<todoResponse>("/todos");
  return response.data.todos;
};
export const TodoDisplay = async () => {
  const userTodos: todo[] = await getUserTodos();
  return (
    <section className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-md sm:p-8">
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
          userTodos.map((e: todo) => (
            <article
              key={e._id}
              className="rounded-2xl border border-white/10 bg-slate-950/20 p-4 transition hover:border-cyan-400/30 hover:bg-white/5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Task
                    </p>
                    <p className="mt-2 wrap-break-words text-base font-medium text-slate-100">
                      {e.title}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Status
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                        e.status === "completed"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-amber-400/15 text-amber-300"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start">
                  <div className="shrink-0">
                    {/* action buttons are rendered inside the dialogs */}
                  </div>
                </div>
              </div>
            </article>
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
