import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./components/pages/About";
import HomePage from "./components/pages/Home";
import RootLayout from "./components/pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
