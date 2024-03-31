import { apiClient } from "./apiService";

export interface InitialValuesForm {
  articleId: string | undefined;
  author: string | undefined;
  content: string;
  commentId?: string;
  postedAt?: string;
  score?: number;
}

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

export const upvoteComment = async (
  commentId: string
): Promise<InitialValuesForm> => {
  try {
    const response = await apiClient.post(`/comments/${commentId}/vote/up`);
    return response.data;
  } catch (error) {
    console.error("Error upvoting a comment:", error);
    throw error;
  }
};

export const downvoteComment = async (
  commentId: string
): Promise<InitialValuesForm> => {
  try {
    const response = await apiClient.post(`/comments/${commentId}/vote/down`);
    return response.data;
  } catch (error) {
    console.error("Error downvoting a comment:", error);
    throw error;
  }
};
