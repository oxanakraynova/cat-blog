import { NavLink, useMatch } from "react-router-dom";
import { ListItemButton, useTheme } from "@mui/material";

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, to, ...props }) => {
  const theme = useTheme();
  const match = useMatch(to);

  return (
    <ListItemButton
      component={NavLink}
      to={to}
      style={{
        color: match
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
        textAlign: "center",
      }}
      {...props}
    >
      {children}
    </ListItemButton>
  );
};

export { CustomLink };
