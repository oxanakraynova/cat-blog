import { Box, Button, Typography } from "@mui/material";
import { NavLink, useRouteError } from "react-router-dom";
import MainNavigation from "../Layout/MainNavigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ErrorPage() {
  const error: unknown = useRouteError();
  const statusText = (error as { statusText?: string })?.statusText;
  const errorMessage = (error as Error)?.message;
  const status = (error as { status?: number })?.status;
  const data = (error as { data?: string })?.data;

  return (
    <>
      <MainNavigation />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          An error occured!
        </Typography>
        <Typography variant="h4" gutterBottom>
          {data || "Sorry, an unexpected error has occurred."}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {status && statusText
            ? status + " " + statusText
            : statusText || errorMessage}
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
