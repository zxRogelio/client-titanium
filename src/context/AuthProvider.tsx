// src/context/AuthProvider.tsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  rol: "cliente" | "entrenador" | "admin";
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 🟡 nuevo

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
        setUser(null);
      }
    }
    setIsLoading(false); // ✅ terminamos de cargar
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  if (isLoading) return null; // ⛔️ no renderices nada hasta que sepamos si hay usuario

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
