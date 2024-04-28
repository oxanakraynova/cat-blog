import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import User from "../Articles/User";
import { StyledListWithMarginLeftAuto } from "../UI/styled/styledAppbar";
import { CustomLink } from "./CustomLink";

const AdminNavigation = () => {
  return (
    <StyledListWithMarginLeftAuto>
      <CustomLink to="/admin">My Articles</CustomLink>
      <Button variant="text" component={NavLink} to="/admin/new">
        Create Article
      </Button>
      <User />
    </StyledListWithMarginLeftAuto>
  );
};

export default AdminNavigation;
