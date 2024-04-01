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
  height: "13rem",
  marginBottom: "3%",
  marginTop: "1%",
});
