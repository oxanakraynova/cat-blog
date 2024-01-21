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
import { NewArticle, postArticle } from "../../services/apiService";
import Header from "../UI/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        <VisuallyHiddenInput type="file" id="imageId" />
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

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      // imageId: null,
      title: "",
      content: "",
      publicationDate: "",
      author: "",
    },
    validationSchema: yup.object({
      title: yup.string().trim().required("Title is required"),
      content: yup.string().trim().required("Content is required"),
      // imageId: yup.string().required("Image is required"),
    }),
    onSubmit: async (values: NewArticle) => {
      const bearerToken = "Bearer 17ffeeee-82c9-4aed-a6ca-e4155c28ae6d";
      const apiKey = "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22";
      try {
        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          Authorization: bearerToken,
        };
        const response = await axios.post(
          "https://fullstack.exercise.applifting.cz/articles",
          {
            title: values.title,
            content: values.content,
            // imageId: values.imageId,
          },
          { headers }
        );

        console.log("Article created successful.", response.data);

        navigate("/articles");
      } catch (error) {
        console.error("Error creating article:", error);
        throw error;
      }
    },
  });

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
                id="content"
                placeholder="Supports markdown.Yay!"
                fullWidth
                multiline
                rows={30}
                margin="normal"
                required
                autoFocus
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default ArticleForm;
