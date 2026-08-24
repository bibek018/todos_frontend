"use client";

import {
  Settings,
  LogOut,
  Monitor,
  Sun,
  Moon,
  UserRoundArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
export function UserMenu() {
  const router = useRouter();
  const handleSetting = () => {
    router.push("/settings");
  };
  const { logout, user } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="Profile"
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <span>Menu</span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        {/* Settings */}
        <DropdownMenuItem onClick={handleSetting}>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

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
