import { InitialValuesForm } from "../components/Comments/CommentsSection";
import { apiClient } from "./apiService";

export const createComment = async (
  data: InitialValuesForm
): Promise<InitialValuesForm> => {
  try {
    const response = await apiClient.post("/comments", data);
    return response.data;
  } catch (error) {
    console.error("Error uploading a comment:", error);
    throw error;
  }
};
