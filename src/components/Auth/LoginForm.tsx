import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FormHelperText } from "@mui/material";

export default function LoginForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail !== "";
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = enteredPassword !== "";
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;
  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (_event: React.FocusEvent) => {
    setEnteredEmailTouched(true);
  };

  const passwordInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);
  };

  const passwordInputBlurHandler = (_event: React.FocusEvent) => {
    setEnteredPasswordTouched(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (enteredEmailIsValid) {
      return;
    }

    setEnteredPasswordTouched(true);

    if (enteredPasswordIsValid) {
      return;
    }

    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            error={emailInputIsInvalid}
          />
          {emailInputIsInvalid && (
            <FormHelperText error>Email must not be empty!</FormHelperText>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
            error={passwordInputIsInvalid}
          />
          {passwordInputIsInvalid && (
            <FormHelperText error>Password must not be empty!</FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            to="/orders/"
            component={NavLink}
            disabled={!formIsValid}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
