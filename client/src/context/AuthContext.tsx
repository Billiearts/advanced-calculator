import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with values from localStorage if available
  const initialUser = typeof window !== "undefined" && localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user") as string) 
    : null;
  
  const initialToken = typeof window !== "undefined" 
    ? localStorage.getItem("token")
    : null;

  const [user, setUser] = useState<User | null>(initialUser);
  const [token, setToken] = useState<string | null>(initialToken);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);

    // persist in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};