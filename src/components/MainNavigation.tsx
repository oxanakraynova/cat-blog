import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import logo from "../assets/4E0649A4-85D5-4B6D-9FCA-BCC3D598108B_4_5005_c.jpeg";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { List, ListItemButton, ListItemText } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#f9fafb",
    },
  },
});

const MainNavigation = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 50,
                }}
                alt="cat blog logo."
                src={logo}
              />

              <Link to="/">
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText>Recent Articles</ListItemText>
                </ListItemButton>
              </Link>
              <Link to="/about">
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText>About</ListItemText>
                </ListItemButton>
              </Link>
            </List>
            <Button
              variant="text"
              sx={{ marginLeft: "auto" }}
              endIcon={<ArrowForwardIcon />}
            >
              Log in
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default MainNavigation;
