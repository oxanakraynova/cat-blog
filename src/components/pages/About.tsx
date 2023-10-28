import { Container, Typography } from "@mui/material";
import AboutArticle from "../Articles/AboutArticle";

function AboutPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            pb: 3,
            fontWeight: "bold",
            marginLeft: "14rem",
          }}
        >
          About
        </Typography>
        <AboutArticle />
      </Container>
    </>
  );
}

export default AboutPage;
