import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import { CommentsProps, InitialValuesForm } from "./CommentsSection";

function CommentCard({ comment }: { comment: InitialValuesForm }) {
  // const handleUpvote = (commentId: number) => {
  //   const updatedComments = comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       return { ...comment, rating: comment.rating + 1 };
  //     }
  //     return comment;
  //   });
  //   setComments(updatedComments);
  // };

  // const handleDownvote = (commentId: number) => {
  //   const updatedComments = comments.map((comment) => {
  //     if (comment.id === commentId) {
  //       return { ...comment, rating: comment.rating - 1 };
  //     }
  //     return comment;
  //   });
  //   setComments(updatedComments);
  // };
  return (
    <>
      <Card key={comment.commentId} sx={{ marginTop: "1rem" }}>
        <CardHeader
          avatar={<Avatar aria-label={comment.author}>{comment.author}</Avatar>}
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {comment.content}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                style={{ marginLeft: "0.75rem" }}
              >
                {comment.postedAt}
              </Typography>
            </div>
          }
        />
        <CardContent sx={{ marginLeft: "7%" }}>
          <Typography variant="body1">{comment.content}</Typography>
        </CardContent>
        <CardContent>
          <Box display="flex" alignItems="center" sx={{ marginLeft: "7%" }}>
            <Typography variant="subtitle1" style={{ marginRight: "2%" }}>
              +{comment.score}
            </Typography>
            <Divider orientation="vertical" flexItem />
            {/* <IconButton onClick={() => handleUpvote(comment.id)}>
              <KeyboardArrowUpIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton onClick={() => handleDownvote(comment.id)}>
              <KeyboardArrowDownIcon />
            </IconButton> */}
            <Divider orientation="vertical" flexItem />
          </Box>
        </CardContent>
      </Card>
      ))
    </>
  );
}

export default CommentCard;
