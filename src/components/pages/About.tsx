import { Container } from "@mui/material";
import AboutArticle from "../Articles/AboutArticle";
import Header from "../UI/Header";

function AboutPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Header title="About" />
        <AboutArticle />
      </Container>
    </>
  );
}

export default AboutPage;
