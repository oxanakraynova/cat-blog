import { apiClient } from "./apiService";

export interface ImageInfo {
  imageId: string | null;
  name: string;
}
export const imageUrl = "https://fullstack.exercise.applifting.cz/images";

export const getImageById = async (imageId: string): Promise<ArrayBuffer> => {
  try {
    const response = await apiClient.get(`/images/${imageId}`, {
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
    const response = await apiClient.post("/images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading an image:", error);
    throw error;
  }
};

export const deleteImage = async (imageId: string) => {
  try {
    const response = await apiClient.delete(`/images/${imageId}`);
    console.log("Image deleted successfully.", response.data);
  } catch (error) {
    console.error("Error deleting image", error);
    throw error;
  }
};
