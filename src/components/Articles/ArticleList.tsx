import { Grid } from "@mui/material";
import PostCard from "../UI/PostCard";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  ArticleData,
  getArticles,
} from "../../services/apiService";

function ArticleList() {
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

  return (
    <>
      <Grid container spacing={3}>
        <PostCard articles={articles} />
      </Grid>
    </>
  );
}

export default ArticleList;
