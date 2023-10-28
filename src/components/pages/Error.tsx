import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import MainNavigation from "../MainNavigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
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
          An error occured!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Could not find this page!
        </Typography>
        <Box m={2} display="flex" justifyContent="center" alignItems="center">
          <Button
            to="/articles"
            component={NavLink}
            variant="contained"
            color="primary"
            sx={{ height: "2.5rem", width: "9rem" }}
            startIcon={<ArrowBackIcon />}
          >
            GO HOME
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ErrorPage;
