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
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/app";
import { User, UserResponse, LoginResponse } from "../../types/type";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { setToken } from "@/lib/Token";
import { useState } from "react";
import axios from "axios";
import { PasswordInput } from "../utils/password-input";
export function LoginCard() {
  const { setUser } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const router = useRouter();
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
   
  };
  const handleGitHubLogin=()=>{
    window.location.href=`${process.env.NEXT_PUBLIC_API_URL}/auth/github`
  
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
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
      
      setToken(response.data.accesstoken);
      router.replace("/dashboard");
    } catch (err) {
      console.log(err);
      if(axios.isAxiosError(err)){
        const status = err.response?.status ?? 0;
        if(status ===401)
        {
          setErrorMsg("Invalid Email or Password, Try Again");
        }
        else if(status >=500){
          setErrorMsg("Internal Error, Try after some time")
        }
        else{
          setErrorMsg("Something went wrong, Please Try Again")
        }
      }
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
          <Link href="/register" className=" no-underline hover:underline underline-offset-1">Sign up</Link>
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
              <PasswordInput id="password" name="password" required/>
            </div>
            { errorMsg && (
              <div className="font-semibold text-red-400 w-full text-center " >{errorMsg}</div>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full border-border bg-background hover:bg-accent text-foreground"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20}/>
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-full border-border bg-background hover:bg-accent text-foreground"
          onClick={handleGitHubLogin}
        >
          <FaGithub size={20}/>
          Login with GitHub
        </Button>
      </CardFooter>
    </Card>
  );
}
