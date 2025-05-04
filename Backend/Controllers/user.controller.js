const { User } = require("../Models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function createUser(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = await User.create(req.body);
    res.status(201).json({
      message: "User is created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error while creating user",
      error: error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // console.log("Login");

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("Password", password, user.password);
    console.log("Email and password", email, password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credential" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

async function getUser(req, res) {
  try {
    let { limit, offset } = req.query;
    User.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(offset))
      .populate("articles")
      .then((response) => {
        res.status(200).json({
          message: "User data fetched successfully",
          response: response,
        });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

// Update user profile
async function updateProfile(req, res) {
  try {
    const userId = req.user._id; // Extract user ID from the authenticated user
    const updatedData = req.body;

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

module.exports = { createUser, login, getUser, updateProfile };
