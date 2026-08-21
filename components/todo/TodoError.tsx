import { Button } from "@/components/ui/button";

interface TypeUserTodo {
  getUserTodos: () => void;
}

export const TodoError = ({ getUserTodos }: TypeUserTodo) => {
  return (
    <div className="w-full rounded-2xl border border-rose-500/20 bg-slate-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/30 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-rose-950/10">
      <div className="flex flex-col items-center justify-center text-center gap-4 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Failed to load tasks</p>
          <p className="text-xs text-slate-400">Please check your connection and try again.</p>
        </div>
        <Button
          onClick={getUserTodos}
          className="mt-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-all duration-200"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};