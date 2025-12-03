// src/context/AuthProvider.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { AuthContext, type User } from "./AuthContext";
import type { ReactNode } from "react";

const INACTIVITY_LIMIT_MS = 1 * 60_000; 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // guardamos el id del timeout de inactividad
  const inactivityTimerRef = useRef<number | null>(null);

  const clearInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      window.clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    clearInactivityTimer();
  }, [clearInactivityTimer]);

  const startInactivityTimer = useCallback(() => {
    clearInactivityTimer();
    inactivityTimerRef.current = window.setTimeout(() => {
      alert("Por seguridad, tu sesión se cerró por inactividad.");
      logout();
    }, INACTIVITY_LIMIT_MS);
  }, [clearInactivityTimer, logout]);

  // Cargar usuario desde localStorage al iniciar
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
    setIsLoading(false);
  }, []);

  // Lógica de inactividad: solo si hay usuario logueado
  useEffect(() => {
    if (!user) {
      clearInactivityTimer();
      return;
    }

    // arranca el contador
    startInactivityTimer();

    const resetTimer = () => {
      startInactivityTimer();
    };

    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];

    events.forEach((eventName) =>
      window.addEventListener(eventName, resetTimer)
    );

    return () => {
      events.forEach((eventName) =>
        window.removeEventListener(eventName, resetTimer)
      );
      clearInactivityTimer();
    };
  }, [user, startInactivityTimer, clearInactivityTimer]);

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
