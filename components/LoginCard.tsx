"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/src/app";
import { User, UserResponse, LoginResponse } from "../types/type";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
let accesstoken = "";
export const generatetoken = () => {
  return accesstoken;
};
export function LoginCard() {
  const { setUser } = useAuth();
  const router = useRouter();
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email");
    const password = formdata.get("password");
    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      if (response?.data?.user) {
        setUser(response.data.user);
      }
      router.push("/dashboard");
      accesstoken = response.data.accesstoken;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" name="email" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full bg-black hover:bg-black/50"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
