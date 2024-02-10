import { Typography } from "@mui/material";

function Header({ title }: { title: string }) {
  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        paddingBottom: 3,
        fontWeight: "bold",
        marginLeft: "5%",
        marginTop: "10%",
      }}
    >
      {title}
    </Typography>
  );
}

export default Header;
