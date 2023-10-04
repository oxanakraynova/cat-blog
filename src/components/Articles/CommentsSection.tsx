import { Card, CardContent, Typography } from "@mui/material";

type CommentsProps = {
  id: string;
  comments: number;
};

function CommentsSection(article: CommentsProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "760px",
        height: "691px",
        mt: "24px",
        ml: "224px",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          color="text.primary"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Comments ({article.comments})
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentsSection;
