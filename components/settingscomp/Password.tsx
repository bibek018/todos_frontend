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

export const Password = () => {
  const handlePassWordChange = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
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
        <form
          className="flex flex-col gap-6"
          onSubmit={handlePassWordChange}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">
              Current Password
            </Label>

            <Input
              type="password"
              id="password"
              name="password"
              className="bg-input"
            />

            <Label
              htmlFor="newpassword"
              className="mt-2"
            >
              New Password
            </Label>

            <Input
              type="password"
              id="newpassword"
              name="newpassword"
              className="bg-input"
            />

            <Label
              htmlFor="confirmpassword"
              className="mt-2"
            >
              Confirm New Password
            </Label>

            <Input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              className="bg-input"
            />
          </div>

          <div className="flex justify-stretch sm:justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};