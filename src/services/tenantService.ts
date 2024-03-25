import { apiClient } from "./apiService";

export interface Tenant {
  tenantId: string;
  name: string;
}

export const tenantId = "65d9149a-d9e7-47ac-b353-b198a3d036c9";

export const getTenantById = async (tenantId: string): Promise<Tenant> => {
  try {
    const response = await apiClient.get(`/tenants/${tenantId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
