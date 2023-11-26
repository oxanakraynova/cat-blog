import { Box } from "@mui/material";
import LoginForm from "../Auth/LoginForm";

function LoginPage() {
  return (
    <>
      <Box sx={{ maxWidth: "31rem" }}>
        <LoginForm />
      </Box>
    </>
  );
}

export default LoginPage;
