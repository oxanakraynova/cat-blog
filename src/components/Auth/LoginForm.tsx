import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export default function LoginForm() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            position: "absolute",
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
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "2rem",
              marginTop: "6rem",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              //TODO 1) implement login, 2) after successful login redirect to next screen, 3) on unsuccesful login display error message
              component={NavLink}
              to="/admin"
            >
              Log In
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
