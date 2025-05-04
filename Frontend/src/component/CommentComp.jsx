import { Send } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import server from "../environment";
import { AuthContext } from "../context/AuthContext";

const CommentComp = ({ articleId }) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  // Fetch comments for the article
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/comments/${articleId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to fetch comments. Please try again.");
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    if (!user) {
      alert("You must be logged in to post a comment.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.post(
        `${server}/api/v1/comments/createComments`,
        {
          articleId,
          userId: user._id,
          comment, // Use the correct field name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data]); // Add new comment to the list
      setComment(""); // Clear the input field
    } catch (error) {
      if (error.response?.status === 401) {
        alert("You are not authorized to post a comment. Please log in.");
      } else {
        console.error(
          "Error posting comment:",
          error.response?.data || error.message
        );
        alert("Failed to post comment. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="items-center">Comments</h1>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="text-lg font-semibold">{comment.text}</h3>
            <p className="text-sm text-gray-500">
              By: {comment.user?.first_name || "Anonymous"} on{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <h3 className="text-center text-gray-600">No Comments</h3>
      )}
      <div className="comment-box mt-6">
        <div className="comment-form">
          <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send <Send />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentComp;
