import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import photo from "../../assets/1.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

function User() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { logout } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/articles");
  };

  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && (
        <>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt="Current user" src={photo} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </>
  );
}

export default User;
