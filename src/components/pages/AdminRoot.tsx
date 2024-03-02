import { Outlet } from "react-router-dom";
import AdminNavigation from "../Layout/AdminNavigation";

function AdminRootLayout() {
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
}

export default AdminRootLayout;
