import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  TextField,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Divider,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Edit,
  Delete,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    image: "",
    tags: [],
  });

  const fetchBlog = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data);
      setEditData({
        title: res.data.title,
        content: res.data.content,
        image: res.data.image,
        tags: res.data.tags,
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blog");
      setLoading(false);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/blog/${id}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [fetchBlog, fetchComments]);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}/like`);
      fetchBlog();
    } catch (err) {
      console.error("Failed to like blog:", err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/comments", {
        content: comment,
        blogId: id,
      });
      setComment("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, editData);
      setEditMode(false);
      fetchBlog();
    } catch (err) {
      console.error("Failed to update blog:", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <TextField
                fullWidth
                label="Title"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Content"
                value={editData.content}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
                multiline
                rows={10}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Image URL"
                value={editData.image}
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.value })
                }
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Update
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </Box>
            </form>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h4" component="h1">
                  {blog.title}
                </Typography>
                {user && user.id === blog.author._id && (
                  <Box>
                    <IconButton onClick={() => setEditMode(true)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => setDeleteDialog(true)}>
                      <Delete />
                    </IconButton>
                  </Box>
                )}
              </Box>
              {blog.image && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
              <Typography variant="body1" paragraph>
                {blog.content}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                {blog.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  src={blog.author.avatar}
                  alt={blog.author.username}
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  By {blog.author.username}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {new Date(blog.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton onClick={handleLike}>
                  {blog.likes.includes(user?.id) ? (
                    <Favorite color="error" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {blog.likes.length} likes
                </Typography>
              </Box>
            </>
          )}
        </Paper>

        {/* Comments Section */}
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {user && (
            <form onSubmit={handleComment}>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
              >
                Post Comment
              </Button>
            </form>
          )}
          <Divider sx={{ my: 3 }} />
          <Stack spacing={3}>
            {comments.map((comment) => (
              <Box key={comment._id}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    src={comment.author.avatar}
                    alt={comment.author.username}
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle2">
                    {comment.author.username}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Typography variant="body2">{comment.content}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <IconButton size="small">
                    {comment.likes.includes(user?.id) ? (
                      <ThumbUp fontSize="small" color="primary" />
                    ) : (
                      <ThumbUpOutlined fontSize="small" />
                    )}
                  </IconButton>
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {comment.likes.length} likes
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Blog Post</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this blog post? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogDetail;
