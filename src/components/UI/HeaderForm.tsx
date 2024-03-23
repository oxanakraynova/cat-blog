import { Typography } from "@mui/material";

function HeaderForm({ title }: { title: string }) {
  return (
    <Typography
      variant="h5"
      gutterBottom
      fontWeight="bold"
      sx={{
        marginTop: "2rem",
        marginLeft: "2rem",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {title}
    </Typography>
  );
}

export default HeaderForm;
