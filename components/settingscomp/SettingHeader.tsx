"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const SettingHeader = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex flex-col text-accent-foreground">
      <section className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go back"
          className="flex size-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-5" />
        </button>

        <h1 className="text-xl font-semibold sm:text-2xl">
          Settings
        </h1>
      </section>

      <p className="ml-12 mt-1 max-w-xl text-sm text-muted-foreground sm:text-base">
        Manage your account and preferences.
      </p>
    </header>
  );
};