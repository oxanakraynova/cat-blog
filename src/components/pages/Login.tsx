import { Box } from "@mui/material";
import LoginForm from "../Auth/LoginForm";

function LoginPage() {
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <LoginForm />
      </Box>
    </>
  );
}

export default LoginPage;
