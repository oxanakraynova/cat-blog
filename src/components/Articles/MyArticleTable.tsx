import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { Checkbox, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Loading from "../UI/Loading";
import {
  ArticleData,
  ApiResponse,
  getArticles,
  deleteArticle,
} from "../../services/articleService";
import Modal from "../UI/Modal";

function MyArticleTable({}: { article: ArticleData }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { tenant } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);

        const response: ApiResponse = await getArticles();
        setArticles(response.items || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!articles.length) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Articles not found
        </Typography>
      </Box>
    );
  }

  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteArticle(id);
      console.log("Article deleted successfully.");

      const response: ApiResponse = await getArticles();

      setArticles(response.items || []);
      handleClose();
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  };

  return (
    <Box sx={{ marginLeft: "5%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < articles.length
                  }
                  checked={
                    articles.length > 0 && selected.length === articles.length
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected(
                        articles.map((article) => article.articleId!)
                      );
                    } else {
                      setSelected([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Article title</TableCell>
              <TableCell>Perex</TableCell>
              <TableCell>Author</TableCell>
              <TableCell># of comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.articleId}>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={isSelected(article.articleId!)}
                    onChange={(event) =>
                      handleCheckboxClick(event, article.articleId!)
                    }
                  />
                </TableCell>
                <TableCell> {article.title}</TableCell>
                <TableCell>
                  {article.perex
                    ? article.perex + " ..."
                    : "No description available."}
                </TableCell>
                <TableCell>
                  {tenant ? tenant.name : "No author available."}
                </TableCell>
                <TableCell>{article.comments ? article.comments : 0}</TableCell>
                <TableCell>
                  <Stack direction="row">
                    <Link to={`/admin/${article.articleId}/edit`}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton aria-label="open-modal" onClick={handleOpen}>
                      <DeleteIcon />
                    </IconButton>
                    {open && (
                      <Modal
                        open={open}
                        handleClose={handleClose}
                        handleDelete={() =>
                          handleDeleteClick(article.articleId!)
                        }
                        title="Delete Confirmation"
                        content="This action cannot be undone. Are you sure you want to delete this article?"
                      />
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyArticleTable;
