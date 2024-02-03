import { Box, Grid, Typography } from "@mui/material";
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

  if (!articles.length) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Articles not found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <PostCard articles={articles} />
      </Grid>
    </>
  );
}

export default ArticleList;
