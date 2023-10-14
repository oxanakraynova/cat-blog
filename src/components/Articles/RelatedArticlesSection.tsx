import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type RelatedArticle = {
  id: string;
  title: string;
  perex: string;
};

type RelatedArticlesSectionProps = {
  openedArticleId: string;
  articles: RelatedArticle[];
};

function RelatedArticlesSection({
  openedArticleId,
  articles,
}: RelatedArticlesSectionProps) {
  const filteredRelatedArticles = articles.filter(
    (article) => article.id !== openedArticleId
  );
  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{ width: "371px", height: "596px", marginTop: "136px" }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "760px",
          height: "691px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "24px" }}
          >
            Related Articles
          </Typography>
          {filteredRelatedArticles.map((article) => (
            <div key={article.id}>
              <Link
                to={`/articles/${article.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "8px" }}
                >
                  {article.title}
                </Typography>
              </Link>
              <Typography variant="body1" sx={{ marginBottom: "24px" }}>
                {`${article.perex.slice(0, 200)}...`}
              </Typography>
            </div>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RelatedArticlesSection;
