import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";

export const FlexColumnBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flexGrow: 1,
});

export const FlexRowCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  maxWidth: "60%",
  height: "14rem",
  marginBottom: "1%",
  marginTop: "1%",
});

export const AbsoluteBoxPosition = styled(Box)({
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
});
