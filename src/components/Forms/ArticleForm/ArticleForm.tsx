import {
  Stack,
  Button,
  Box,
  TextField,
  InputLabel,
  CardMedia,
} from "@mui/material";
import { useFormik } from "formik";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArticleData,
  createArticle,
  getArticleById,
  updateArticle,
} from "../../../services/articleService";
import {
  deleteImage,
  getImageById,
  postImage,
} from "../../../services/imageService";
import FormHeader from "./FormHeader";
import { creationSchema, editionSchema } from "./ValidationShema";
import FileInput from "./FileInput";

export interface ArticleFormProps {
  mode: "CREATE" | "EDIT";
}

interface InitialValuesForm {
  title: string;
  content: string;
}

function ArticleForm({ mode }: ArticleFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const generatePerex = (content: string) => {
    return content.slice(0, 200);
  };

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

    if (mode === "EDIT") {
      fetchArticle();
    }
  }, [articleId, mode]);

  const fetchImageData = async (imageId: string) => {
    try {
      const response = await getImageById(imageId);
      const blob = new Blob([response], { type: "image/jpeg" });
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
    validationSchema: mode === "CREATE" ? creationSchema : editionSchema,
    onSubmit: async (values: InitialValuesForm) => {
      try {
        const perex = generatePerex(values.content!);

        let uploadedImageId: string | null = null;

        if (selectedImage) {
          const formData = new FormData();
          formData.append("image", selectedImage);

          const response = await postImage(formData);

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

          const imageId = findImageId(response);

          if (imageId) {
            uploadedImageId = imageId;
          } else {
            console.error(
              "ImageId not found in response data or has invalid format"
            );
          }
        }

        const articleData = {
          title: values.title,
          content: values.content,
          imageId: uploadedImageId,
          perex: perex,
        };

        if (mode === "CREATE") {
          await createArticle(articleData);
          console.log("Article created successfully.");
        } else {
          await updateArticle(articleId, articleData);
          console.log("Article updated successfully.");
        }

        navigate("/articles");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const handleUploadImage = async () => {
    //TODO
  };

  const handleDeleteImage = async (id: string) => {
    try {
      if (mode === "EDIT" && article?.imageId) {
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
      <Form method="post" onSubmit={formik.handleSubmit}>
        <FormHeader mode={mode} />
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
                placeholder={mode === "CREATE" ? "My First Article" : ""}
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
              {imageData ? (
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
                  <CardMedia
                    component="img"
                    src={imageData}
                    alt="Article Image"
                    sx={{
                      maxWidth: "12rem",
                      height: "100%",
                      objectFit: "cover",
                      maxHeight: "6rem",
                    }}
                  />
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-start"
                    sx={{
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
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
                <FileInput />
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
                placeholder={mode === "CREATE" ? "Supports markdown.Yay!" : ""}
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
      </Form>
    </>
  );
}

export default ArticleForm;
