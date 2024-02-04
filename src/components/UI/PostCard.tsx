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
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArticleData } from "../../services/apiService";

type PostCardProps = {
  articles: ArticleData[];
};

function PostCard({ articles }: PostCardProps) {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  const handleReadMore = (articleId: string) => {
    setExpandedArticleId(articleId);
  };

  const sortedArticles = [...articles].sort(
    (a: ArticleData, b: ArticleData) => {
      if (typeof a.createdAt === "string" && typeof b.createdAt === "string") {
        return b.createdAt.localeCompare(a.createdAt);
      }
      return 0;
    }
  );

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  return (
    <>
      {sortedArticles.map((article) => (
        <Grid item xs={12} key={article.articleId}>
          <Card
            sx={{
              display: "flex",
              width: "53.5rem",
              height: "15rem",
              ml: "14rem",
              gap: "1rem",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "17rem", height: "15rem" }}
              src={article.imageId}
              alt={article.title}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "35rem",
                height: "13.5rem",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{ marginBottom: 1 }}
                >
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
                <Typography
                  component="div"
                  variant="body2"
                  sx={{ marginTop: 1 }}
                >
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
                        : "No comments available."}{" "}
                    </Typography>
                  </Stack>
                </CardActions>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </>
  );
}

export default PostCard;
