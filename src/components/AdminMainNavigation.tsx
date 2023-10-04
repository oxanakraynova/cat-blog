import AppBar from "@mui/material/AppBar";
import { Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";
import logo from "../assets/4E0649A4-85D5-4B6D-9FCA-BCC3D598108B_4_5005_c.jpeg";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { List, ListItemButton, ListItemText } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#f9fafb",
    },
  },
});

const AdminMainNavigation = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="secondary" sx={{ overflowX: "auto" }}>
          <Toolbar>
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                ml: "224px",
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
            <List
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginLeft: "auto",
              }}
            >
              <ListItemButton
                component={NavLink}
                to="/admin/articles"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  "&.active": {
                    color: "text.primary",
                  },
                }}
              >
                <ListItemText>My Articles</ListItemText>
              </ListItemButton>
              {/* <ListItemButton
                component={NavLink}
                to="/admin/createArticle"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  "&.active": {
                    color: "text.primary",
                  },
                }}
              >
                <ListItemText>Create Article</ListItemText>
              </ListItemButton> */}
              <Button
                variant="text"
                component={NavLink}
                to="/admin/createArticle"
              >
                Create Article
              </Button>
            </List>
            {/* <Button
              variant="text"
              sx={{ marginLeft: "auto" }}
              endIcon={<ArrowForwardIcon />}
              component={NavLink}
              to="/login"
            >
              Log in */}
            {/* </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default AdminMainNavigation;
