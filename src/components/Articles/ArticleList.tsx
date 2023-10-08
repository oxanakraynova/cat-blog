import { Grid } from "@mui/material";
import articleList from "./articleList.json";
import PostCard from "../UI/PostCard";

type ArticleData = {
  id: string;
  image: string;
  title: string;
  perex: string;
  publicationDate: string;
  author: string;
  comments: number;
};

function ArticleList() {
  const currentArticleList = articleList.map((article: ArticleData) => article);

  return (
    <>
      <Grid container spacing={3}>
        <PostCard articles={currentArticleList} />
      </Grid>
    </>
  );
}

export default ArticleList;
