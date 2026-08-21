"use client"
import { TodoConfig } from "@/components/todo/TodoConfig";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const {user} = useAuth();
  const router = useRouter();
   useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
     
      <main className="min-h-screen overflow-y-auto bg-background text-foreground transition-colors duration-300">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_32%)] dark:opacity-100" />
      <div className=" flex min-h-screen w-full  flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <TodoConfig />


      </div>
    </main>
    
  )
}
