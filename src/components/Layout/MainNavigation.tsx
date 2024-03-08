import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import logo from "../../assets/4E0649A4-85D5-4B6D-9FCA-BCC3D598108B_4_5005_c.jpeg";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { List } from "@mui/material";
import AdminNavigation from "./AdminNavigation";
import { CustomLink } from "./CustomLink";
import { useAuth } from "../../auth/AuthProvider";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#f9fafb",
    },
  },
});

const MainNavigation = () => {
  const { isAuthenticated } = useAuth();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary" sx={{ overflowX: "auto" }}>
          <Toolbar>
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                ml: "5%",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: "3rem",
                }}
                alt="cat logo."
                src={logo}
              />
              <CustomLink to="/articles">Recent Articles</CustomLink>
              <CustomLink to="/about">About</CustomLink>
            </List>
            {isAuthenticated ? (
              <AdminNavigation />
            ) : (
              <Button
                variant="text"
                sx={{ marginLeft: "auto" }}
                endIcon={<ArrowForwardIcon />}
                component={NavLink}
                to="/login"
              >
                Log in
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default MainNavigation;
