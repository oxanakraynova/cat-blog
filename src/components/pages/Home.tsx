import { Container, Typography } from "@mui/material";

function HomePage() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ pb: 3, fontWeight: "bold" }}
        >
          Recent articles
        </Typography>
      </Container>
    </>
  );
}

export default HomePage;
