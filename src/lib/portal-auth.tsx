import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "parent" | "np" | "admin";
export type User = { role: Role; name: string; email: string };

const STORAGE_KEY = "puc.session";

function readStored(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

const DEMO_USERS: Record<Role, User> = {
  parent: { role: "parent", name: "Sarah Thompson", email: "sarah@example.com" },
  np: { role: "np", name: "Dr. Amelia Chen, NP", email: "amelia@pediatricuc.ca" },
  admin: { role: "admin", name: "Jordan Reyes", email: "admin@pediatricuc.ca" },
};

type Ctx = {
  user: User | null;
  login: (role: Role) => User;
  logout: () => void;
};
const AuthCtx = createContext<Ctx | null>(null);

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(readStored());
    const sync = () => setUser(readStored());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const login = (role: Role) => {
    const u = DEMO_USERS[role];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    return u;
  };
  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export function usePortalAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("usePortalAuth must be used within PortalAuthProvider");
  return ctx;
}

/** Synchronous read for route beforeLoad guards. */
export function getStoredUser(): User | null {
  return readStored();
}