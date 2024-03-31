import { Grid, Typography } from "@mui/material";

import image from "../../assets/animal-2569336_1280.jpg";
import Header from "../UI/Header";
import { StyledCardMedia } from "../UI/styled/styledImages";
import Subheader from "../UI/Subheader";

function AboutSection() {
  return (
    <Grid container>
      <Grid item xs={12} sm={8}>
        <Header title="About" />
      </Grid>
      <Grid item xs={12} sm={8}>
        <StyledCardMedia src={image} alt="cat is lying on a chair" />
        <Typography variant="body1" gutterBottom>
          Welcome to our cat-loving corner of the internet! We are passionate
          feline enthusiasts dedicated to sharing our profound love for these
          mysterious and charming creatures. Our cat blog is a purrfect place
          for all things cat-related, where we aim to entertain, educate, and
          celebrate the world of cats.
        </Typography>
        <Subheader title="Our mission" />
        <Typography variant="body1" gutterBottom>
          Our mission is simple: to create a space where cat lovers can come
          together to exchange stories, learn about cat care, discover the
          latest trends in cat fashion, and deepen their understanding of these
          enigmatic creatures. We believe that by sharing our knowledge and
          experiences, we can foster a stronger bond between humans and their
          feline companions.
        </Typography>
        <Subheader title="What You'll Find Here" />
        <Typography variant="body1" gutterBottom>
          Our cat blog covers a wide range of topics, from practical tips on
          grooming and nutrition to heartwarming tales of rescued kitties
          finding their forever homes. We also delve into the world of cat
          behavior, offering advice on solving common cat-related challenges.
          Plus, you'll find a gallery of adorable cat photos that are sure to
          brighten your day.
        </Typography>
        <Subheader title="Join Our Community" />
        <Typography variant="body1" gutterBottom>
          We invite you to be part of our growing cat-loving community. Whether
          you're a seasoned cat owner or a curious cat admirer, we welcome your
          input, questions, and stories. Feel free to explore our blog, leave
          comments, and connect with us on social media. Together, we can make
          the internet a happier and furrier place for cats and their devoted
          humans.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AboutSection;
