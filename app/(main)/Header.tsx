"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/utils/UserMenu";

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
    <header className="w-full border-b-4 border-border bg-background px-4 py-4 text-foreground sm:px-6 md:px-10 md:py-5">
      <div className="flex flex-col gap-4">
        {/* App name + welcome */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 sm:text-xl md:text-2xl">
            TODO WORKSPACE
          </h2>

          <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">
            Welcome back, {user.name}!
          </p>
        </div>

        {/* Description + user actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6 text-muted-foreground sm:text-base">
            Keep track of your tasks and update your progress quickly.
          </p>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* Role */}
            <span className="rounded-full bg-blue-400 px-3 py-1 text-xs font-semibold text-slate-950 sm:text-sm">
              {user.role}
            </span>

            {/* Email */}
            <span className="max-w-55 truncate rounded-full border border-border/50 bg-muted px-3 py-1 text-xs text-muted-foreground sm:max-w-none sm:text-sm">
              {user.email}
            </span>
            {/* Theme controls */}

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  ) : (
    // Logged-out Header
    <header className="w-full border-b border-border bg-background/80 px-4 py-4 text-foreground backdrop-blur-md sm:px-6 md:px-10 md:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* App information */}
        <section>
          <h2 className="text-lg font-bold text-blue-500 sm:text-xl md:text-2xl">
            TODO WORKSPACE
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground sm:text-base">
            Keep track of your tasks and update your progress quickly.
          </p>
        </section>

        {/* Right side */}
        <section className="flex flex-col items-center justify-center gap-3">
          {/* Auth buttons */}
          <section className="flex gap-2 sm:gap-3">
            <Button
              className="h-9 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80 sm:h-10 sm:px-5"
              onClick={handleLogin}
            >
              Login
            </Button>

            <Button
              className="h-9 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/80 sm:h-10 sm:px-5"
              onClick={handleRegister}
            >
              Register
            </Button>
          </section>
        </section>
      </div>
    </header>
  );
};
