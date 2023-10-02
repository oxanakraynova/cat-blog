import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./components/pages/About";
import ArticleDetailPage from "./components/pages/ArticleDetail";
import ErrorPage from "./components/pages/Error";
import HomePage from "./components/pages/Home";
import RootLayout from "./components/pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/article/:articleId",
        element: <ArticleDetailPage />,
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
