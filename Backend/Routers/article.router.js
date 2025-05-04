const express = require("express");
const {
  createArticle,
  getPosts,
  updateArticle,
  deleteArticle,
  searchArticles,
} = require("../Controllers/article.controller.js");
const { isLoggedIn } = require("../Middlewares/login.mw");
const upload = require("../Configurations/multer.config");
const articleRouter = express.Router();

// article creation is done or post creation is done
articleRouter.post(
  "/createArticle",
  isLoggedIn,
  upload.single("file"),
  createArticle
); // Specify the field name for the file upload

// Fetch all the articles
articleRouter.get("/getPosts", getPosts);

// update the article by id
articleRouter.put(
  "/updateArticle/:id",
  isLoggedIn,
  upload.single("file"),
  updateArticle
); // Specify the field name for the file upload

// delete the article by id
articleRouter.delete("/deleteArticle/:id", isLoggedIn, deleteArticle);

// Search articles by title
articleRouter.get("/search", searchArticles);

module.exports = { articleRouter };
