import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function ArticleDetailPage() {
  const params = useParams();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Article details
        </Typography>
        <Typography variant="h6" gutterBottom>
          {params.articleId}
        </Typography>
      </Box>
    </>
  );
}

export default ArticleDetailPage;
