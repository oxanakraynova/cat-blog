import { createContext, useContext, useEffect, useState } from "react";
import { ApiResponse, ArticleData, getArticles } from "../services/apiService";
import { Children } from "../types/common";

interface ArticleContextType {
  articles: ArticleData[];
}

const ArticleContext = createContext<ArticleContextType>({
  articles: [],
});

export const useArticle = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }: Children) => {
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response: ApiResponse = await getArticles();
        setArticles(response.items || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
    };
    fetchArticles();
  }, []);

  const value = { articles };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};
