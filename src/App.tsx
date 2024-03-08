import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AboutPage from "./components/pages/About";
import ArticleDetailPage, {
  articleDetailsLoader,
} from "./components/pages/ArticleDetail";
import ArticlesPage from "./components/pages/Articles";
import LoginPage from "./components/pages/Login";
import AdminArticlesPage from "./components/pages/AdminArticles";
import NewArticlePage from "./components/pages/NewArticle";
import EditArticlePage from "./components/pages/EditArticle";
import RegistrationForm from "./components/RegistrationForm";
import { lazy } from "react";
import NotFound from "./components/pages/NotFound";
import { AuthProvider } from "./auth/AuthProvider";
import { articlesLoader } from "./components/Articles/ArticleList";
import ArticlesError from "./components/Articles/ArticlesError";

const RootLayout = lazy(() => import("./components/Layout/Root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<ArticlesPage />} />
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
      <Route path="admin" element={<RootLayout />}>
        <Route index element={<AdminArticlesPage />} loader={articlesLoader} />
        <Route path="new" element={<NewArticlePage />} />
        <Route path=":articleId/edit" element={<EditArticlePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
