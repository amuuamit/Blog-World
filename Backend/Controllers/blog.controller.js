const { Blog } = require("../Models/blog.model");

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = { getAllBlogs };
