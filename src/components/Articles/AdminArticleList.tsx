import { Button, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
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
        sx={{ marginLeft: "224px" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            pb: 3,
            fontWeight: "bold",
          }}
        >
          My articles
        </Typography>

        <Button variant="contained" component={NavLink} to="/admin/new">
          Create new article
        </Button>
      </Stack>
      <MyArticleTable article={article} />
    </>
  );
}

export default AdminArticleList;
