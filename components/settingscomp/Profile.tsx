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
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";

export const Profile = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [user, router, isLoading]);

  const handleProfileUpdate = (
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
            <UserRound className="size-5" />
          </div>

          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl">
              Profile
            </CardTitle>

            <CardDescription className="mt-1 text-sm sm:text-base">
              Update your profile information and avatar.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleProfileUpdate}
        >
          <section className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
            {/* Avatar */}
            <div className="flex shrink-0 flex-col items-center gap-2 md:items-start">
              <div className="flex size-24 items-center justify-center rounded-full bg-secondary sm:size-28">
                <UserRound className="size-10 text-muted-foreground sm:size-12" />
              </div>

              <Button
                type="button"
                className="w-full sm:w-auto"
              >
                <Label
                  htmlFor="avatar"
                  className="cursor-pointer"
                >
                  Change Avatar
                </Label>

                <Input
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="hidden"
                />
              </Button>

              <p className="max-w-52 text-center text-xs text-muted-foreground md:text-left">
                JPG, PNG or GIF. Max Size 2MB.
              </p>
            </div>

            {/* Profile fields */}
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.name}
                className="bg-input"
              />

              <Label
                htmlFor="email"
                className="mt-2"
              >
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="text"
                defaultValue={user?.email}
                className="bg-input"
                disabled
              />

              <p className="text-xs leading-relaxed text-muted-foreground">
                Email cannot be changed. Kindly contact the admin.
              </p>
            </div>
          </section>

          <div className="flex justify-stretch sm:justify-end">
            <Button
              className="w-full sm:w-auto"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};