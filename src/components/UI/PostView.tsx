import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import getImageByFilename from "../Articles/ImagesList";
import RelatedArticlesSection from "../Articles/RelatedArticlesSection";
import CommentsSection from "../Articles/CommentsSection";

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
  const renderParagraphs = (text: string) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };
  return (
    <>
      <Grid container spacing={30}>
        <Grid item xs={12} sm={8}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "760px",
              minHeight: 0,
              ml: "224px",
              mt: "120px",
              gap: "24px",
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
                  height: "504px",
                  marginTop: "24px",
                  objectFit: "cover",
                }}
                src={getImageByFilename(article.image)}
                alt={article.title}
              />
              <div>{renderParagraphs(article.perex)}</div>
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
