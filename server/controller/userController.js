const Post = require("../models/Post");
const User = require("../models/User");
const { post } = require("../routers/authrouter");
const { error, success } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");
// const { mapPostOutput } = require("../utils/Utils");

const cloudinary = require("cloudinary").v2;

const followOrUnfollowUserController = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    //  kis user ko follow karna chhta ho
    const curUserId = req._id;
    const userToFollow = await User.findById(userIdToFollow);
    const curUser = await User.findById(curUserId);

    if (!userToFollow) {
      return res.send(error(404, "user to follow not found"));
    }

    if (curUserId === userIdToFollow) {
      return res.send(error(409, "cant follow yourself"));
    }
    if (curUser.followings.includes(userIdToFollow)) {
      // already followed
      const followingIndex = curUser.followings.indexOf(userIdToFollow);
      curUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(curUser);
      userToFollow.followers.splice(followerIndex, 1);
    } else {
      // if you are not following
      userToFollow.followers.push(curUserId);
      curUser.followings.push(userIdToFollow);
    }

    await userToFollow.save();
    await curUser.save();

    return res.send(success(200, { user: userToFollow }));

  } catch (e) {
    res.send(error(500, e.message));
  }
};

// now i want friend post
const getPostsFollowing = async (req, res) => {
  try {
    const curUserId = req._id;
    // we will go post file on database and fetch that data where we follow the user
    // every post have owner id
    const curUser = await User.findById(curUserId).populate("followings");

    const fullPosts = await Post.find({
      // jis jis post kai owner mere curr user kai following mai aa rahe hai  woh post mujeh laakar de do
      owner: {
        $in: curUser.followings,
      },
    }).populate("owner");

    const posts = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();

    // woh saare saare users lekar aao jiskke mai follow nahi kar rah hoo
    //  aur mujhe woh id mil chuki hai jsiko mai follow kar rha hoo
    const followingsIds = curUser.followings.map((item) => item._id);
    followingsIds.push(req._id);

    const suggestions = await User.find({
      // this will become my suggestion
      _id: {
        $nin: followingsIds,
        // is id kai ilwa sab id ko laakar de dga
      },
    });

    return res.send(success(200, { ...curUser._doc, suggestions, posts }));
  } catch (error) {
    console.log(e);

    return res.send(error(500, e.message));
  }
};

const getMyPosts = async (req, res) => {
  try {
    const curUserId = req._id;
    const allUserPosts = await Post.find({
      owner: curUserId,
    }).populate("likes");

    return res.send(success(200, { allUserPosts }));
  } catch (error) {
    console.log(e);
    return res.send(error(500, e.message));
  }
};

const getUserPosts = async (req, res) => {
  try {
    const UserId = req.body.userId;

    if (!UserId) {
      return res.send(error(400, "userid required"));
    }
    const allUserPosts = await Post.find({
      owner: UserId,
    }).populate("likes");

    return res.send(success(200, { allUserPosts }));
  } catch (error) {
    console.log(e);
    return res.send(error(500, e.message));
  }
};

const deleteMyProfile = async (req, res) => {
  try {
    const curUserId = req._id;
    const curUser = await User.findById(curUserId);

    // delete all posts
    await Post.deleteMany({
      owner: curUserId,
    });

    // removed myself from followers' followings
    curUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(curUserId);
      follower.followings.splice(index, 1);
      // at the end followers ko save kar dege aapko hata kar(matlab anuuj bhaiaya ko)
      await follower.save();
      // saamne wlae kai followers ko update karega end process
    });

    // remove myself from my followings' followers
    // agar mai apna delete kar diya to mai apna account hatunga usme se kisme se are usme like eg uske uske followers mai se
    curUser.followings.forEach(async (followingId) => {
      const following = await User.findById(followingId);
      const index = following.followers.indexOf(curUserId);
      following.followers.splice(index, 1);
      await following.save();
    });

    // remove myself from all likes
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
      await post.save();
    });

    // delete user
    await curUser.deleteOne();

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "user deleted"));
  } catch (e) {
    console.log(e);
    return res.send(error(500, e.message));
  }
};

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req._id);
    return res.send(success(200, { user }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, userImg } = req.body;

    const user = await User.findById(req._id);

    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (userImg) {
      const cloudImg = await cloudinary.uploader.upload(userImg, {
        folder: "profileImg",
      });
      user.avatar = {
        url: cloudImg.secure_url,
        publicId: cloudImg.public_id,
      };
    }
    await user.save();
    return res.send(success(200, { user }));
  } catch (e) {
    console.log("put e", e);
    return res.send(error(500, e.message));
  }
};
const getUserProfile = async (req, res) => {
  try {
    // line 195 se 201 tak ye theory apnata hai ->Overall, this code is useful for retrieving a user and their associated posts with all the relevant information, including the owner of each post.

    const userId = req.body.userId;
    const user = await User.findById(userId).populate({
      path: "posts",
      populate: {
        path: "owner",
      },
    });

    const fullPosts = user.posts;
    const posts = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();

    return res.send(success(200, { ...user._doc, posts }));
    // The spread operator (...) is used to copy the properties from user._doc into a new object, and then the posts property is added to that object. This new object is then passed as the data argument to the success function. 209
  } catch (e) {
    console.log("error put", e);
    return res.send(error(500, e.message));
  }
};

module.exports = {
  followOrUnfollowUserController,
  getPostsFollowing,
  getMyPosts,
  getUserPosts,
  deleteMyProfile,
  getMyInfo,
  updateUserProfile,
  getUserProfile,
};
