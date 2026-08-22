"use client";

import { LogOut } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

export const Logout = () => {
    const {logout } = useAuth();
  return (
    <Card className="w-full p-4 sm:p-5 md:p-6">
      <CardHeader className="p-0">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
            <LogOut className="size-5" />
          </div>

          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl">Log out</CardTitle>

            <CardDescription className="mt-1 text-sm sm:text-base">
              Log out from this device.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <div className="mt-6 flex justify-stretch sm:justify-end">
        <Button className="w-full border-2 border-red-300 bg-background text-red-400 hover:bg-red-50 sm:w-auto" onClick={logout}>
          Log out
        </Button>
      </div>
    </Card>
  );
};
