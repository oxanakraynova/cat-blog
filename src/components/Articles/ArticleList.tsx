import { Grid } from "@mui/material";
import articleList from "./articleList.json";
import CustomCard from "./CustomCard";

function ArticleList() {
  const currentArticleList = articleList.map((article: any) => (
    <CustomCard
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
