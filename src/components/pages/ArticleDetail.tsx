import { Grid } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";
import { ArticleData, getArticleById } from "../../services/apiService";
import articleList from "../Articles/articleList.json";
import PostView from "../UI/PostView";

function ArticleDetailPage() {
  const article: ArticleData = useLoaderData() as ArticleData;

  const params = useParams<{ articleId?: string }>();

  const filteredRelatedArticles = articleList.filter(
    (article) => article.articleId !== params.articleId
  );

  return (
    <>
      <Grid>
        <PostView article={article} articles={filteredRelatedArticles} />
      </Grid>
    </>
  );
}

export default ArticleDetailPage;

export const articleDetailsLoader = async ({ params }: { params: any }) => {
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
