import axios from "axios";
import { InitialValuesForm } from "../components/Comments/CommentsSection";
import { apiKey, bearerToken, baseUrl } from "./apiService";

export const createComment = async (
  data: InitialValuesForm
): Promise<InitialValuesForm> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.post(`${baseUrl}/comments`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading an image:", error);
    throw error;
  }
};
