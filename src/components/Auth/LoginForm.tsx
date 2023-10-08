import * as React from "react";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { FormHelperText } from "@mui/material";
import { NavLink } from "react-router-dom";

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

  // let formIsValid = false;
  // if (enteredEmailIsValid && enteredPasswordIsValid) {
  //   formIsValid = true;
  // }

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
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "368px",
          height: "333px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            marginTop: "32px",
            marginLeft: "32px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: 1,
            marginLeft: "32px",
            width: "304px",
            height: "84px",
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "31px",
            marginTop: "100px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            //TODO 1) implement login, 2) after successful login redirect to next screen, 3) on unsuccesful login display error message
            component={NavLink}
            to="/admin"
            // disabled={!formIsValid}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
