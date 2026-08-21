"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-9 w-[108px] items-center gap-1 rounded-full border border-border bg-muted/20 p-1" />
    );
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border/80 bg-muted/40 p-0.5 shadow-sm backdrop-blur-xs transition-colors duration-300 hover:border-border dark:border-white/10 dark:bg-slate-900/60">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
          theme === "light"
            ? "bg-white text-amber-500 shadow-sm border border-slate-200/50"
            : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-slate-800"
        }`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
          theme === "dark"
            ? "bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/50"
            : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-slate-800"
        }`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
          theme === "system"
            ? "bg-white text-blue-500 shadow-sm border border-slate-200/50 dark:bg-slate-800 dark:border-slate-700/50 dark:text-blue-400"
            : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-slate-800"
        }`}
        title="System Preference"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
export default ThemeToggle;