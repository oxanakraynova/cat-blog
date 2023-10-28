import { Box, CardMedia, Typography } from "@mui/material";

import image from "../../assets/animal-2569336_1280.jpg";

function AboutArticle() {
  return (
    <Box
      sx={{
        pb: 3,
        marginLeft: "14rem",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "31.5rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
          objectFit: "cover",
        }}
        src={image}
        alt="cat is lying on a chair"
      />
      <Typography variant="body1" gutterBottom>
        Welcome to our cat-loving corner of the internet! We are passionate
        feline enthusiasts dedicated to sharing our profound love for these
        mysterious and charming creatures. Our cat blog is a purrfect place for
        all things cat-related, where we aim to entertain, educate, and
        celebrate the world of cats.
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Our mission
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our mission is simple: to create a space where cat lovers can come
        together to exchange stories, learn about cat care, discover the latest
        trends in cat fashion, and deepen their understanding of these enigmatic
        creatures. We believe that by sharing our knowledge and experiences, we
        can foster a stronger bond between humans and their feline companions.
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        What You'll Find Here
      </Typography>
      <Typography variant="body1" gutterBottom>
        Our cat blog covers a wide range of topics, from practical tips on
        grooming and nutrition to heartwarming tales of rescued kitties finding
        their forever homes. We also delve into the world of cat behavior,
        offering advice on solving common cat-related challenges. Plus, you'll
        find a gallery of adorable cat photos that are sure to brighten your
        day.
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Join Our Community
      </Typography>
      <Typography variant="body1" gutterBottom>
        We invite you to be part of our growing cat-loving community. Whether
        you're a seasoned cat owner or a curious cat admirer, we welcome your
        input, questions, and stories. Feel free to explore our blog, leave
        comments, and connect with us on social media. Together, we can make the
        internet a happier and furrier place for cats and their devoted humans.
      </Typography>
    </Box>
  );
}

export default AboutArticle;
