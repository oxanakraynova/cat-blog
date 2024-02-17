import {
  Card,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Stack,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiKey, ArticleData, bearerToken } from "../../services/apiService";

type PostCardProps = {
  article: ArticleData;
};

function PostCard({ article }: PostCardProps) {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );
  const [imageData, setImageData] = useState<string | null>(null);

  const handleReadMore = (articleId: string) => {
    setExpandedArticleId(articleId);
  };

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        if (article.imageId) {
          const response = await axios.get(
            `https://fullstack.exercise.applifting.cz/images/${article.imageId}`,
            {
              responseType: "arraybuffer",
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey,
                Authorization: bearerToken,
              },
            }
          );
          const blob = new Blob([response.data], { type: "image/jpeg" });

          const imageUrl = URL.createObjectURL(blob);

          setImageData(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchImageData();
    return () => {
      if (imageData) {
        URL.revokeObjectURL(imageData);
      }
    };
  }, [article.imageId]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        ml: "5%",
        gap: "1rem",
      }}
    >
      {imageData ? (
        <CardMedia
          component="img"
          sx={{
            maxWidth: "15rem",
            height: "100%",
            objectFit: "cover",
            maxHeight: "10rem",
          }}
          src={imageData}
          alt={article.title}
        />
      ) : (
        "No image available."
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <CardContent>
          <Typography component="div" variant="h5" sx={{ marginBottom: 1 }}>
            {article.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {article.author ? article.author : "No author available."}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                • {formatDate(article.createdAt!)}
              </Typography>
            </Grid>
          </Grid>
          <Typography component="div" variant="body2" sx={{ marginTop: 1 }}>
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
                component="div"
              >
                {article.comments
                  ? article.comments + " comments"
                  : "No comments available."}
              </Typography>
            </Stack>
          </CardActions>
        </CardContent>
      </Box>
    </Card>
  );
}

export default PostCard;
