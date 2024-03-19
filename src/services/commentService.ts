import axios from "axios";
import { InitialValuesForm } from "../components/Comments/CommentsSection";
import { apiKey, bearerToken } from "./apiService";

export const commentUrl = "https://fullstack.exercise.applifting.cz/comments";

export const createComment = async (
  data: InitialValuesForm
): Promise<InitialValuesForm> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.post(commentUrl, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading a comment:", error);
    throw error;
  }
};
