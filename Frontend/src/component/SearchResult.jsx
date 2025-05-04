import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComp from "./CardComp";
import { TextField, Container, Typography } from "@mui/material";
import server from "../environment";
// import "./SearchResult.css"; // Import the CSS file for styling

const SearchResult = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not authorized. Please log in.");
          return;
        }

        const response = await axios.get(`${server}/api/v1/article/getPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setArticles(response.data);
        } else if (response.data.articles) {
          setArticles(response.data.articles);
        } else {
          setError("Unexpected response format from the server.");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again later.");
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.article_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="search-result-container">
      <Typography variant="h4" sx={{ my: 3 }}>
        Browse Articles
      </Typography>

      <TextField
        label="Search by title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {error ? (
        <Typography variant="body1" color="error" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : filteredArticles.length > 0 ? (
        <div className="article-grid">
          {filteredArticles.map((article) => (
            <CardComp key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <Typography variant="body1" sx={{ mt: 4 }}>
          No articles found.
        </Typography>
      )}
    </Container>
  );
};

export default SearchResult;
