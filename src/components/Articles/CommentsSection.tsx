import { Avatar, Card, CardHeader, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import photo from "../../assets/3.jpg";
import {
  apiKey,
  ArticleData,
  baseUrl,
  bearerToken,
  getArticleById,
  getTenantById,
  Tenant,
} from "../../services/apiService";
import axios from "axios";
import { useFormik } from "formik";
import CommentCard from "./CommentCard";
import { useParams } from "react-router-dom";
import Loading from "../UI/Loading";

export type CommentsProps = {
  articleId: string;
  commentId?: string;
  author: string;
  content: string;
  postedAt?: string;
  score?: number;
};

function CommentsSection() {
  const [comments, setComments] = useState<CommentsProps[]>([]);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  // useEffect(() => {
  //   const fetchAuthor = async () => {
  //     try {
  //       setLoading(true);

  //       const tenantId = "1709406898639";

  //       const headers = {
  //         "Content-Type": "application/json",
  //         "X-API-KEY": apiKey,
  //         Authorization: bearerToken,
  //       };

  //       const response = await axios.get(`${baseUrl}/tenants/${tenantId}`, {
  //         headers,
  //       });
  //       setTenant(response.data);
  //     } catch (error) {
  //       console.error("Error fetching tenant:", error);
  //       throw error;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAuthor();
  // }, []);

  const formik = useFormik({
    initialValues: {
      articleId: "",
      author: "",
      content: "",
    },
    onSubmit: async (values: CommentsProps) => {
      try {
        const commentsData = {
          articleId: article?.articleId,
          content: values.content,
          author: "1709406898639",
        };

        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
          Authorization: bearerToken,
        };

        const response = await axios.post(
          "https://fullstack.exercise.applifting.cz/comments",
          commentsData,
          { headers }
        );

        console.log("Comment Upload Response:", response);

        setComments((prevComments) => [...prevComments, response.data]);
      } catch (error) {
        console.error("Error:", error);
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
          width: "47.5rem",
          height: "auto",
          marginTop: "0.5rem",
          marginLeft: "30%",
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
              alt="Elisabeth Strain"
              src={photo}
            >
              ES
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
        <p>No comments available.</p>
      )}
    </form>
  );
}
export default CommentsSection;
