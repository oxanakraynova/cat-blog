import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
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
        <AppBar position="fixed" color="secondary" sx={{ overflowX: "auto" }}>
          <Toolbar>
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                ml: "14rem",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 50,
                }}
                alt="cat logo."
                src={logo}
              />

              <ListItemButton
                component={NavLink}
                to="/articles"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  "&.active": {
                    color: "text.primary",
                  },
                }}
              >
                <ListItemText>Recent Articles</ListItemText>
              </ListItemButton>
              <ListItemButton
                component={NavLink}
                to="/about"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  "&.active": {
                    color: "text.primary",
                  },
                }}
              >
                <ListItemText>About</ListItemText>
              </ListItemButton>
            </List>
            <Button
              variant="text"
              sx={{ marginLeft: "auto" }}
              endIcon={<ArrowForwardIcon />}
              component={NavLink}
              to="/login"
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
