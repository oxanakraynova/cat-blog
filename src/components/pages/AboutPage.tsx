import { Container } from "@mui/material";
import AboutSection from "../Articles/AboutSection";
import Header from "../UI/Header";

function AboutPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Header title="About" />
        <AboutSection />
      </Container>
    </>
  );
}

export default AboutPage;
