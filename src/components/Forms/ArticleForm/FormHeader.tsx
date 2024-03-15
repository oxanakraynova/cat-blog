import { Stack, Button } from "@mui/material";
import { useNavigation } from "react-router-dom";
import Header from "../../UI/Header";
import { ArticleFormProps } from "./ArticleForm";

const FormHeader = ({ mode }: ArticleFormProps) => {
  const pageTitle = mode === "create" ? "Create New Article" : "Edit Article";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Stack
      direction="row"
      spacing={5}
      alignItems="flex-start"
      sx={{ marginLeft: "14rem", width: "37.5rem", marginTop: "6.5rem" }}
    >
      <Header title={pageTitle} />
      <Button variant="contained" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Publish Article"}
      </Button>
    </Stack>
  );
};

export default FormHeader;
