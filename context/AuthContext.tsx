import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Type definitions
interface User {
  token: string;
  id?: string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create context with default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Login user and save token
  const login = async (userData: User, token: string): Promise<void> => {
    await AsyncStorage.setItem("token", token);
    setUser(userData);
  };

  // Logout user
  const logout = async (): Promise<void> => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  // Check if token exists when app loads
  const loadUser = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // optionally fetch profile from backend
        setUser({ token });
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
