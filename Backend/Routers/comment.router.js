const express = require("express");
const {
  getComments,
  createComment,
} = require("../Controllers/comment.controller");
const { isLoggedIn } = require("../Middlewares/login.mw");

const commentRouter = express.Router();

// Fetch comments for an article
commentRouter.get("/:articleId", getComments);

// Create a new comment
commentRouter.post("/createComments", isLoggedIn, createComment);

module.exports = { commentRouter };
