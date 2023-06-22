const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");
const cloudinary = require("cloudinary").v2;

const createPostController = async (req, res) => {
  try {
    const { caption, postImg } = req.body;

    if (!caption || !postImg) {
      return res.send(error(400, "Caption and postImg are required"));
    }
    const cloudImg = await cloudinary.uploader.upload(postImg, {
      folder: "postImg",
    });

    //   below process from 49 to 58 it handle to sabe image to cloundinary
    const owner = req._id;
    const user = await User.findById(req._id);
    const post = await Post.create({
      owner,
      caption,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
    });

    user.posts.push(post._id);
    await user.save();

    console.log("user", user);
    console.log("post", post);

    return res.json(success(200, { post }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeAndUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId).populate('owner');

    if (!post) {
      return res.send(error(404, "post not found"));
    }

    if (post.likes.includes(curUserId)) {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
    } else {
      post.likes.push(curUserId);
    }

    await post.save();

// yaha se jo post jaayga woh map hokar jaayga jisme already sab kuch hau

    return res.send(success(200, {post:mapPostOutput(post,req._id)}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.send(error(404, "post not fopund"));
    }

    if (post.owner.toString() != curUserId) {
      return res.send(error(403, "only owner can update"));
    }

    if (caption) {
      post.caption = caption;
    }
    await post.save();

    return res.send(success(200, { post }));
  } catch (error) {
    return res.send(error(500, e.message));
  }

  // you can only edit your own post so u need to check
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId);
    const curUser = await User.findById(curUserId);
    // console.log(post.save,post.delete,post.deleteOne,post.remove);

    if (!post) {
      return res.send(error(404, "post not found "));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, "only owner can delete their post"));
    }
    // if u delete the post from db but u have also delete user id  from user->post mai se

    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1);
    await curUser.save();
    await post.deleteOne();

    return res.send(success(200, "post deleted successfully"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  createPostController,
  likeAndUnlikePost,
  updatePostController,
  deletePost,
};
