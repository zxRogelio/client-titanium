// src/context/AuthContext.tsx
import { createContext } from "react";

export interface User {
  id?: string;
  email: string;
  rol: "cliente" | "entrenador" | "admin";
  loginMethod?: "local" | "google";
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});
