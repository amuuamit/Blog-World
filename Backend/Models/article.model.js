const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"], // ✅ Ensure this is required
    },
    article_title: {
      type: String,
      required: [true, "Kindly provide the Post"],
      trim: true,
    },
    article_description: {
      type: String,
      required: [true, "Kindly Provide the Article Description"],
      minlength: 10,
    },
    tags: {
      type: String,
      enum: ["lifestyle", "tech", "food"],
      default: "lifestyle",
    },
    image: {
      type: String,
      // required: [true, "Kindly provide the Image URL"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
module.exports = { Article };