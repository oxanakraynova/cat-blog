import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { InitialValuesForm } from "../../services/commentService";

function CommentCard({ comment }: { comment: InitialValuesForm }) {
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
            <IconButton>
              <KeyboardArrowUpIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <KeyboardArrowDownIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
          </Box>
        </CardContent>
      </Card>
      ))
    </>
  );
}

export default CommentCard;
