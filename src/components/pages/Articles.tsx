import { Container, Typography } from "@mui/material";
import ArticleList from "../Articles/ArticleList";

function ArticlesPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            pb: 3,
            fontWeight: "bold",
            marginLeft: "14rem",
            marginTop: "7.5rem",
          }}
        >
          Recent articles
        </Typography>
        <ArticleList />
      </Container>
    </>
  );
}

export default ArticlesPage;
