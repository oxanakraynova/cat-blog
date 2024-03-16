import axios from "axios";
import { apiKey, bearerToken } from "./apiService";

export interface ImageInfo {
  imageId: string | null;
  name: string;
}
export const imageUrl = "https://fullstack.exercise.applifting.cz/images";

export const getImageById = async (imageId: string): Promise<ArrayBuffer> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(`${imageUrl}/${imageId}`, {
      headers,
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching an image:", error);
    throw error;
  }
};

export const postImage = async (data: FormData): Promise<ImageInfo> => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      "X-API-KEY": apiKey,
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
