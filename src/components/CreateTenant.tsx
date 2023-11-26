import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";

const CreateTenant: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Name is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://fullstack.exercise.applifting.cz/tenants",
          {
            name: values.name,
            password: values.password,
          }
        );
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.error("Error creating tenant:", error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            position: "absolute",
            marginTop: "8%",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "23rem",
            height: "20.5rem",
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              marginTop: "2rem",
              marginLeft: "2rem",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            Create new tenant
          </Typography>
          <Box
            sx={{
              marginTop: 1,
              marginLeft: "2rem",
              width: "19rem",
              height: "5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "2rem",
              marginTop: "6rem",
            }}
          >
            <Button type="submit" variant="contained">
              Create Tenant
            </Button>
          </Box>
          {apiKey && <div>Your API Key: {apiKey}</div>}
        </Box>
      </form>
    </Container>
  );
};
export default CreateTenant;
