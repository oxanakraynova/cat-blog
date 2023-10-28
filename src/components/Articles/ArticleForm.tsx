import {
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  ButtonProps,
  InputLabel,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)<ButtonProps>(({}) => ({
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[700],
  },
}));

interface ArticleFormProps {
  mode: string;
}

function ArticleForm({ mode }: ArticleFormProps) {
  const pageTitle = mode === "create" ? "Create New Article" : "Edit Article";
  const uploadButton =
    mode === "create" ? (
      <ColorButton
        variant="contained"
        sx={{ width: "180px", marginBottom: "0.5rem" }}
      >
        Upload and image
      </ColorButton>
    ) : (
      <>
        <Box display="flex" alignItems="center">
          <Button variant="text" sx={{ marginRight: "0.3rem" }}>
            Upload new
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button variant="text" color="error">
            Delete
          </Button>
        </Box>
      </>
    );

  return (
    <>
      <Stack
        direction="row"
        spacing={5}
        alignItems="flex-start"
        sx={{ marginLeft: "14rem", width: "37.5rem", marginTop: "6.5rem" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            pb: 3,
            fontWeight: "bold",
          }}
        >
          {pageTitle}
        </Typography>
        <Button variant="contained">Publish Article</Button>
      </Stack>
      <Box
        component="form"
        sx={{
          marginTop: 1,
          marginLeft: "14rem",
          width: "47.5rem",
          height: "77rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Box>
          <InputLabel sx={{ fontWeight: "bold", color: "inherit" }}>
            Article Title
          </InputLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            placeholder="My First Article"
            name="title"
            autoFocus
            sx={{ marginBottom: "1.5rem" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "0.5rem",
            flexDirection: "column",
          }}
        >
          <InputLabel
            sx={{
              fontWeight: "bold",
              color: "inherit",
              marginBottom: "0.5rem",
            }}
          >
            Featured image
          </InputLabel>
          {uploadButton}
        </Box>
        <Box>
          <InputLabel
            sx={{
              fontWeight: "bold",
              color: "inherit",
              marginBottom: "0.5rem",
            }}
          >
            Content
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            placeholder="Supports markdown.Yay!"
            fullWidth
            multiline
            rows={30}
          />
        </Box>
      </Box>
    </>
  );
}

export default ArticleForm;
