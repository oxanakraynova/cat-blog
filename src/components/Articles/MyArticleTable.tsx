import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import Loading from "../UI/Loading";
import {
  ArticleData,
  ApiResponse,
  getArticles,
  deleteArticle,
} from "../../services/articleService";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function MyArticleTable({}: { article: ArticleData }) {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (!loading && !articles.length) {
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

  const columns: GridColDef[] = [
    { field: "title", headerName: "Article Title", width: 300 },
    {
      field: "perex",
      headerName: "Perex",
      width: 300,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
    },
    { field: "comments", headerName: "# of Comments", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => [
        <>
          <Link to={`/admin/${id}/edit`}>
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
            />
          </Link>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="open-modal"
            onClick={() => handleDeleteClick(id.toString())}
            color="inherit"
          />
        </>,
      ],
    },
  ];

  const rows = articles.map((article) => ({
    id: article.articleId,
    title: article.title,
    perex: article.perex || "No description available.",
    author: tenant ? tenant.name : "No author available.",
    comments: article.comments || 0,
  }));

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteArticle(id);
      console.log("Article deleted successfully.");

      const response: ApiResponse = await getArticles();

      setArticles(response.items || []);
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  };

  return (
    <Paper style={{ height: "auto", width: "100%", marginLeft: "5%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
      />
    </Paper>
  );
}

export default MyArticleTable;
