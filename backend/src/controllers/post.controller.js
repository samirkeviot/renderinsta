const Post = require("../models/post.model");
const express = require("express");
const router = express.Router();

const uploadpost = async (req, res) => {
  console.log(req.file, "file");
  
  try {
    const id = req.user.id || req.user._id;  

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const createpost = await Post.create({ author: id, image: req.file.path });

    res.status(201).json({ success: true, data: createpost });
  } catch (error) {
    console.error("Failed to upload post:", error);
    res.status(500).json({ success: false, message: "Failed to upload post" });
  }
};

const getallpost = async (req, res) => {
  try {
    const response = await Post.find().sort({createdAt: -1}).populate("author", "name");
    return res.status(200).json({ success: true, posts: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to get all posts" });
  }
}
module.exports = { uploadpost , getallpost};