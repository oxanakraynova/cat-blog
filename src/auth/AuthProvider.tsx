import { createContext, useContext, useEffect, useState } from "react";
import { getTenantById, Tenant, tenantId } from "../services/apiService";
import { Children } from "../types/common";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  tenant: Tenant | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  tenant: null,
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

  const value = { isAuthenticated, token, tenant };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
