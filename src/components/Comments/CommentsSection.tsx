import { Avatar, Card, CardHeader, TextField, Typography } from "@mui/material";
import { useState } from "react";
import photo from "../../assets/1.jpg";
import { ArticleData } from "../../services/articleService";
import { useFormik } from "formik";
import CommentCard from "./CommentCard";
import { Form } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import {
  createComment,
  InitialValuesForm,
} from "../../services/commentService";

function CommentsSection({ article }: { article: ArticleData }) {
  const [comment, setComment] = useState<InitialValuesForm[]>([]);

  const { tenant } = useAuth();

  const formik = useFormik({
    initialValues: {
      articleId: "",
      author: "",
      content: "",
    },
    onSubmit: async (values: InitialValuesForm, { resetForm }) => {
      try {
        const commentData = {
          articleId: article?.articleId,
          author: tenant?.name,
          content: values.content,
        };

        const response = await createComment(commentData);
        if (response && response.commentId) {
          console.log("Comment created successfully.", response);
          setComment((prevComments) => [...prevComments, response]);
          resetForm();
        } else {
          console.error("Failed to create comment: invalid response data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Form method="post" onSubmit={formik.handleSubmit}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50rem",
          height: "auto",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="h5"
          color="text.primary"
          component="div"
          sx={{ fontWeight: "bold", marginTop: "0.5rem", marginLeft: "1rem" }}
        >
          Comments ({comment.length})
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
      {comment.length > 0 &&
        comment.map((comment) => (
          <CommentCard key={comment.commentId} comment={comment} />
        ))}
    </Form>
  );
}
export default CommentsSection;
