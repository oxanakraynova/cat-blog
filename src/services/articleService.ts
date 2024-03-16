import axios from "axios";
import { apiKey, bearerToken } from "./apiService";

export interface ArticleData {
  articleId: string;
  imageId?: string;
  title: string;
  perex?: string;
  content?: string;
  createdAt?: string;
  lastUpdatedAt?: string;
  comments?: number;
}

export interface ApiResponse {
  items: ArticleData[];
  pagination: {};
}

export interface ArticleValuesForm {
  title: string;
  content: string;
  imageId: string | null;
  perex: string;
}

const sortBy = "createdAt";
const sortOrder = "desc";
const articleUrl = "https://fullstack.exercise.applifting.cz/articles";

export const getArticles = async (): Promise<ApiResponse> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(
      `${articleUrl}?sortBy=${sortBy}&sortOrder=${sortOrder}`,
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

    const response = await axios.get(`${articleUrl}/${articleId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const createArticle = async (
  data: ArticleValuesForm
): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.post(articleUrl, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

export const updateArticle = async (
  articleId: string | undefined,
  data: ArticleValuesForm
): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.patch(`${articleUrl}/${articleId}`, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
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

    const response = await axios.delete(`${articleUrl}/${articleId}`, {
      headers,
    });

    console.log("Article deleted successfully.", response.data);
  } catch (error) {
    console.error("Error deleting article", error);
    throw error;
  }
};
