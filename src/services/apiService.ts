import axios from "axios";

export interface ArticleData {
  id: string;
  image: string;
  title: string;
  perex: string;
  publicationDate: string;
  author: string;
  comments: number;
}

export interface ApiResponse {
  items: ArticleData[];
  pagination: {};
}

export interface NewArticle {
  id?: string;
  // imageId: string | null;
  title: string;
  content: string;
  publicationDate: string;
  author: string;
  comments?: number;
}

const apiKey = "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22";
const baseUrl = "https://fullstack.exercise.applifting.cz/articles";
const bearerToken = "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d";

export const getArticles = async (): Promise<ArticleData[]> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      Authorization: bearerToken,
    };

    const response = await axios.get(baseUrl, { headers });
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
