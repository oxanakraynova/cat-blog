import { Avatar, Card, CardHeader, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import photo from "../../assets/1.jpg";
import {
  apiKey,
  ArticleData,
  bearerToken,
  getArticleById,
} from "../../services/apiService";
import axios from "axios";
import { useFormik } from "formik";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import { useAuth } from "../../auth/AuthProvider";

export type CommentsProps = {
  articleId: string;
  commentId: string;
  author: string;
  content: string;
  postedAt: string;
  score: number;
};

export interface InitialValuesForm {
  articleId: string | undefined;
  author: string | undefined;
  content: string;
}

function CommentsSection() {
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { tenant } = useAuth();

  const params = useParams<{ articleId?: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);

        const articleId = params.articleId;
        if (!articleId) {
          console.error("Article ID is undefined");
          return;
        }
        const response = await getArticleById(articleId);
        setArticle(response);
      } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [params.articleId]);

  const formik = useFormik({
    initialValues: {
      articleId: "",
      author: "",
      content: "",
    },
    onSubmit: async (values: InitialValuesForm, { resetForm }) => {
      try {
        setLoading(true);
        const commentData = {
          articleId: article?.articleId,
          content: values.content,
          author: tenant?.name,
        };

        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          Authorization: bearerToken,
        };

        const response = await axios.post(
          "https://fullstack.exercise.applifting.cz/comments",
          commentData,
          { headers }
        );

        console.log("Comment Upload Response:", response);

        setComments((prevComments) => [...prevComments, response.data]);
        resetForm();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50rem",
          height: "auto",
          marginTop: "1rem",
          marginLeft: "15%",
        }}
      >
        <Typography
          variant="h5"
          color="text.primary"
          component="div"
          sx={{ fontWeight: "bold", marginTop: "0.5rem", marginLeft: "1rem" }}
        >
          Comments ({comments.length})
        </Typography>
        <CardHeader
          avatar={
            <Avatar
              aria-label="join the discussion"
              alt={tenant?.name}
              src={photo}
            >
              {tenant?.name}
            </Avatar>
          }
          title={
            <TextField
              id="content"
              placeholder="Join the discussion"
              fullWidth
              margin="normal"
              required
              autoFocus
              variant="outlined"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
          }
        />
      </Card>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.commentId} comment={comment} />
        ))
      ) : (
        <Typography
          variant="subtitle1"
          color="text.primary"
          component="div"
          sx={{ marginTop: "1rem", marginLeft: "15%" }}
        >
          0
        </Typography>
      )}
    </form>
  );
}
export default CommentsSection;
