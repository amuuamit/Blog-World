var express = require("express");
const {
  createUser,
  login,
  getUser,
  updateProfile,
} = require("../Controllers/user.controller");
const { isLoggedIn } = require("../Middlewares/login.mw");
var userRouter = express.Router();

// creating the user
userRouter.post("/createUser", createUser);

// login the user
userRouter.post("/login", login);

// get All users
userRouter.get("/getUser", isLoggedIn, getUser);

userRouter.patch("/updateProfile", isLoggedIn, updateProfile);
// get user by id only
// userRouter.get("/getUser/:id", isLoggedIn, getuserById);

// get post by user id
// userRouter.get("/getPostByUserId/:id", isLoggedIn, getPostByUserId);

// delete the post by post id
// userRouter.delete("/deletePostByPostId/:id", isLoggedIn, authorizeRole, deletePostByPostId);

// subscribe the user
// userRouter.patch("/subscribeUser", subscribeUser);

module.exports = { userRouter };
