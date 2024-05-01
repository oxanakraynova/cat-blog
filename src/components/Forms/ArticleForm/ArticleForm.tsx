import { Button, Box, TextField, InputLabel, Input } from "@mui/material";
import { useFormik } from "formik";
import { Form, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArticleData,
  createArticle,
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
import {
  CustomBox,
  CustomInputLabel,
  FlexColumnBox,
  StyledStack,
} from "../../UI/styled/styledForm";
import { FormCardMedia } from "../../UI/styled/styledForm";

export interface ArticleFormProps {
  mode: "CREATE" | "EDIT";
}

interface InitialValuesForm {
  title: string;
  content: string;
}

function ArticleForm({ mode }: ArticleFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const generatePerex = (content: string) => {
    return content.slice(0, 200);
  };

  const article: ArticleData = useLoaderData() as ArticleData;

  const { articleId } = useParams<{ articleId: string }>();

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

  useEffect(() => {
    if (mode === "EDIT") {
      fetchImageData(article.imageId!);
    }
  }, [mode, articleId]);

  useEffect(() => {
    if (selectedImage) {
      setImageData(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
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
    <Form method="post" onSubmit={formik.handleSubmit}>
      <FormHeader mode={mode} />
      <CustomBox>
        <Box>
          <Box>
            <CustomInputLabel>Article Title</CustomInputLabel>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              placeholder={mode === "CREATE" ? "My First Article" : ""}
              name="title"
              autoFocus
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Box>
          <FlexColumnBox>
            {imageData && mode === "EDIT" ? (
              <>
                <CustomInputLabel>Featured Image</CustomInputLabel>
                <FormCardMedia src={imageData} alt="Article Image" />
                <StyledStack>
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
                    <Button variant="text" component="span">
                      Upload New
                    </Button>
                  </InputLabel>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDeleteImage(article!.imageId!)}
                  >
                    Delete
                  </Button>
                </StyledStack>
              </>
            ) : (
              <FileInput
                handleImageChange={handleImageChange}
                imageData={imageData}
                selectedImage={selectedImage}
              />
            )}
          </FlexColumnBox>
          <Box>
            <CustomInputLabel>Content</CustomInputLabel>
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
      </CustomBox>
    </Form>
  );
}

export default ArticleForm;
