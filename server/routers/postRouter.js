const router = require("express").Router();
// put s used for update
const postController = require("../controller/postController");
const requireUser = require("../middleware/requireUser");
// router.get("/all", requireUser, postController.getallpostcontroller);
router.post("/", requireUser, postController.createPostController);
router.post("/like", requireUser, postController.likeAndUnlikePost);
router.put("/", requireUser, postController.updatePostController);
router.delete("/", requireUser, postController.deletePost);
module.exports = router;
