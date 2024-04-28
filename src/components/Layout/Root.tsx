import { createTheme, ThemeProvider } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../UI/Loading";
import MainNavigation from "./MainNavigation";

function Root() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#f9fafb",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <MainNavigation />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </Suspense>
    </ThemeProvider>
  );
}

export default Root;
