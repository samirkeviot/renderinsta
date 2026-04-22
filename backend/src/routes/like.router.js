const express = require("express");
const {
  toggleLike,
  getuserPostLikes,
  getPostLikes,
} = require("../controllers/like.controller");
const authmiddleware = require("../middleware/auth.middleware");
const likerouter = express.Router();

likerouter.post("/:id", authmiddleware, toggleLike);
likerouter.get("/count/post/:id", authmiddleware, getuserPostLikes);
likerouter.get("/getpostlikes/:id", authmiddleware, getPostLikes);

module.exports = likerouter;
