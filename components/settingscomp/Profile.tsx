"use client";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import api from "@/lib/app";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { User, UserResponse } from "@/types/type";
import { toast } from "sonner";
export const Profile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const router = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { user, setUser, isLoading } = useAuth();
  const hasChanged = name.trim() !== (user?.name ?? "") || file !== null;

  const chosePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      toast.error("Image size exceeded 2 MB.");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };
  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
    if (user) {
      setName(user.name ?? "");
    }
  }, [user, router, isLoading]);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);

    try {
      const formdata = new FormData(e.currentTarget);
      const response = await api.put<UserResponse>("/users/me", formdata);

      setUser(response.data.user);
      setFile(null);

      toast.success("Profile updated successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            "Some error occurred. Please try again later.",
        );
      } else {
        toast.error("Some error occurred. Please try again later.");
      }
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Card className="w-full p-4 sm:p-5 md:p-6">
      <CardHeader className="p-0">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ring text-muted-foreground">
            {user?.avatarUrl ? (
              <img
                src={user?.avatarUrl}
                alt="Profile"
                className="h-full w-full rounded-full"
              />
            ) : (
              <UserRound className="size-5" />
            )}
          </div>

          <div className="min-w-0">
            <CardTitle className="text-lg sm:text-xl">Profile</CardTitle>

            <CardDescription className="mt-1 text-sm sm:text-base">
              Update your profile information and avatar.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-6">
        <form className="flex flex-col gap-6" onSubmit={handleProfileUpdate}>
          <section className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
            {/* Avatar */}
            <div className="flex shrink-0 flex-col items-center gap-2 md:items-start">
              <div className="flex size-24 items-center justify-center rounded-full bg-secondary sm:size-28">
                {user?.avatarUrl ? (
                  <img
                    src={user?.avatarUrl}
                    alt="Profile"
                    className="h-full w-full rounded-full"
                  />
                ) : (
                  <UserRound className="size-10 text-muted-foreground sm:size-12" />
                )}
              </div>

              <Label
                htmlFor="avatar"
                className="cursor-pointer bg-secondary p-2 rounded-full text-secondary-foreground"
              >
                Change Avatar
              </Label>

              <Input
                id="avatar"
                accept="image/*"
                name="avatar"
                type="file"
                className="hidden"
                onChange={chosePhoto}
              />

              <div className="h-5 w-full max-w-52">
                {file && (
                  <p className="truncate text-center text-xs text-muted-foreground md:text-left">
                    {file.name} added
                  </p>
                )}
              </div>
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
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                className="bg-input"
              />

              <Label htmlFor="email" className="mt-2">
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
              className="w-full sm:w-auto cursor-pointer"
              type="submit"
              disabled={!hasChanged}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
