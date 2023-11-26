import { Typography } from "@mui/material";

function Header({ title }: { title: string }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        pb: 3,
        fontWeight: "bold",
        marginLeft: "14rem",
        marginTop: "8%",
      }}
    >
      {title}
    </Typography>
  );
}

export default Header;
