import { Container } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../UI/Loading";
import MainNavigation from "./MainNavigation";

function Root() {
  return (
    <Suspense fallback={<Loading />}>
      <MainNavigation />
      <Suspense fallback={<Loading />}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Suspense>
    </Suspense>
  );
}

export default Root;
