import axios from "axios";

export interface ArticleData {
  articleId: string;
  imageId: string;
  title: string;
  perex: string;
  content: string;
  createdAt: string;
  lastUpdatedAt?: string;
  author?: string;
  comments?: number;
}

export interface ApiResponse {
  items: ArticleData[];
  pagination: {};
}

export interface NewArticle {
  articleId?: string;
  imageId?: string | null;
  title: string;
  content: string;
  publicationDate?: string;
  author?: string;
  comments?: number;
}

export interface ImageInfo {
  imageId: File | null;
  name: string;
}

const apiKey = "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22";
const baseUrl = "https://fullstack.exercise.applifting.cz/articles";
const bearerToken = "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d";
const sortBy = "createdAt";
const sortOrder = "desc";

export const getArticles = async (): Promise<ApiResponse> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(
      `${baseUrl}?sortBy=${sortBy}&sortOrder=${sortOrder}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const getArticleById = async (
  articleId: string
): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(`${baseUrl}/${articleId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const getImageById = async (imageId: string): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(`images/${imageId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const postArticle = async (data: NewArticle): Promise<ArticleData[]> => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      apiKey: apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.post(baseUrl, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const postImage = async (data: File | null): Promise<string> => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
      apiKey: apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.post("/images", data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error uploading an image:", error);
    throw error;
  }
};

export const deleteArticle = async (articleId: string) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.delete(`${baseUrl}/${articleId}`, { headers });

    console.log("Article deleted successfully.", response.data);
  } catch (error) {
    console.error("Error deleting article", error);
    throw error;
  }
};
