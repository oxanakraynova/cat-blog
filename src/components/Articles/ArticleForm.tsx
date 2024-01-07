import {
  Stack,
  Button,
  Box,
  TextField,
  ButtonProps,
  InputLabel,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { NewArticle, postArticles } from "../../services/apiService";
import Header from "../UI/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)<ButtonProps>(({}) => ({
  backgroundColor: grey[600],
  "&:hover": {
    backgroundColor: grey[700],
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface ArticleFormProps {
  mode: string;
}

function ArticleForm({ mode }: ArticleFormProps) {
  const pageTitle = mode === "create" ? "Create New Article" : "Edit Article";
  const uploadButton =
    mode === "create" ? (
      <ColorButton
        component="label"
        variant="contained"
        sx={{ width: "11.5rem", marginBottom: "0.5rem" }}
      >
        Upload an image
        <VisuallyHiddenInput type="file" />
      </ColorButton>
    ) : (
      <>
        <Box display="flex">
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

  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      perex: "",
      publicationDate: "",
      author: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Title is required"),
      perex: yup.string().required("Perex is required"),
      // image: yup.string().required("Image is required"),
    }),
    onSubmit: async (values: NewArticle) => {
      try {
        await postArticles(values);
        navigate("/articles");
      } catch (error) {
        console.error("Error creating article:", error);
        throw error;
      }
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction="row"
          spacing={5}
          alignItems="flex-start"
          sx={{ marginLeft: "14rem", width: "37.5rem", marginTop: "6.5rem" }}
        >
          <Header title={pageTitle} />
          <Button variant="contained" type="submit">
            Publish Article
          </Button>
        </Stack>
        <Box
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
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
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
              margin="normal"
              required
              autoFocus
              value={formik.values.perex}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.perex && Boolean(formik.errors.perex)}
              helperText={formik.touched.perex && formik.errors.perex}
            />
          </Box>
        </Box>
      </form>
    </>
  );
}

export default ArticleForm;
