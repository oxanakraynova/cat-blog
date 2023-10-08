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
import articleList from "./articleList.json";
import { Checkbox, Stack, TableSortLabel } from "@mui/material";
import { useMemo, useState } from "react";

type ArticleProps = {
  id: string;
  title: string;
  perex: string;
  author: string;
  comments: number;
};

function MyArticleTable({}: { article: ArticleProps }) {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("title");
  const [selected, setSelected] = useState<string[]>([]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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

  const sortedArticles = useMemo(() => {
    const comparator = (a: ArticleProps, b: ArticleProps) => {
      if (order === "asc") {
        if (
          orderBy === "title" &&
          typeof a.title === "string" &&
          typeof b.title === "string"
        ) {
          return a.title.localeCompare(b.title);
        } else if (
          orderBy === "comments" &&
          typeof a.comments === "number" &&
          typeof b.comments === "number"
        ) {
          return a.comments - b.comments;
        } else if (
          orderBy === "perex" &&
          typeof a.perex === "string" &&
          typeof b.perex === "string"
        ) {
          return a.perex.localeCompare(b.perex);
        } else if (
          orderBy === "author" &&
          typeof a.author === "string" &&
          typeof b.author === "string"
        ) {
          return a.author.localeCompare(b.author);
        }
      } else {
        if (
          orderBy === "title" &&
          typeof a.title === "string" &&
          typeof b.title === "string"
        ) {
          return b.title.localeCompare(a.title);
        } else if (
          orderBy === "comments" &&
          typeof a.comments === "number" &&
          typeof b.comments === "number"
        ) {
          return b.comments - a.comments;
        } else if (
          orderBy === "perex" &&
          typeof a.perex === "string" &&
          typeof b.perex === "string"
        ) {
          return b.perex.localeCompare(a.perex);
        } else if (
          orderBy === "author" &&
          typeof a.author === "string" &&
          typeof b.author === "string"
        ) {
          return b.author.localeCompare(a.author);
        }
      }
      return 0;
    };

    return articleList.sort(comparator);
  }, [order, orderBy]);

  return (
    <Box sx={{ marginLeft: "224px", width: "1131px" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < articleList.length
                  }
                  checked={
                    articleList.length > 0 &&
                    selected.length === articleList.length
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected(articleList.map((article) => article.id));
                    } else {
                      setSelected([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={() => handleRequestSort("title")}
                >
                  Article title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "perex"}
                  direction={orderBy === "perex" ? order : "asc"}
                  onClick={() => handleRequestSort("perex")}
                >
                  Perex
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "author"}
                  direction={orderBy === "author" ? order : "asc"}
                  onClick={() => handleRequestSort("author")}
                >
                  Author
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "comments"}
                  direction={orderBy === "comments" ? order : "asc"}
                  onClick={() => handleRequestSort("comments")}
                >
                  # of comments
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Checkbox
                    color="primary"
                    checked={isSelected(article.id)}
                    onChange={(event) => handleCheckboxClick(event, article.id)}
                  />
                </TableCell>
                <TableCell> {article.title}</TableCell>
                <TableCell>{article.perex}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>{article.comments}</TableCell>
                <TableCell>
                  <Stack direction="row">
                    <Link to={`/admin/${article.id}/edit`}>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      // onClick={handleDeleteClick(article.id)}
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
