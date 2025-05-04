var express = require("express");
var app = express();
var dotenv = require("dotenv");
let cookieParser = require("cookie-parser");
var cors = require("cors");
const { dbConfig } = require("./Configurations/db.config");
const path = require("path");

const { userRouter } = require("./Routers/user.router");
const { articleRouter } = require("./Routers/article.router");
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

let PORT = process.env.PORT || 3000;

const { commentRouter } = require("./Routers/comment.router");
// const { cloudinaryConfig } = require("./Configurations/cloudinary.config");
const _dirname = path.resolve();

app.get("/set-cookie", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.send("Cookie already set");
  }
  res.cookie("token", "123456789", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.send("Cookie has been send !");
});
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/comments", commentRouter);

app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get("/", (_, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  dbConfig();
  // cloudinaryConfig();
  console.log(`Listening to the port ${PORT}`);
});
