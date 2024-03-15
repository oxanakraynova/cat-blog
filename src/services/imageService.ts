import axios from "axios";
import { ArticleData } from "../services/articleService";
import { apiKey, bearerToken } from "./apiService";

export interface ImageInfo {
  imageId: File | null;
  name: string;
}
export const imageUrl = "https://fullstack.exercise.applifting.cz/images";

export const getImageById = async (imageId: string): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(`${imageUrl}/${imageId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const postImage = async (data: File | null): Promise<ImageInfo> => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      apiKey: apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.post(`${imageUrl}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error uploading an image:", error);
    throw error;
  }
};

export const deleteImage = async (imageId: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.delete(`${imageUrl}/${imageId}`, {
      headers,
    });

    console.log("Image deleted successfully.", response.data);
  } catch (error) {
    console.error("Error deleting image", error);
    throw error;
  }
};
