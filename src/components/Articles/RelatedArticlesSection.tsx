import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArticleData } from "../../services/apiService";

type RelatedArticlesSectionProps = {
  openedArticleId: string;
  articles: ArticleData[];
};

function RelatedArticlesSection({
  openedArticleId,
  articles,
}: RelatedArticlesSectionProps) {
  const filteredRelatedArticles = articles.filter(
    (article) => article.articleId !== openedArticleId
  );
  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{
        width: "23rem",
        height: "37rem",
        position: "sticky",
        top: "-11%",
        zIndex: 1,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25rem",
          height: "auto",
          marginLeft: "30%",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "1.5rem" }}
          >
            Related Articles
          </Typography>
          {filteredRelatedArticles.map((article) => (
            <div key={article.articleId}>
              <Link
                to={`/articles/${article.articleId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                >
                  {article.title}
                </Typography>
              </Link>
              <Typography variant="body1" sx={{ marginBottom: "1.5rem" }}>
                {`${article.perex!.slice(0, 200)}...`}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RelatedArticlesSection;
