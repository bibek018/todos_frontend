"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LockKeyhole } from "lucide-react";
import { PasswordInput } from "../utils/password-input";
import { useState } from "react";
import api from "@/lib/app";
import { toast } from "sonner";
import axios from "axios";
export const Password = () => {
  const [error, setError] = useState<string>("");

  const handlePassWordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formdata = new FormData(e.currentTarget);
      const currentPassword = formdata.get("currentpassword");
      const newPassword = formdata.get("newpassword");
      const confirmNewPassword = formdata.get("confirmnewpassword");
      if (newPassword !== confirmNewPassword) {
        setError("New password and confirm password do not match");
        return;
      }
      const response = await api.put<{ success: true; message: string }>(
        "/users/me/changepassword",
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
      );

      setError("");

      toast.success(response.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Card className="w-full p-4 sm:p-5 md:p-6">
      <CardHeader className="p-0">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ring text-muted-foreground">
            <LockKeyhole className="size-5" />
          </div>

          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl">
              Change Password
            </CardTitle>

            <CardDescription className="mt-1 text-sm sm:text-base">
              Ensure your account is using a long, random password.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-6">
        <form className="flex flex-col gap-6" onSubmit={handlePassWordChange}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Current Password</Label>

            <PasswordInput
              id="currentpassword"
              name="currentpassword"
              required
            />

            <Label htmlFor="newpassword" className="mt-2">
              New Password
            </Label>

            <PasswordInput id="newpassword" name="newpassword" required />

            <Label htmlFor="confirmpassword" className="mt-2">
              Confirm New Password
            </Label>

            <PasswordInput
              id="confirmnewpassword"
              name="confirmnewpassword"
              required
            />
            {error && <span className="text-red-400 font-bold">{error}</span>}
          </div>

          <div className="flex justify-stretch sm:justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Change Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
