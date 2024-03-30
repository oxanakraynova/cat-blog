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
  marginLeft: "5%",
  marginBottom: "3%",
});
