import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getTenantById, Tenant, tenantId } from "../services/tenantService";
import { Children } from "../types/common";
import { useCookies } from "react-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  tenant: Tenant | null;
  login: (
    username: string,
    password: string,
    apiKey: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  tenant: null,
  login: () => Promise.resolve(false),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Children) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const storedToken = cookies.access_token;
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, [cookies.access_token]);

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

  const login = async (
    username: string,
    password: string,
    apiKey: string
  ): Promise<boolean> => {
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
      setCookie("access_token", accessToken, { path: "/" });
      console.log("Login successful. Access Token:", accessToken);

      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Could not authenticate user:", error);
      return false;
    }
  };

  const logout = () => {
    removeCookie("access_token");
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, token, tenant, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
