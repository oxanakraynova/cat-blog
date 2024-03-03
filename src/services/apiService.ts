import axios from "axios";

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

export interface ImageInfo {
  imageId: File | null;
  name: string;
}

export interface Tenant {
  tenantId: string;
  name: string;
}

export const apiKey = "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22";
export const baseUrl = "https://fullstack.exercise.applifting.cz";
export const tenantId = "65d9149a-d9e7-47ac-b353-b198a3d036c9";
const articleUrl = "https://fullstack.exercise.applifting.cz/articles";
const imageUrl = "https://fullstack.exercise.applifting.cz/images";
export const bearerToken = "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d";
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

export const getTenantById = async (tenantId: string): Promise<Tenant> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(`${baseUrl}/tenants/${tenantId}`, {
      headers,
    });
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

    const response = await axios.get(`${imageUrl}/${imageId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const createArticle = async (
  data: ArticleData
): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      apiKey: apiKey,
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
  data: ArticleData
): Promise<ArticleData> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      apiKey: apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.patch(articleUrl, data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
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
