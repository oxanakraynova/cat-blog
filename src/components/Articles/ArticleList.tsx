import { Grid } from "@mui/material";
import articleList from "./articleList.json";
import PostCard from "../UI/PostCard";

function ArticleList() {
  const currentArticleList = articleList.map((article: any) => (
    <PostCard
      id={article.id}
      key={article.id}
      image={article.image}
      title={article.title}
      perex={article.perex}
      publicationDate={article.publicationDate}
      author={article.author}
      comments={article.comments}
    />
  ));

  return (
    <>
      <Grid container spacing={3}>
        {currentArticleList}
      </Grid>
    </>
  );
}

export default ArticleList;
