import { Box, Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ArticleData } from "../../services/articleService";
import Header from "../UI/Header";
import MyArticleTable from "./MyArticleTable";

function AdminArticleList(article: ArticleData) {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      minHeight="100vh"
      position="relative"
    >
      <Stack
        direction="row"
        spacing={5}
        alignItems="flex-start"
        marginBottom="3%"
      >
        <Header title="My articles" />
        <Button variant="contained" component={NavLink} to="new">
          Create new article
        </Button>
      </Stack>
      <MyArticleTable article={article} />
    </Box>
  );
}

export default AdminArticleList;
