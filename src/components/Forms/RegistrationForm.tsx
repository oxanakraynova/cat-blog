import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Button, Container, CssBaseline, TextField } from "@mui/material";
import * as yup from "yup";
import { useNavigate, useNavigation } from "react-router-dom";
import {
  CustomContainer,
  FlexStartContainer,
  StyledBox,
} from "../UI/styled/styledForm";
import HeaderForm from "../UI/HeaderForm";
import CustomAlert from "../UI/CustomAlert";

const RegistrationForm: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Too Short!")
        .max(70, "Too Long!")
        .required("Name is required"),
      email: yup.string().required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://fullstack.exercise.applifting.cz/tenants",
          {
            name: values.name,
            email: values.email,
            password: values.password,
          }
        );
        setApiKey(response.data.apiKey);
        console.log("Your API Key:", response.data.apiKey);
        console.log("Your response data:", response.data);
        navigate("/articles");
      } catch (error) {
        console.error("Error creating tenant:", error);
        setLoginError(
          "An error occurred while registration. Please try again later."
        );
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={formik.handleSubmit}>
        <StyledBox>
          <HeaderForm title="Registration Form" />
          <FlexStartContainer>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </FlexStartContainer>
          <CustomContainer>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CustomContainer>
          {apiKey && <div>Your API Key: {apiKey}</div>}
        </StyledBox>
      </form>
      {loginError && open && (
        <CustomAlert
          severity="error"
          title={loginError}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};
export default RegistrationForm;
