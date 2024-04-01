import {
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Stack,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { ArticleData } from "../../services/articleService";
import { getImageById } from "../../services/imageService";
import { formatDate } from "../../utils/formatDate";
import { FlexColumnBox, FlexRowCard } from "./styled/styledLayout";

type ArticleCardProps = {
  article: ArticleData;
};

function ArticleCard({ article }: ArticleCardProps) {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );
  const [imageData, setImageData] = useState<string | null>(null);

  const { tenant } = useAuth();

  const handleReadMore = (articleId: string) => {
    setExpandedArticleId(articleId);
  };

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

  return (
    <FlexRowCard elevation={0}>
      {imageData ? (
        <CardMedia
          component="img"
          sx={{
            maxWidth: "15rem",
            objectFit: "cover",
            maxHeight: "13rem",
          }}
          src={imageData}
          alt={article.title}
        />
      ) : (
        "No image available."
      )}
      <FlexColumnBox>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {article.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {tenant ? tenant.name : "No author available."}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                • {formatDate(article.createdAt!)}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" gutterBottom>
            {article.perex
              ? article.perex + " ..."
              : "No description available."}
          </Typography>
          <CardActions>
            <Stack direction="row" spacing={2} alignItems="center">
              {expandedArticleId !== article.articleId && (
                <Link to={`/articles/${article.articleId}`}>
                  <Button
                    onClick={() => handleReadMore(article.articleId!)}
                    variant="text"
                  >
                    Read whole article
                  </Button>
                </Link>
              )}
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {article.comments
                  ? article.comments + " comments"
                  : 0 + " comments"}
              </Typography>
            </Stack>
          </CardActions>
        </CardContent>
      </FlexColumnBox>
    </FlexRowCard>
  );
}

export default ArticleCard;
