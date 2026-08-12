export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
          {/* Badge */}
          <div className="mb-6 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300">
            ✨ Simple. Focused. Productive.
          </div>

          {/* Main heading */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Organize your tasks.
            <span className="block bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Get things done.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Keep your daily tasks organized in one simple place. Create todos,
            track their progress, update their status, and stay focused on
            what matters.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/dashboard"
              className="rounded-xl bg-cyan-500 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Go to Dashboard →
            </a>

            <a
              href="/register"
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Create an Account
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Everything you need to stay organized
          </h2>

          <p className="mt-3 text-slate-400">
            A simple workflow designed to keep your tasks under control.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
              ✓
            </div>

            <h3 className="text-xl font-semibold">
              Create Todos
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Quickly add tasks whenever something needs your attention.
              Keep everything in one organized list.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 text-2xl">
              ↻
            </div>

            <h3 className="text-xl font-semibold">
              Track Progress
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Update your tasks as you work. Move them between different
              statuses and always know what still needs attention.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-400/10 text-2xl">
              ⚡
            </div>

            <h3 className="text-xl font-semibold">
              Stay Productive
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Focus on the tasks that matter most and turn your plans into
              completed work.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Turn your plans into progress.
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                Getting started is simple. Create an account, add your tasks,
                and manage everything from your personal dashboard.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
                  1
                </span>

                <div>
                  <h3 className="font-semibold">Create your account</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Sign up and get your own private workspace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
                  2
                </span>

                <div>
                  <h3 className="font-semibold">Add your tasks</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Add the things you want to accomplish.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500 font-bold text-slate-950">
                  3
                </span>

                <div>
                  <h3 className="font-semibold">Track and complete</h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Update your progress and keep moving forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to get organized?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
          Stop keeping your tasks in your head. Put them somewhere you can
          manage them and start making progress today.
        </p>

        <a
          href="/register"
          className="mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Get Started →
        </a>
      </section>
    </main>
  );
}