export const TodoSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((item: number) => {
        return (
          <article
            key={item}
            className="animate-pulse group w-full rounded-2xl border border-white/10 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-cyan-950/10"
          >
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-12 rounded bg-white/10" />
                  <div className="h-4 w-16 rounded-full bg-white/10" />
                </div>
                <div className="h-4 w-3/4 rounded bg-white/10" />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};