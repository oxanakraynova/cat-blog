import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ArticleData } from "../../services/apiService";
import Header from "../UI/Header";
import MyArticleTable from "./MyArticleTable";

function AdminArticleList(article: ArticleData) {
  return (
    <>
      <Stack
        direction="row"
        spacing={5}
        alignItems="flex-start"
        sx={{ marginLeft: "5%" }}
      >
        <Header title="My articles" />
        <Button variant="contained" component={NavLink} to="/admin/new">
          Create new article
        </Button>
      </Stack>
      <MyArticleTable article={article} />
    </>
  );
}

export default AdminArticleList;
