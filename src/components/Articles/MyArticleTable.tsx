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
import { Link, useLoaderData } from "react-router-dom";
import { Checkbox, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ApiResponse,
  ArticleData,
  deleteArticle,
  getArticles,
  getTenantById,
  Tenant,
  tenantId,
} from "../../services/apiService";
import Loading from "../UI/Loading";

function MyArticleTable({}: { article: ArticleData }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const articles: ArticleData[] = useLoaderData() as ArticleData[];

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const response = await getTenantById(tenantId);
        setTenant(response);
      } catch (error) {
        console.error("Error fetching tenant:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
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
      setLoading(true);

      await deleteArticle(id);
      console.log("Article deleted successfully.");

      const response: ApiResponse = await getArticles();

      // setArticles(response.items || []);
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    } finally {
      setLoading(false);
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
                      setSelected(articles.map((article) => article.articleId));
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
                    checked={isSelected(article.articleId)}
                    onChange={(event) =>
                      handleCheckboxClick(event, article.articleId)
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
                <TableCell>
                  {article.comments
                    ? article.comments
                    : "No comments available."}
                </TableCell>
                <TableCell>
                  <Stack direction="row">
                    <Link to={`/admin/${article.articleId}/edit`}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(article.articleId)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
