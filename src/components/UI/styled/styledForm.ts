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

export const StyledBox = styled(Box)({
  position: "absolute",
  marginTop: "8%",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: "23rem",
  height: "auto",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
});

export const FlexStartContainer = styled(Box)({
  marginTop: 1,
  marginLeft: "2rem",
  width: "19rem",
  height: "5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

export const FlexEndContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginRight: "2rem",
  marginBottom: "1.5rem",
  marginTop: "25%",
});

export const CustomContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginRight: "2rem",
  marginBottom: "2rem",
  marginTop: "50%",
});
