"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  LogOut,
  Monitor,
  Sun,
  Moon,
  SunMoon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function UserMenu() {
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetting = () => {
    router.push("/settings");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="Profile"
            className="h-8 w-8 rounded-full cursor-pointer"
          />
        ) : (
          <span className="cursor-pointer">Menu</span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        {/* Settings */}
        <DropdownMenuItem onClick={handleSetting}>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Theme */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
          <SunMoon className="h-4 w-4"/>
            <span>Theme</span>
          </DropdownMenuSubTrigger>

          <DropdownMenuSubContent className="w-36">
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className={theme === "system" ? "bg-accent" : ""}
              disabled={!mounted}
            >
              <Monitor className="h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className={theme === "light" ? "bg-accent" : ""}
              disabled={!mounted}
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={theme === "dark" ? "bg-accent" : ""}
              disabled={!mounted}
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Logout */}
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onClick={logout}
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}