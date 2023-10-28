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
import getImageByFilename from "../Articles/ImagesList";

type ArticleProps = {
  id: string;
  image: string;
  title: string;
  perex: string;
  publicationDate: string;
  author: string;
  comments: number;
};

type PostCardProps = {
  articles: ArticleProps[];
};

function PostCard({ articles }: PostCardProps) {
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    null
  );

  const handleReadMore = (articleId: string) => {
    setExpandedArticleId(articleId);
  };

  const sortedArticles = [...articles].sort(
    (a: ArticleProps, b: ArticleProps) => {
      if (
        typeof a.publicationDate === "string" &&
        typeof b.publicationDate === "string"
      ) {
        return b.publicationDate.localeCompare(a.publicationDate);
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
        <Grid item xs={12} key={article.id}>
          <Card
            sx={{
              display: "flex",
              width: "53.5rem",
              height: "14rem",
              ml: "14rem",
              gap: "1rem",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "17rem", height: "14rem" }}
              src={getImageByFilename(article.image)}
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
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      {article.author}
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      • {formatDate(article.publicationDate)}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  component="div"
                  variant="body2"
                  sx={{ marginTop: 1 }}
                >
                  {expandedArticleId === article.id
                    ? article.perex
                    : `${article.perex.slice(0, 200)}...`}
                </Typography>
                <CardActions>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {expandedArticleId !== article.id && (
                      <Link to={`/articles/${article.id}`}>
                        <Button
                          onClick={() => handleReadMore(article.id)}
                          variant="outlined"
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
                      {article.comments} comments
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
