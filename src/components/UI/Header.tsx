import { Typography } from "@mui/material";

function Header({ title }: { title: string }) {
  return (
    <Typography variant="h4" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
  );
}

export default Header;
