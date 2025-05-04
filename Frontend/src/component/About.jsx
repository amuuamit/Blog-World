import React from "react";
import { Container, Typography, Box, Avatar, Grid } from "@mui/material";

const teamMembers = [
  {
    name: "Avdhesh & Shyam",
    role: "Founder & CEO of Blog App",
    image: "./assets/Blog.jpg",
    bio: "Avdhesh & Shyam  is the visionary behind our blog. With a passion for writing and technology, he founded this platform to share knowledge and inspire others.",
  },
  // Add more team members as needed
];

const About = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ backgroundColor: "#f5f5f5", padding: 4, borderRadius: 2 }}
    >
      <Box my={4} textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our blog! We are dedicated to providing you with the latest
          insights, tips, and trends in various fields. Our mission is to create
          a platform where knowledge is shared, and ideas are exchanged.
        </Typography>
        <Typography variant="body1" paragraph>
          Our passionate writers and experts work tirelessly to bring you
          high-quality content that is both informative and engaging. Whether
          you are looking for advice on technology, lifestyle, food, or any
          other topic, we have something for everyone.
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box textAlign="center">
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography variant="h6" component="h3" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" paragraph>
                  {member.bio}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
