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
              width: "860px",
              height: "244px",
              ml: "224px",
              gap: "16px",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "272px", height: "244px" }}
              src={getImageByFilename(article.image)}
              alt={article.title}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "561px",
                height: "220px",
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
                  {article.perex}
                </Typography>
                <CardActions>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Link to={`/articles/${article.id}`}>
                      <Button variant="text">Read whole article</Button>
                    </Link>
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
