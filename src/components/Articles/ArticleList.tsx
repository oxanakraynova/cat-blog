import { Grid } from "@mui/material";
import ArticleCard from "../UI/ArticleCard";
import { ArticleData, getArticles } from "../../services/articleService";
import { useLoaderData } from "react-router-dom";

function ArticleList() {
  const articles: ArticleData[] = useLoaderData() as ArticleData[];

  return (
    <>
      {articles.map((article) => (
        <Grid container spacing={3} key={article.articleId}>
          <Grid item xs={12}>
            <ArticleCard article={article} />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default ArticleList;

export const loader = async () => {
  const response = await getArticles();

  if (!response) {
    throw Error("Could not fetch the articles");
  }

  return response.items;
};
