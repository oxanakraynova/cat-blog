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
import getImageByFilename from "./ImagesList";

type ArticleProps = {
  id: string;
  image: string;
  title: string;
  perex: string;
  publicationDate: string;
  author: string;
  comments: string;
};

function CustomCard(article: ArticleProps) {
  return (
    <>
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
              <Typography component="div" variant="h5" sx={{ mb: 1 }}>
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
                    • {article.publicationDate}
                  </Typography>
                </Grid>
              </Grid>
              <Typography component="div" variant="body2" sx={{ mt: 1 }}>
                {article.perex}
              </Typography>
              <CardActions>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="text">Read whole article</Button>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                  >
                    {article.comments}
                  </Typography>
                </Stack>
              </CardActions>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </>
  );
}

export default CustomCard;
