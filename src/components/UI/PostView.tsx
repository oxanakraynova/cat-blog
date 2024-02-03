import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import RelatedArticlesSection from "../Articles/RelatedArticlesSection";
import CommentsSection from "../Articles/CommentsSection";
import ReactMarkdown from "react-markdown";
import { ArticleData } from "../../services/apiService";

type RelatedArticle = {
  articleId: string;
  title: string;
  perex: string;
};

function PostView({
  article,
  articles,
}: {
  article: ArticleData;
  articles: RelatedArticle[];
}) {
  const createdAtDate = new Date(article.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <Grid container spacing={30}>
        <Grid item xs={12} sm={8}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "47.5rem",
              minHeight: 0,
              ml: "30%",
              mt: "15%",
              gap: "1.5rem",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="h3"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {article.title}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {article.author}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="subtitle2" color="text.secondary">
                    • {formattedDate}
                  </Typography>
                </Grid>
              </Grid>
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "31.5rem",
                  marginTop: "1.5rem",
                  objectFit: "cover",
                }}
                src={article.imageId}
                alt={article.title}
              />
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </CardContent>
          </Card>
          <CommentsSection id={article.articleId} comments={article.comments} />
        </Grid>
        <RelatedArticlesSection
          openedArticleId={article.articleId}
          articles={articles}
        />
      </Grid>
    </>
  );
}

export default PostView;
