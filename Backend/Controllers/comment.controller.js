const { Article } = require("../Models/article.model");
const { Comment } = require("../Models/comment.model");
const { User } = require("../Models/user.model");

// Fetch comments for an article
async function getComments(req, res) {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({ article: articleId }).populate(
      "user",
      "first_name last_name"
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

// Create a new comment
async function createComment(req, res) {
  try {
    const { articleId, userId, comment } = req.body;

    const newComment = new Comment({
      article: articleId,
      user: userId,
      text: comment,
      createdAt: new Date(),
    });

    await newComment.save();
    const populatedComment = await newComment.populate(
      "user",
      "first_name last_name"
    );
    res.status(201).json(populatedComment);
    console.log("Comment created successfully", populatedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = { getComments, createComment };
