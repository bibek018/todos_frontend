"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return user ? (
    // Logged-in Header
    <header className="w-full border-b border-white/10 bg-slate-900 px-4 py-4 text-white sm:px-6 md:px-10 md:py-5">
      <div className="flex flex-col gap-4">
        {/* App name + welcome */}
        <div>
          <h2 className="text-lg font-bold text-blue-400 sm:text-xl md:text-2xl">
            TODO WORKSPACE
          </h2>

          <p className="mt-1 text-base font-semibold text-white sm:text-lg">
            Welcome back, {user.name}!
          </p>
        </div>

        {/* Description + user actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6 text-slate-400 sm:text-base">
            Keep track of your tasks and update your progress quickly.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Role */}
            <span className="rounded-full bg-blue-400 px-3 py-1 text-xs font-semibold text-slate-950 sm:text-sm">
              {user.role}
            </span>

            {/* Email */}
            <span className="max-w-55 truncate rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 sm:max-w-none sm:text-sm">
              {user.email}
            </span>

            {/* Logout */}
            <Button
              className="h-9 bg-blue-400 px-4 text-sm font-semibold text-slate-950 hover:bg-blue-300"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  ) : (
    // Logged-out Header
    <header className="w-full border-b border-white/10 bg-slate-900 px-4 py-4 text-white sm:px-6 md:px-10 md:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* App information */}
        <section>
          <h2 className="text-xl font-bold text-blue-400 sm:text-2xl md:text-3xl">
            TODO WORKSPACE
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-400 sm:text-base">
            Keep track of your tasks and update your progress quickly.
          </p>
        </section>

        {/* Auth buttons */}
        <section className="flex gap-2 sm:gap-3">
          <Button
            className="h-9 bg-white px-4 text-sm font-semibold text-black hover:bg-white/80 sm:h-10 sm:px-5"
            onClick={handleLogin}
          >
            Login
          </Button>

          <Button
            className="h-9 bg-white px-4 text-sm font-semibold text-black hover:bg-white/80 sm:h-10 sm:px-5"
            onClick={handleRegister}
          >
            Register
          </Button>
        </section>
      </div>
    </header>
  );
};