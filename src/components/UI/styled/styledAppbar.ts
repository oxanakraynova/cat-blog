import styled from "@emotion/styled";
import { AppBar, Box, List } from "@mui/material";

export const StyledList = styled(List)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginLeft: "4%",
});

export const StyledListWithMarginLeftAuto = styled(List)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginLeft: "auto",
});

export const StyledAppBar = styled(AppBar)({
  position: "fixed",
  overflowX: "auto",
});

export const StyledBox = styled(Box)({
  flexGrow: 1,
});
