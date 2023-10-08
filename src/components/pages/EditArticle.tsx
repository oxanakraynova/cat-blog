import { Container } from "@mui/material";
import ArticleForm from "../Articles/ArticleForm";

function EditArticlePage() {
  return (
    <>
      <Container maxWidth="lg">
        <ArticleForm mode="edit" />
      </Container>
    </>
  );
}

export default EditArticlePage;
