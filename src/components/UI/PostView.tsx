import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import RelatedArticlesSection from "../Articles/RelatedArticlesSection";
import CommentsSection from "../Comments/CommentsSection";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { ArticleData } from "../../services/articleService";
import { getImageById } from "../../services/imageService";

function PostView({
  article,
  articles,
}: {
  article: ArticleData;
  articles: ArticleData[];
}) {
  const [imageData, setImageData] = useState<string | null>(null);

  const { tenant } = useAuth();

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        if (!article.imageId) {
          console.error("Image ID is undefined");
          return;
        }
        const response = await getImageById(article.imageId);
        const blob = new Blob([response], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    if (article.imageId) {
      fetchImageData();
    }
  }, [article.imageId]);

  const createdAtDate = new Date(article.createdAt!);
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
              width: "50rem",
              height: "auto",
              ml: "15%",
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
                    {tenant ? tenant.name : "No author available."}
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="subtitle2" color="text.secondary">
                    • {formattedDate}
                  </Typography>
                </Grid>
              </Grid>
              {imageData && (
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "31.5rem",
                    marginTop: "1.5rem",
                    objectFit: "cover",
                  }}
                  src={imageData}
                  alt={article.title}
                />
              )}
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </CardContent>
          </Card>
          <CommentsSection article={article} />
        </Grid>
        <RelatedArticlesSection
          openedArticleId={article.articleId!}
          articles={articles}
        />
      </Grid>
    </>
  );
}

export default PostView;
