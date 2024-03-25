import { apiClient } from "./apiService";

export interface ArticleData {
  articleId?: string;
  imageId?: string;
  title?: string;
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

export const getArticles = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get(
      `/articles?sortBy=${sortBy}&sortOrder=${sortOrder}`
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
    const response = await apiClient.get(`/articles/${articleId}`);
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
    const response = await apiClient.post("/articles", data);
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
    const response = await apiClient.patch(`/articles/${articleId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

export const deleteArticle = async (articleId: string) => {
  try {
    const response = await apiClient.delete(`/articles/${articleId}`);

    console.log("Article deleted successfully.", response.data);
  } catch (error) {
    console.error("Error deleting article", error);
    throw error;
  }
};
