import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AdminNavigation from "./AdminNavigation";
import { CustomLink } from "./CustomLink";
import { useAuth } from "../../auth/AuthProvider";
import { StyledLogo } from "../UI/styled/styledImages";
import { StyledAppBar, StyledBox, StyledList } from "../UI/styled/styledAppbar";

const MainNavigation = () => {
  const { isAuthenticated } = useAuth();
  return (
    <StyledBox>
      <StyledAppBar color="secondary">
        <Toolbar>
          <StyledList>
            <StyledLogo alt="cat logo." src={logo} />
            <CustomLink to="/articles">Recent Articles</CustomLink>
            <CustomLink to="/about">About</CustomLink>
          </StyledList>
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
      </StyledAppBar>
      <Toolbar />
    </StyledBox>
  );
};

export default MainNavigation;
