import {
  Button,
  Box,
  InputLabel,
  Input,
  CardMedia,
  styled,
  ButtonProps,
} from "@mui/material";
import { grey } from "@mui/material/colors";

interface InputProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imageData: string | null;
  selectedImage: File | null;
}

const ColorButton = styled(Button)<ButtonProps>({
  color: "white",
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[800],
  },
});

const FileInput = ({
  handleImageChange,
  imageData,
  selectedImage,
}: InputProps) => {
  return (
    <>
      <InputLabel
        sx={{
          fontWeight: "bold",
          color: "inherit",
          marginBottom: "0.5rem",
        }}
      >
        Featured image
      </InputLabel>
      <Input
        id="select-image"
        type="file"
        inputProps={{
          accept: "image/*",
        }}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <InputLabel htmlFor="select-image">
        <ColorButton variant="contained" component="span">
          Upload Image
        </ColorButton>
      </InputLabel>
      {imageData && selectedImage && (
        <Box mt={2} textAlign="left">
          <CardMedia
            component="img"
            src={imageData}
            alt={selectedImage?.name}
            sx={{
              maxWidth: "12rem",
              height: "100%",
              objectFit: "cover",
              maxHeight: "6rem",
            }}
          />
        </Box>
      )}
    </>
  );
};

export default FileInput;
