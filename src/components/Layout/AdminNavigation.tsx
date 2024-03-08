import { List, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import User from "../Articles/User";
import { CustomLink } from "./CustomLink";

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
      <CustomLink to="/admin">My Articles</CustomLink>
      <Button variant="text" component={NavLink} to="/new">
        Create Article
      </Button>
      <User />
    </List>
  );
};

export default AdminNavigation;
