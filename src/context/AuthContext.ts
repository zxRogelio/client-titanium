import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  rol: "cliente" | "entrenador" | "admin";
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
