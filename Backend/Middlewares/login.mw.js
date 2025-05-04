const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isLoggedIn middleware:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = { isLoggedIn };