import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  ApiResponse,
  ArticleData,
  getArticleById,
  getArticles,
} from "../../services/articleService";
import ArticleView from "../UI/ArticleView";

function ArticleDetail() {
  const [articles, setArticles] = useState<ArticleData[]>([]);

  const article: ArticleData = useLoaderData() as ArticleData;

  const params = useParams<{ articleId?: string }>();

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

  const filteredRelatedArticles = articles.filter(
    (article) => article.articleId !== params.articleId
  );

  return (
    <Grid>
      <ArticleView article={article} articles={filteredRelatedArticles} />
    </Grid>
  );
}

export default ArticleDetail;

export const loader = async ({ params }: { params: any }) => {
  const { articleId } = params;
  if (!articleId) {
    console.error("Article ID is undefined");
    return;
  }
  const response = await getArticleById(articleId);

  if (!response) {
    throw Error("Could not find that article");
  }

  return response;
};
