"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthUser = { name: string };
type AuthContextType = {
  user: AuthUser | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // carrega usuário salvo no localStorage (se houver)
  useEffect(() => {
    const raw = localStorage.getItem("lojinha:user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // salva login
  const login = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const u = { name: trimmed };
    setUser(u);
    localStorage.setItem("lojinha:user", JSON.stringify(u));
  };

  // limpa login
  const logout = () => {
    setUser(null);
    localStorage.removeItem("lojinha:user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de um AuthProvider");
  return ctx;
}
