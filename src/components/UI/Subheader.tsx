import { Typography } from "@mui/material";

function Subheader({ title }: { title: string }) {
  return (
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
  );
}

export default Subheader;
