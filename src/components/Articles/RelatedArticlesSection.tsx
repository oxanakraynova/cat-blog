import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ArticleData } from "../../services/articleService";

type RelatedArticlesSectionProps = {
  openedArticleId: string;
  articles: ArticleData[];
};

function RelatedArticlesSection({
  openedArticleId,
  articles,
}: RelatedArticlesSectionProps) {
  const filteredRelatedArticles = articles
    .filter((article) => article.articleId !== openedArticleId)
    .slice(0, 5);
  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{
        width: "23rem",
        height: "auto",
        position: "sticky",
        zIndex: 1,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "25rem",
          height: "auto",
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Related Articles
          </Typography>
          {filteredRelatedArticles.map((article) => (
            <Fragment key={article.articleId}>
              <Link
                to={`/articles/${article.articleId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ marginTop: "1rem" }}
                >
                  {article.title}
                </Typography>
              </Link>
              <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
                {article.perex
                  ? article.perex + " ..."
                  : "No description available."}
              </Typography>
            </Fragment>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RelatedArticlesSection;
