import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getTenantById, Tenant, tenantId } from "../services/apiService";
import { Children } from "../types/common";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  tenant: Tenant | null;
  login: (username: string, password: string, apiKey: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  tenant: null,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Children) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await getTenantById(tenantId);
        setTenant(response);
      } catch (error) {
        console.error("Error fetching tenant:", error);
        setTenant(null);
      }
    };
    fetchTenant();
  }, []);

  const login = async (username: string, password: string, apiKey: string) => {
    try {
      const headers = {
        "X-API-KEY": apiKey,
      };

      const response = await axios.post(
        "https://fullstack.exercise.applifting.cz/login",
        {
          username: username,
          password: password,
        },
        { headers }
      );

      const accessToken = response.data.access_token;
      localStorage.setItem("access_token", accessToken);
      console.log("Login successful. Access Token:", accessToken);

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, token, tenant, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
