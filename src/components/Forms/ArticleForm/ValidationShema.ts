import * as yup from "yup";

export const creationSchema = yup.object({
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
});

export const editionSchema = yup.object().shape({});
