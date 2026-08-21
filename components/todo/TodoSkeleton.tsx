export const TodoSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((item: number) => {
        return (
          <article
            key={item}
            className="animate-pulse w-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 shadow-sm"
          >
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-12 rounded bg-muted" />
                  <div className="h-4 w-16 rounded-full bg-muted" />
                </div>
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};