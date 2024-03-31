import { Grid } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";
import { useArticle } from "../../auth/ArticleProvider";
import { ArticleData, getArticleById } from "../../services/articleService";
import ArticleView from "../UI/ArticleView";

function ArticleDetail() {
  const article: ArticleData = useLoaderData() as ArticleData;

  const params = useParams<{ articleId?: string }>();

  const { articles } = useArticle();

  const filteredRelatedArticles = articles.filter(
    (article) => article.articleId !== params.articleId
  );

  return (
    <Grid>
      <ArticleView article={article} articles={filteredRelatedArticles} />
    </Grid>
  );
}

export default ArticleDetail;

export const loader = async ({ params }: { params: any }) => {
  const { articleId } = params;
  if (!articleId) {
    console.error("Article ID is undefined");
    return;
  }
  const response = await getArticleById(articleId);

  if (!response) {
    throw Error("Could not find that article");
  }

  return response;
};
