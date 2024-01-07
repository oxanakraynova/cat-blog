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

export interface NewArticle {
  id?: string;
  image: string;
  title: string;
  perex: string;
  publicationDate: string;
  author: string;
  comments?: number;
}

export const getArticles = async (): Promise<ArticleData[]> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      apiKey: "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22",
      Authorization: "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d",
    };

    const response = await axios.get(
      "https://fullstack.exercise.applifting.cz/articles",
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const postArticles = async (
  newArticle: NewArticle
): Promise<ArticleData[]> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      apiKey: "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22",
      Authorization: "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d",
    };

    const response = await axios.post(
      "https://fullstack.exercise.applifting.cz/articles",
      newArticle,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
