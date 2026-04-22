const Like = require("../models/like.model");
const Post = require("../models/post.model");

const toggleLike = async (req, res) => {
  try {
    const userid = req.user.id;
    const postid = req.params.id;
    
    const isAlredyliked = await Like.findOne({
      user: userid,
      post: postid,
    });

    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (isAlredyliked) {
      // Remove from Like collection
      await Like.deleteOne({
        user: userid,
        post: postid,
      });
      
      // Remove from Post model likes array
      post.likes = post.likes.filter(id => id.toString() !== userid);
      await post.save();

      return res.status(200).json({ success: true, message: "Post unliked" });
    } else {
      // Add to Like collection
      await Like.create({
        user: userid,
        post: postid,
      });

      // Add to Post model likes array
      if (!post.likes.includes(userid)) {
        post.likes.push(userid);
        await post.save();
      }

      res.status(200).json({
        success: true,
        message: "Post liked successfully",
      });
    }
  } catch (error) {
    console.log(error, " togglelike error");
    res.status(500).json({
      success: false,
      message: "toggle like failed",
    });
  }
};

const getuserPostLikes = async (req, res) => {
  try {
    const postid = req.params.id;

    // Use find() instead of findById() because we are searching by post field, not _id
    const likes = await Like.find({ post: postid }).populate(
      "user", // field name is lowercase 'user' in the model
      "name"
    );

    res.status(200).json({
      success: true,
      message: "getpostlikes success",
      totalLikes: likes.length,
      likes,
    });
  } catch (error) {
    console.log(error, " getpostlikes error");
    res.status(500).json({
      success: false,
      message: "getpostlikes failed",
    });
  }
};

const getPostLikes = async (req, res) => {
  try {
    const postid = req.params.id;

    const alllikes = await Like.countDocuments({ post: postid });
    res.status(200).json({
      success: true,
      message: "getlikes success",
      alllikes,
    });
  } catch (error) {
    console.log(error, " getlikes error");
    res.status(500).json({
      success: false,
      message: "getalllikes failed",
    });
  }
};

module.exports = { toggleLike, getPostLikes, getuserPostLikes };
