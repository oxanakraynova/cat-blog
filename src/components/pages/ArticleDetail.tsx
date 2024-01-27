import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleData, getArticleById } from "../../services/apiService";
import articleList from "../Articles/articleList.json";
import PostView from "../UI/PostView";

function ArticleDetailPage() {
  const [article, setArticle] = useState<ArticleData | null>(null);

  const params = useParams<{ articleId?: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleId = params.articleId;
        if (!articleId) {
          console.error("Article ID is undefined");
          return;
        }
        const response = await getArticleById(articleId);
        setArticle(response);
      } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
      }
    };
    fetchArticle();
  }, [params.articleId]);

  const filteredRelatedArticles = articleList.filter(
    (article) => article.articleId !== params.articleId
  );

  if (!article) {
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
          Article not found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid>
        <PostView article={article} articles={filteredRelatedArticles} />
      </Grid>
    </>
  );
}

export default ArticleDetailPage;
