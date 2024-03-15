import { Container } from "@mui/material";
import ArticleForm from "../Forms/ArticleForm/ArticleForm";

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
