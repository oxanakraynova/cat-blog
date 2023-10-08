import {
  Stack,
  Typography,
  Button,
  Box,
  TextField,
  ButtonProps,
  InputLabel,
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
  return (
    <>
      <Stack
        direction="row"
        spacing={5}
        alignItems="flex-start"
        sx={{ marginLeft: "224px", width: "600px", marginTop: "104px" }}
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
          marginLeft: "224px",
          width: "760px",
          height: "1238px",
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
            sx={{ marginBottom: "24px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
            flexDirection: "column",
          }}
        >
          <InputLabel
            sx={{ fontWeight: "bold", color: "inherit", marginBottom: "10px" }}
          >
            Featured image
          </InputLabel>
          <ColorButton
            variant="contained"
            sx={{ width: "170px", marginBottom: "24px" }}
          >
            Upload an image
          </ColorButton>
        </Box>
        <Box>
          <InputLabel
            sx={{ fontWeight: "bold", color: "inherit", marginBottom: "10px" }}
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
