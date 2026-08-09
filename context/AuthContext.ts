import { useContext, createContext } from "react";
import { AuthContextType } from "@/types/type";
export const AuthContext = createContext<AuthContextType|null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be called inside its provider");
  }

  return context;
};