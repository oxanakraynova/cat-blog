import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../UI/Loading";
import MainNavigation from "./MainNavigation";

function RootLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <MainNavigation />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Suspense>
  );
}

export default RootLayout;
