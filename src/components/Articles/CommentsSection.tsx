import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import photo from "../../assets/3.jpg";

type CommentsProps = {
  id: string;
  comments: number;
};

function CommentsSection(article: CommentsProps) {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "User 1",
      time: "2 hours ago",
      text: "This is a great comment!",
      rating: 16,
    },
    {
      id: 2,
      name: "User 2",
      time: "1 hour ago",
      text: "I agree, it's awesome!",
      rating: 22,
    },
    {
      id: 3,
      name: "User 3",
      time: "8 hours ago",
      text: "A cat has absolute emotional honesty: human beings, for one reason or another, may hide their feelings, but a cat does not",
      rating: 16,
    },
    {
      id: 4,
      name: "User 4",
      time: "Yesterday",
      text: "I regard cats as one of the great joys in the world. I see them as a gift of highest order",
      rating: 22,
    },
  ]);

  const handleUpvote = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, rating: comment.rating + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDownvote = (commentId: number) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, rating: comment.rating - 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "760px",
        height: "auto",
        marginTop: "24px",
        marginLeft: "224px",
      }}
    >
      <Typography
        variant="h5"
        color="text.primary"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        Comments ({article.comments})
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
            id="outlined-basic"
            label="Join the discussion"
            fullWidth
            variant="outlined"
          />
        }
      />
      {comments.map((comment) => (
        <Card key={comment.id} sx={{ marginTop: "16px" }}>
          <CardHeader
            avatar={
              <Avatar aria-label={comment.name}>{comment.name[0]}</Avatar>
            }
            title={
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {comment.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  style={{ marginLeft: "12px" }}
                >
                  {comment.time}
                </Typography>
              </div>
            }
          />
          <CardContent>
            <Typography variant="body1">{comment.text}</Typography>
          </CardContent>
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1" style={{ marginRight: "7px" }}>
                +{comment.rating}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <IconButton onClick={() => handleUpvote(comment.id)}>
                <KeyboardArrowUpIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <IconButton onClick={() => handleDownvote(comment.id)}>
                <KeyboardArrowDownIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
}
export default CommentsSection;
