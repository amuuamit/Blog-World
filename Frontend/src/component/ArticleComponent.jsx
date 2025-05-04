import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import server from "../environment";
import { Delete, Edit } from "@mui/icons-material";
import "./ArticlesComponent.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ArticlesComponent = () => {
  const { user } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    article_title: "",
    article_description: "",
    user: user?._id || "",
    role: user?.role || "user",
    image: null,
    tags: "lifestyle",
  });
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token:", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage.");
    }

    // Fetch existing articles
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${server}/api/v1/article/getPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewArticle((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("You must be logged in to create an article.");
      return;
    }

    const formData = new FormData();
    formData.append("article_title", newArticle.article_title);
    formData.append("article_description", newArticle.article_description);
    formData.append("user", user._id);
    formData.append("role", user.role);
    formData.append("tags", newArticle.tags);

    if (newArticle.image) {
      formData.append("file", newArticle.image); // Change field name to 'file'
    }

    console.log("Submitting FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    try {
      console.log("Article image, before upload:", newArticle.image);
      const response = await axios.post(
        `${server}/api/v1/article/createArticle`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArticles((prev) => [...prev, response.data]);

      setNewArticle({
        article_title: "",
        article_description: "",
        user: user._id,
        role: user.role,
        image: null,
        tags: "lifestyle",
      });

      console.log("Article created successfully:", response.data);
    } catch (error) {
      console.error(
        "Error creating article:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setNewArticle({
      article_title: article.article_title,
      article_description: article.article_description,
      user: article.user,
      role: article.role,
      image: null,
      tags: article.tags,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingArticle) {
      return;
    }

    const formData = new FormData();
    formData.append("article_title", newArticle.article_title);
    formData.append("article_description", newArticle.article_description);
    formData.append("tags", newArticle.tags);

    if (newArticle.image) {
      formData.append("file", newArticle.image); // Change field name to 'file'
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    try {
      const response = await axios.put(
        `${server}/api/v1/article/updateArticle/${editingArticle._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArticles((prev) =>
        prev.map((article) =>
          article._id === editingArticle._id ? response.data : article
        )
      );

      setEditingArticle(null);
      setNewArticle({
        article_title: "",
        article_description: "",
        user: user._id,
        role: user.role,
        image: null,
        tags: "lifestyle",
      });

      console.log("Article updated successfully:", response.data);
    } catch (error) {
      console.error(
        "Error updating article:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return;
    }

    try {
      await axios.delete(`${server}/api/v1/article/deleteArticle/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setArticles((prev) => prev.filter((article) => article._id !== id));

      console.log("Article deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting article:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <Header />
      <div className="article_container">
        {/* Left Side - Article Form */}
        <div className="article_form">
          <div className="article_form_wrapper">
            <h2>{editingArticle ? "Edit Article" : "Create Article"}</h2>
            <form onSubmit={editingArticle ? handleUpdate : handleSubmit}>
              <input
                type="text"
                name="article_title"
                value={newArticle.article_title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <textarea
                name="article_description"
                value={newArticle.article_description}
                onChange={handleChange}
                placeholder="Description"
                required
              ></textarea>
              <input type="file" name="file" onChange={handleFileChange} />
              <select
                name="tags"
                value={newArticle.tags}
                onChange={handleChange}
              >
                <option value="lifestyle">Lifestyle</option>
                <option value="tech">Tech</option>
                <option value="food">Food</option>
              </select>
              <button type="submit">
                {editingArticle ? "Update Article" : "Create Article"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Side - Articles List */}
        <div className="articles-container">
          <h3>Existing Articles</h3>
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            <ul>
              {articles.map((article) => (
                <li className="article-card" key={article._id}>
                  {article.image && (
                    <img src={article.image} alt={article.article_title} />
                  )}
                  <div className="article-card-content">
                    <h3>{article.article_title}</h3>
                    <p>{article.article_description}</p>
                    <p>
                      Created At: {new Date(article.createdAt).toLocaleString()}
                    </p>
                    <div className="article-card-buttons">
                      <button onClick={() => handleEdit(article)}>
                        <Edit /> Edit
                      </button>
                      <button onClick={() => handleDelete(article._id)}>
                        <Delete />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ArticlesComponent;
