import { List, ListItemButton, ListItemText, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import User from "../Articles/User";

const AdminNavigation = () => {
  return (
    <List
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginLeft: "auto",
      }}
    >
      <ListItemButton
        component={NavLink}
        to="/admin"
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
      <Button variant="text" component={NavLink} to="/admin/new">
        Create Article
      </Button>
      <User />
    </List>
  );
};

export default AdminNavigation;
