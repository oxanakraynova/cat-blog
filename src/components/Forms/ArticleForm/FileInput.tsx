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
import { useState, useEffect } from "react";

const ColorButton = styled(Button)<ButtonProps>({
  color: "white",
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[800],
  },
});

const FileInput = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      setImageData(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

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
        <ColorButton variant="contained" color="info" component="span">
          Upload Image
        </ColorButton>
      </InputLabel>
      {imageData && (
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
