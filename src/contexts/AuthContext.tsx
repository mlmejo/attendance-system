import { createContext, ReactNode, useState } from "react";
import { User } from "../types";

const AuthContext = createContext<User | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
