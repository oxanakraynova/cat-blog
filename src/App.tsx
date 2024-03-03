import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./components/pages/About";
import ArticleDetailPage from "./components/pages/ArticleDetail";
import ErrorPage from "./components/pages/Error";
import ArticlesPage from "./components/pages/Articles";
import RootLayout from "./components/Layout/Root";
import LoginPage from "./components/pages/Login";
import AdminArticlesPage from "./components/pages/AdminArticles";
import NewArticlePage from "./components/pages/NewArticle";
import EditArticlePage from "./components/pages/EditArticle";
import RegistrationForm from "./components/RegistrationForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
    path: "/error",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
