"use client";
import api from "@/src/app";
import { useAuth, AuthContext } from "./AuthContext";
import {useState, useEffect} from "react";
import { UserResponse, User } from "@/types/type";
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accesstoken , setAccessToken] = useState<string>("")
  const logout = async () => {
  try {
    await api.post("/auth/logout");
    setUser(null);
  } catch (err) {
    console.log(err);
  }
};
  const getUser = async () => {
    try {
      const response = await api.get<UserResponse>("/users/me");
      setUser(response.data.user);
      
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
    <AuthContext.Provider value={{ user, setUser, isLoading , logout}}>
      {children}
    </AuthContext.Provider>
  );
};
