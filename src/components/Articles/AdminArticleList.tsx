// import { Grid, Typography } from "@mui/material";
// import articleList from "./articleList.json";
// import PostCard from "../UI/PostCard";
import { Typography } from "@mui/material";
import MyArticleTable from "./MyArticleTable";

function AdminArticleList() {
  // const currentArticleList = articleList.map((article: any) => (
  //   <PostCard
  //     id={article.id}
  //     key={article.id}
  //     image={article.image}
  //     title={article.title}
  //     perex={article.perex}
  //     publicationDate={article.publicationDate}
  //     author={article.author}
  //     comments={article.comments}
  //   />
  // ));

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          pb: 3,
          fontWeight: "bold",
          marginLeft: "224px",
          marginTop: "120px",
        }}
      >
        My articles
      </Typography>
      {/* <Grid container spacing={3}>
        {currentArticleList}
      </Grid> */}
      <MyArticleTable />
    </>
  );
}

export default AdminArticleList;
