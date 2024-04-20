import { Box, Button, Typography } from "@mui/material";
import { NavLink, useRouteError } from "react-router-dom";
import MainNavigation from "../Layout/MainNavigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AbsoluteBoxPosition } from "../UI/styled/styledLayout";

function ErrorPage() {
  const error: unknown = useRouteError();
  const statusText = (error as { statusText?: string })?.statusText;
  const errorMessage = (error as Error)?.message;
  const status = (error as { status?: number })?.status;
  const data = (error as { data?: string })?.data;

  const title = data || "Sorry, an unexpected error has occurred.";
  const message = status
    ? status + " " + statusText
    : statusText || errorMessage;

  return (
    <>
      <MainNavigation />
      <AbsoluteBoxPosition>
        <Typography variant="h3" gutterBottom>
          Error
        </Typography>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {message}
        </Typography>
        <Box m={2} display="flex" justifyContent="center" alignItems="center">
          <Button
            to="/articles"
            component={NavLink}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            GO HOME
          </Button>
        </Box>
      </AbsoluteBoxPosition>
    </>
  );
}

export default ErrorPage;
