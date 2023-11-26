import { Container } from "@mui/material";
import ArticleList from "../Articles/ArticleList";
import Header from "../UI/Header";

function ArticlesPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Header title="Recent articles" />
        <ArticleList />
      </Container>
    </>
  );
}

export default ArticlesPage;
