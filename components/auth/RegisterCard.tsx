"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import api from "@/lib/app";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../utils/password-input";

const RegisterCard = () => {
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email");
    const name = formdata.get("name");
    const password = formdata.get("password");
    try {
      await api.post("/auth/register",{
        name, email, password
      });
      router.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your email, name and password below to create a new account
        </CardDescription>
        <CardAction>
          <Link
            href="/login"
            className=" no-underline hover:underline underline-offset-1"
          >
            Sign in
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="name"
                placeholder="Shyam Lal"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <PasswordInput id="password" name="password" required/>
            </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default RegisterCard;
