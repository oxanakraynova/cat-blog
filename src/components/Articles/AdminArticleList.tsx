import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Header from "../UI/Header";
import MyArticleTable from "./MyArticleTable";

type ArticleProps = {
  id: string;
  title: string;
  perex: string;
  author: string;
  comments: number;
};

function AdminArticleList(article: ArticleProps) {
  return (
    <>
      <Stack
        direction="row"
        spacing={5}
        alignItems="flex-start"
        sx={{ marginLeft: "14rem" }}
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
