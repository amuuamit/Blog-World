const express = require("express");
const { getAllBlogs } = require("../Controllers/blog.controller");
const { isLoggedIn } = require("../Middlewares/login.mw");

const blogRouter = express.Router();

// Fetch all blogs
blogRouter.get("/all", isLoggedIn, getAllBlogs);

module.exports = { blogRouter };
