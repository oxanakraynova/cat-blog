import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import getImageByFilename from "../Articles/ImagesList";
import RelatedArticlesSection from "../Articles/RelatedArticlesSection";
import CommentsSection from "../Articles/CommentsSection";
import ReactMarkdown from "react-markdown";

type ArticleProps = {
  id: string;
  image: string;
  title: string;
  perex: string;
  publicationDate: string;
  author: string;
  comments: number;
};

type RelatedArticle = {
  id: string;
  title: string;
  perex: string;
};

function PostView({
  article,
  articles,
}: {
  article: ArticleProps;
  articles: RelatedArticle[];
}) {
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
              ml: "14rem",
              mt: "7.5rem",
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
                    • {article.publicationDate}
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
                src={getImageByFilename(article.image)}
                alt={article.title}
              />
              <ReactMarkdown>{article.perex}</ReactMarkdown>
            </CardContent>
          </Card>
          <CommentsSection id={article.id} comments={article.comments} />
        </Grid>
        <RelatedArticlesSection
          openedArticleId={article.id}
          articles={articles}
        />
      </Grid>
    </>
  );
}

export default PostView;
