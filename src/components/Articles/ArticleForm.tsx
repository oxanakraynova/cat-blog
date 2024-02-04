import {
  Stack,
  Button,
  Box,
  TextField,
  InputLabel,
  Input,
} from "@mui/material";
import { apiKey, ArticleData, bearerToken } from "../../services/apiService";
import Header from "../UI/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface ArticleFormProps {
  mode: string;
}

function ArticleForm({ mode }: ArticleFormProps) {
  const [image, setImage] = useState<File | null>(null);

  const generatePerex = (content: string) => {
    return content.slice(0, 200);
  };

  const pageTitle = mode === "create" ? "Create New Article" : "Edit Article";

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: yup.object({
      title: yup.string().trim().required("Title is required"),
      content: yup.string().trim().required("Content is required"),
    }),
    onSubmit: async (values: ArticleData) => {
      try {
        const perex = generatePerex(values.content!);

        let uploadedImageId = null;

        if (image) {
          const formData = new FormData();
          formData.append("image", image);

          const headers = {
            "Content-Type": "multipart/form-data",
            "X-API-KEY": apiKey,
            Authorization: bearerToken,
          };

          const response = await axios.post(
            "https://fullstack.exercise.applifting.cz/images",
            formData,
            { headers }
          );

          console.log("Image Upload Response:", response);

          if (response && response.data && response.data.imageId) {
            uploadedImageId = response.data.imageId;
            console.log("Uploaded Image ID:", uploadedImageId);
          } else {
            throw new Error(
              "Image upload response data is missing or invalid."
            );
          }
        }

        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          Authorization: bearerToken,
        };

        const articleFormData = new FormData();
        articleFormData.append("title", values.title);
        articleFormData.append("content", values.content!);
        articleFormData.append("imageId", uploadedImageId);
        articleFormData.append("perex", perex);

        const response = await axios.post(
          "https://fullstack.exercise.applifting.cz/articles",
          articleFormData,
          { headers }
        );

        console.log("Article created successful.", response.data);

        navigate("/articles");
      } catch (error) {
        const err: Error = error as Error;
        console.error("Error creating article:", err.message);
        console.error("Error details:", err);
        throw error;
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

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
              <Input
                id="imageId"
                type="file"
                inputProps={{
                  accept: "image/*",
                }}
                onChange={handleImageChange}
              />
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
