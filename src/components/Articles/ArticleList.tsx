import { Grid } from "@mui/material";
import PostCard from "../UI/PostCard";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  ArticleData,
  getArticles,
} from "../../services/apiService";
import Loading from "../UI/Loading";

function ArticleList() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const response: ApiResponse = await getArticles();
        setArticles(response.items || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {articles.map((article) => (
        <Grid container spacing={3}>
          <Grid item xs={12} key={article.articleId}>
            <PostCard article={article} />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default ArticleList;
