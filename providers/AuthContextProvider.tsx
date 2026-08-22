"use client";
import api from "@/lib/app";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { setToken } from "@/lib/Token";
import { useRouter } from "next/navigation";
import { RefreshResponse, User } from "@/types/type";
import Loading from "@/app/settings/loading";
import axios from "axios";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");

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

  useEffect(() => {
    const abortController = new AbortController();

    const getUser = async () => {
      try {
        const response = await api.post<RefreshResponse>(
          "/auth/refresh",
          {},
          {
            signal: abortController.signal,
            "axios-retry": { retries: 0 },
          },
        );
        setToken(response.data.accessToken);
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.log(err);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    getUser();

    return () => {
      abortController.abort();
    };
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, isLoading, logout }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
