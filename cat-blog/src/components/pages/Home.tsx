import { Box, Typography } from "@mui/material";

function HomePage() {
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="h3" paddingLeft={4} gutterBottom>
          Recent articles
        </Typography>
      </Box>
    </>
  );
}

export default HomePage;
