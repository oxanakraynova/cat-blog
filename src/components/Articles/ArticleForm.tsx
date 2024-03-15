import {
  Stack,
  Button,
  Box,
  TextField,
  InputLabel,
  Input,
  CardMedia,
} from "@mui/material";
import { apiKey, bearerToken } from "../../services/apiService";
import Header from "../UI/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArticleData, getArticleById } from "../../services/articleService";
import { deleteImage } from "../../services/imageService";

interface ArticleFormProps {
  mode: "create" | "edit";
}

interface InitialValuesForm {
  title: string;
  content: string;
}

function ArticleForm({ mode }: ArticleFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const generatePerex = (content: string) => {
    return content.slice(0, 200);
  };

  const pageTitle = mode === "create" ? "Create New Article" : "Edit Article";

  const { articleId } = useParams<{ articleId: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!articleId) {
          console.error("Article ID is undefined");
          return;
        }
        const response = await getArticleById(articleId);
        setArticle(response);
        if (response.imageId) {
          fetchImageData(response.imageId);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (mode === "edit") {
      fetchArticle();
    }
  }, [articleId, mode]);

  const fetchImageData = async (imageId: string) => {
    try {
      const response = await axios.get(
        `https://fullstack.exercise.applifting.cz/images/${imageId}`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": apiKey,
            Authorization: bearerToken,
          },
        }
      );
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      setImageData(imageUrl);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: article?.title || "",
      content: article?.content || "",
    },
    enableReinitialize: true,
    validationSchema:
      mode === "create"
        ? yup.object({
            title: yup
              .string()
              .min(2, "Too Short!")
              .max(100, "Too Long!")
              .trim()
              .required("Title is required"),
            content: yup
              .string()
              .min(2, "Too Short!")
              .max(10000, "Too Long!")
              .trim()
              .required("Content is required"),
          })
        : yup.object().shape({}),
    onSubmit: async (values: InitialValuesForm) => {
      try {
        const perex = generatePerex(values.content!);

        let uploadedImageId: string | null = null;

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

          const findImageId = (data: any): string | undefined => {
            if (data && typeof data === "object") {
              if (data.imageId) {
                return data.imageId;
              }
              for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                  const value = data[key];
                  if (value && typeof value === "object") {
                    const imageId = findImageId(value);
                    if (imageId) {
                      return imageId;
                    }
                  }
                }
              }
            }
            return undefined;
          };

          const imageId = findImageId(response.data);

          if (imageId) {
            uploadedImageId = imageId;
          } else {
            console.error(
              "ImageId not found in response data or has invalid format"
            );
          }
        }

        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          Authorization: bearerToken,
        };

        const articleData = {
          title: values.title,
          content: values.content,
          imageId: uploadedImageId,
          perex: perex,
        };

        if (mode === "create") {
          await axios.post(
            "https://fullstack.exercise.applifting.cz/articles",
            articleData,
            { headers }
          );
          console.log("Article created successfully.");
        } else {
          await axios.patch(
            `https://fullstack.exercise.applifting.cz/articles/${articleId}`,
            articleData,
            { headers }
          );
          console.log("Article updated successfully.");
        }

        navigate("/articles");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleUploadImage = async () => {
    //TODO
  };

  const handleDeleteImage = async (id: string) => {
    try {
      if (mode === "edit" && article?.imageId) {
        await deleteImage(id);
        setImageData(null);
        console.log("Image deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
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
                placeholder={mode === "create" ? "My First Article" : ""}
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
              {imageData ? (
                <>
                  <CardMedia
                    component="img"
                    src={imageData}
                    alt="Article Image"
                    sx={{
                      maxWidth: "10rem",
                      height: "100%",
                      objectFit: "cover",
                      maxHeight: "5rem",
                      paddingBottom: 2,
                    }}
                  />
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-start"
                  >
                    <Button variant="text" onClick={handleUploadImage}>
                      Upload New
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteImage(article!.imageId!)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </>
              ) : (
                <Input
                  id="imageId"
                  type="file"
                  inputProps={{
                    accept: "image/*",
                  }}
                  onChange={handleImageChange}
                />
              )}
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
                placeholder={mode === "create" ? "Supports markdown.Yay!" : ""}
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
