const requireUser = require("../middleware/requireUser");
const UserController = require("../controller/userController");
const router = require("express").Router();

router.post(
  "/follow",
  requireUser,
  UserController.followOrUnfollowUserController
);

router.get("/follow", requireUser, UserController.followOrUnfollowUserController);

router.get("/getFeedData", requireUser, UserController.getPostsFollowing);
router.get("/getMyPosts", requireUser, UserController.getMyPosts);
router.get("/getUserPosts", requireUser, UserController.getUserPosts);
router.delete("/", requireUser, UserController.deleteMyProfile);
router.get("/getMyInfo", requireUser, UserController.getMyInfo);
router.put("/", requireUser, UserController.updateUserProfile);
router.post('/getUserProfile', requireUser, UserController.getUserProfile);
module.exports = router;

// getpostfollowing sirf hume post laakar dea hai lekin hume aur bhi suggestion bhi chhiye
