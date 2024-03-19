import styled from "@emotion/styled";
import { Box, InputLabel } from "@mui/material";

export const CustomInputLabel = styled(InputLabel)({
  fontWeight: "bold",
  color: "inherit",
  marginBottom: "0.5rem",
  marginTop: "0.5rem",
});

export const CustomBox = styled(Box)({
  marginLeft: "14rem",
  width: "100%",
  height: "77rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

export const FlexColumnBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "column",
});
