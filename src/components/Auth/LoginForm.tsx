import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login } = useAuth();

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
        await login(values.username, values.password, values.apiKey);
        navigate("/admin");
      } catch (error) {
        console.error("Error logging in:", error);
        // setStatus("Incorrect password/username. Please try again.");
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
            height: "auto",
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
            Log In
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "2rem",
              marginTop: "25%",
            }}
          >
            {/* {status && <div style={{ color: "red" }}>{status}</div>} */}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "2rem",
              marginBottom: "2rem",
            }}
          >
            <Button color="primary" type="submit" variant="contained">
              Log In
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
