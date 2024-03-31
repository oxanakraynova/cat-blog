import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AboutPage from "./components/pages/AboutPage";
import ArticleDetailPage, {
  loader as articleDetailsLoader,
} from "./components/pages/ArticleDetailPage";
import ArticlesPage from "./components/pages/ArticlesPage";
import LoginPage from "./components/pages/LoginPage";
import AdminArticlesPage from "./components/pages/AdminArticlesPage";
import NewArticlePage from "./components/pages/NewArticlePage";
import EditArticlePage from "./components/pages/EditArticlePage";
import RegistrationForm from "./components/Forms/RegistrationForm";
import { lazy } from "react";
import ErrorPage from "./components/pages/ErrorPage";
import { AuthProvider, checkAuthLoader } from "./auth/AuthProvider";
import { loader as articlesLoader } from "./components/Articles/ArticleList";
import ArticlesError from "./components/Articles/ArticlesError";
import { ArticleProvider } from "./auth/ArticleProvider";

const RootLayout = lazy(() => import("./components/Layout/Root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<ArticlesPage />} loader={articlesLoader} />
      <Route path="about" element={<AboutPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationForm />} />
      <Route
        path="articles"
        element={<RootLayout />}
        errorElement={<ArticlesError />}
      >
        <Route index element={<ArticlesPage />} loader={articlesLoader} />
        <Route
          path=":articleId"
          element={<ArticleDetailPage />}
          loader={articleDetailsLoader}
        />
      </Route>
      <Route path="admin" element={<RootLayout />} loader={checkAuthLoader}>
        <Route index element={<AdminArticlesPage />} />
        <Route path="new" element={<NewArticlePage />} />
        <Route
          path=":articleId/edit"
          element={<EditArticlePage />}
          loader={articleDetailsLoader}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <ArticleProvider>
        <RouterProvider router={router} />
      </ArticleProvider>
    </AuthProvider>
  );
}

export default App;
