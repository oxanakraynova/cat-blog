import axios from "axios";
import { apiKey, bearerToken, baseUrl } from "./apiService";

export interface Tenant {
  tenantId: string;
  name: string;
}

export const tenantId = "65d9149a-d9e7-47ac-b353-b198a3d036c9";

export const getTenantById = async (tenantId: string): Promise<Tenant> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(`${baseUrl}/tenants/${tenantId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
