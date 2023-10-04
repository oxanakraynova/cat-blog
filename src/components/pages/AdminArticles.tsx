import { Container } from "@mui/material";
import AdminArticleList from "../Articles/AdminArticleList";

function AdminArticlesPage() {
  return (
    <>
      <Container maxWidth="lg">
        <AdminArticleList
          id={""}
          title={""}
          perex={""}
          author={""}
          comments={0}
        />
      </Container>
    </>
  );
}

export default AdminArticlesPage;
