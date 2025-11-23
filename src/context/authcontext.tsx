import  { createContext, useContext, useState, useEffect} from "react";
import type { ReactNode } from "react";

// -------------------------
// API URL
// -------------------------
const API_URL = "https://drdrills.achillesdrill.com/auth/admin";

// -------------------------
// Types
// -------------------------
interface User {
  _id: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface Credentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

// -------------------------
// Context
// -------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -------------------------
// Hook
// -------------------------
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};

// -------------------------
// Provider
// -------------------------
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // -------------------------
  // Login
  // -------------------------
  const login = async (credentials: Credentials): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!(res.status == 200)) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }

      const data = await res.json();
      // setUser(data.user);
      if(data.token !== undefined){
              setToken(data.token);
      setIsAuthenticated(true);
       localStorage.setItem("authToken", data.token);

      }
      else{
        throw new Error( data.message || "No tokens"  );

      }
      

      // localStorage.setItem("user", JSON.stringify(data.user ));
     
     

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred");
      }
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Logout
  // -------------------------
  const logout = (): void => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    // localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  // -------------------------
  // Sync isAuthenticated with token
  // -------------------------
  useEffect(() => {
    setIsAuthenticated(!!token);
    // console.log(token)
    // logout();

    
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );

}