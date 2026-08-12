"use client";
import api from "@/src/app";
import { useAuth, AuthContext } from "./AuthContext";
import {useState, useEffect} from "react";
import { setToken } from "@/lib/Token";
import { useRouter } from "next/navigation";
import { RefreshResponse, User } from "@/types/type";
import Loading from "@/app/loading";
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken , setAccessToken] = useState<string>("")
  const logout = async () => {
  try {
    await api.post("/auth/logout");
    setUser(null);
    setAccessToken("");
    router.push("/");
    
  } catch (err) {
    console.log(err);
  }
};
  const getUser = async () => {
    try {
      const response = await api.post<RefreshResponse >("/auth/refresh");
      setToken(response.data.accessToken);
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      router.push("/dashboard");
      
    } catch (err) {
      console.log(err);
    }
    finally{
        setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, setUser,  accessToken, isLoading , logout}}>
      {isLoading ?<Loading/> : children}
    </AuthContext.Provider>
  );
};
