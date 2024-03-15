import { Grid } from "@mui/material";
import PostCard from "../UI/PostCard";
import { ArticleData, getArticles } from "../../services/articleService";
import { useLoaderData } from "react-router-dom";

function ArticleList() {
  const articles: ArticleData[] = useLoaderData() as ArticleData[];

  return (
    <>
      {articles.map((article) => (
        <Grid container spacing={3} key={article.articleId}>
          <Grid item xs={12}>
            <PostCard article={article} />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default ArticleList;

export const articlesLoader = async () => {
  const response = await getArticles();

  if (!response) {
    throw Error("Could not fetch the articles");
  }

  return response.items;
};
