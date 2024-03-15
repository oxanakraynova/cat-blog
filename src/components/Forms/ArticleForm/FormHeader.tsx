import { Stack, Button } from "@mui/material";
import Header from "../../UI/Header";
import { ArticleFormProps } from "./ArticleForm";

const FormHeader = ({ mode }: ArticleFormProps) => {
  const pageTitle = mode === "create" ? "Create New Article" : "Edit Article";
  return (
    <Stack
      direction="row"
      spacing={5}
      alignItems="flex-start"
      sx={{ marginLeft: "14rem", width: "37.5rem", marginTop: "6.5rem" }}
    >
      <Header title={pageTitle} />
      <Button variant="contained" type="submit">
        Publish Article
      </Button>
    </Stack>
  );
};

export default FormHeader;
