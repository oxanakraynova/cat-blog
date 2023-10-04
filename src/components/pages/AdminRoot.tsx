import { Outlet } from "react-router-dom";
import AdminMainNavigation from "../AdminMainNavigation";

function AdminRootLayout() {
  return (
    <>
      <AdminMainNavigation />
      <Outlet />
    </>
  );
}

export default AdminRootLayout;
