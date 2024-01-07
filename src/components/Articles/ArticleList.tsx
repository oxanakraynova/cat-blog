import { Grid } from "@mui/material";
import PostCard from "../UI/PostCard";
import { useEffect, useState } from "react";
import { ArticleData, getArticles } from "../../services/apiService";

function ArticleList() {
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await getArticles();
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      }
    };
    fetchArticles();
  }, []);
  const currentArticleList = articles.map((article: ArticleData) => article);

  return (
    <>
      <Grid container spacing={3}>
        <PostCard articles={currentArticleList} />
      </Grid>
    </>
  );
}

export default ArticleList;
