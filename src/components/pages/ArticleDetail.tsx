import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import articleList from "../Articles/articleList.json";
import PostView from "../UI/PostView";

function ArticleDetailPage() {
  const params = useParams<{ articleId: string }>();

  const selectedArticle = articleList.find(
    (article: any) => article.id === params.articleId
  );

  const filteredRelatedArticles = articleList.filter(
    (article) => article.id !== params.articleId
  );

  if (!selectedArticle) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "20%",
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
        <PostView
          article={selectedArticle}
          articles={filteredRelatedArticles}
        />
      </Grid>
    </>
  );
}

export default ArticleDetailPage;
