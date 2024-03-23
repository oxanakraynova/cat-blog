import { CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import {
  FlexEndContainer,
  FlexStartContainer,
  StyledBox,
} from "../UI/styled/styledForm";
import HeaderForm from "../UI/HeaderForm";
import CustomAlert from "../UI/CustomAlert";

export default function LoginForm() {
  const [loginError, setLoginError] = useState<string>("");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const { login } = useAuth();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      apiKey: "c98db5eb-b5f8-4ebc-8e8d-8281f7e6ec22",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      apiKey: yup.string().required("API Key is required"),
    }),
    onSubmit: async (values) => {
      try {
        const isAuthenticated = await login(
          values.username,
          values.password,
          values.apiKey
        );
        if (isAuthenticated) {
          navigate("/admin");
        } else {
          setLoginError("Incorrect username or password. Please try again.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setLoginError(
          "An error occurred while logging in. Please try again later."
        );
      }
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={formik.handleSubmit}>
        <StyledBox>
          <HeaderForm title="Log In" />
          <FlexStartContainer>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
          <FlexEndContainer>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Log In"}
            </Button>
          </FlexEndContainer>
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
}
