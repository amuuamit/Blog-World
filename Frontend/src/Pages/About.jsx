import React from "react";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";

const About = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Our Blog Platform
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Welcome to Our Blog Platform
            </Typography>
            <Typography paragraph>
              Our blog platform is designed to provide a space for writers,
              thinkers, and creators to share their ideas with the world.
              Whether you're a professional writer, a hobbyist, or someone who
              just wants to share their thoughts, our platform is here for you.
            </Typography>
            <Typography paragraph>
              We believe in the power of storytelling and the importance of
              sharing knowledge. Our platform makes it easy to create, publish,
              and share your content with a global audience.
            </Typography>
            <Typography paragraph>
              With features like image uploads, tags, and comments, you can
              create rich, engaging content that connects with your readers.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" paragraph>
                Easy-to-use blog creation
              </Typography>
              <Typography component="li" paragraph>
                Image upload support
              </Typography>
              <Typography component="li" paragraph>
                Tag system for better organization
              </Typography>
              <Typography component="li" paragraph>
                Comment system for engagement
              </Typography>
              <Typography component="li" paragraph>
                User profiles and authentication
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
