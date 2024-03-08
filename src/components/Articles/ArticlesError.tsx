import { Box, Button, Typography } from "@mui/material";
import { NavLink, useRouteError } from "react-router-dom";
import MainNavigation from "../Layout/MainNavigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface RouteError {
  message: string;
  // Add additional properties if necessary
}

function ArticlesError() {
  const error: RouteError | null = useRouteError() as RouteError | null;
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
          Error
        </Typography>
        <Typography variant="h6" gutterBottom>
          {error && error.message}
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

export default ArticlesError;
