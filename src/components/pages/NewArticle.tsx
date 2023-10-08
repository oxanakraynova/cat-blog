import { Container } from "@mui/material";
import ArticleForm from "../Articles/ArticleForm";

function NewArticlePage() {
  return (
    <>
      <Container maxWidth="lg">
        <ArticleForm mode="create" />
      </Container>
    </>
  );
}

export default NewArticlePage;
