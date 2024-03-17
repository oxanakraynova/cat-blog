import { Container } from "@mui/material";
import AdminArticleList from "../Articles/AdminArticleList";

function AdminArticlesPage() {
  return (
    <>
      <Container maxWidth="lg">
        <AdminArticleList />
      </Container>
    </>
  );
}

export default AdminArticlesPage;
