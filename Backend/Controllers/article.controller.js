const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Article } = require("../Models/article.model");
const { User } = require("../Models/user.model");
const { cloudinary } = require("../Configurations/cloudinary.config");

async function createArticle(req, res) {
  try {
    const { article_title, article_description, tags } = req.body;
    const createdBy = req.user._id;

    let image = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }

    const newArticle = new Article({
      article_title,
      article_description,
      user: createdBy,
      image,
      tags,
      createdAt: new Date(),
    });

    await newArticle.save();

    // Update the user's articles array
    await User.findByIdAndUpdate(createdBy, {
      $push: { articles: newArticle._id },
    });

    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

async function getPosts(req, res) {
  try {
    const { userId } = req.query;
    const query = userId ? { user: userId } : {};
    const articles = await Article.find(query).populate(
      "user",
      "first_name last_name"
    );
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

async function deletePostByPostId(req, res) {
  try {
    let { id } = req.user;
    let { postId } = req.params;
    let user = await User.findOne({ _id: id });
    if (!user.article.includes(postId)) {
      return res.status(401).json({
        message: "unauthorized User",
      });
    }
    let deletePostFromCollection = await Article.deleteOne({ _id: postId });
    if (deletePostFromCollection.deletedCount === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    let findPostIndex = user.article.indexOf(postId);
    if (findPostIndex > -1) {
      user.article.splice(findPostIndex, 1);
    }
    await user.save();
    res.status(200).json({
      message: "Post is deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { article_title, article_description, tags } = req.body;
    const uploadedResult = req.file
      ? await cloudinary.uploader.upload(req.file.path)
      : undefined;

    const loggedInUserId = req.user._id;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (loggedInUserId.toString() !== article.user.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update this article." });
    }

    article.article_title = article_title;
    article.article_description = article_description;
    article.tags = tags;
    if (uploadedResult) {
      article.image = uploadedResult.secure_url;
    }

    await article.save();

    res.status(200).json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user._id;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (loggedInUserId.toString() !== article.user.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this article." });
    }

    await Article.deleteOne({ _id: id });

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

async function searchArticles(req, res) {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title query parameter is required" });
    }

    // Search articles by title (case-insensitive)
    const articles = await Article.find({
      article_title: { $regex: title, $options: "i" },
    });

    if (!articles.length) {
      return res
        .status(404)
        .json({ message: "No articles found for the given title" });
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error("Error searching articles:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = {
  createArticle,
  getPosts,
  updateArticle,
  deleteArticle,
  searchArticles,
};
