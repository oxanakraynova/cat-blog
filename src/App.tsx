import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./components/pages/About";
import ArticleDetailPage from "./components/pages/ArticleDetail";
import ErrorPage from "./components/pages/Error";
import ArticlesPage from "./components/pages/Articles";
import RootLayout from "./components/pages/Root";
import LoginPage from "./components/pages/Login";
import AdminArticlesPage from "./components/pages/AdminArticles";
import AdminRootLayout from "./components/pages/AdminRoot";
import NewArticlePage from "./components/pages/NewArticle";
import EditArticlePage from "./components/pages/EditArticle";
import CreateTenant from "./components/CreateTenant";

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
        path: "/test",
        element: <CreateTenant />,
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
    element: <AdminRootLayout />,
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
