"use client";
import api from "@/src/app";
import { useAuth, AuthContext } from "./AuthContext";
import {useState, useEffect} from "react";
import { setToken } from "@/lib//Token";
import { RefreshResponse, User } from "@/types/type";
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
    setAccessToken("");
  } catch (err) {
    console.log(err);
  }
};
  const getUser = async () => {
    try {
      const response = await api.post<RefreshResponse >("/auth/refresh");
      setUser(response.data.user);
      setAccessToken(response.data.accesstoken);
      setToken(response.data.accesstoken);
      
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
    <AuthContext.Provider value={{ user, setUser,  accesstoken, isLoading , logout}}>
      {isLoading ?(<div> Loading</div>) : children}
    </AuthContext.Provider>
  );
};
