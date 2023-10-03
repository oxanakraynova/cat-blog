import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import articleList from "../Articles/articleList.json";
import PostView from "../UI/PostView";

function ArticleDetailPage() {
  const params = useParams<{ articleId: string }>();

  const selectedArticle = articleList.find(
    (article: any) => article.id === params.articleId
  );

  const filteredRelatedArticles = articleList.filter(
    (article) => article.id !== params.articleId
  );

  if (!selectedArticle) {
    return <div>Article not found</div>;
  }

  return (
    <>
      <Grid>
        <PostView
          article={selectedArticle}
          articles={filteredRelatedArticles}
        />
      </Grid>
    </>
  );
}

export default ArticleDetailPage;
