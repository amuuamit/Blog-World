import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#333",
        color: "white",
        py: 20,
        mt: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Blog Platform
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              A modern platform for sharing ideas, stories, and knowledge.
              Connect with writers and readers from around the world.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              Home
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: support@blogplatform.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +91 8600290821
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: 123 Blog Street, Tech City, Mumbai
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Copyright */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Blog Platform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
