
const upload = require("../middleware/upload.middleware");
const authmiddleware = require("../middleware/auth.middleware");
const { uploadpost, getallpost } = require("../controllers/post.controller");

const postrouter = require("express").Router();

postrouter.post("/post", authmiddleware, upload.single("image"), uploadpost);

postrouter.get("/posts", authmiddleware, getallpost);

module.exports = postrouter;
