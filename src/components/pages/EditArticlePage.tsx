import { Container } from "@mui/material";
import ArticleForm from "../Forms/ArticleForm/ArticleForm";

function EditArticlePage() {
  return (
    <>
      <Container maxWidth="lg">
        <ArticleForm mode="EDIT" />
      </Container>
    </>
  );
}

export default EditArticlePage;
