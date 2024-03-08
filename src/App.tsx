import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./components/pages/About";
import ArticleDetailPage from "./components/pages/ArticleDetail";
import ArticlesPage from "./components/pages/Articles";
import LoginPage from "./components/pages/Login";
import AdminArticlesPage from "./components/pages/AdminArticles";
import NewArticlePage from "./components/pages/NewArticle";
import EditArticlePage from "./components/pages/EditArticle";
import RegistrationForm from "./components/RegistrationForm";
import { lazy } from "react";
import NotFound from "./components/pages/NotFound";

const RootLayout = lazy(() => import("./components/Layout/Root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationForm />,
      },
      {
        index: true,
        element: <ArticlesPage />,
      },
      {
        path: "/articles",
        element: <ArticlesPage />,
      },
      {
        path: "/articles/:articleId",
        element: <ArticleDetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AdminArticlesPage />,
      },
      {
        path: "/admin/new",
        element: <NewArticlePage />,
      },
      {
        path: "/admin/:articleId/edit",
        element: <EditArticlePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
