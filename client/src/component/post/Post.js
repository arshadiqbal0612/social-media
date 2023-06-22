import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart, AiOutlineHeart, FcLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { TOAST_SUCCESS } from "../../App";
import { showToast } from "../../redux/slices/appConfigSlice";
// ai bcz this icon from ai place

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handlePostLiked() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message:'liked or unliked'
      })
    );

    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }

  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <Avatar src={post.owner?.avatar?.url} />

        <h4>{post.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url} alt="" />
        {/* <img src={backgroundImg}/> */}
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLiked}>
          {post.isLiked ? (
            <AiFillHeart style={{ color: "red" }} className="icon" />
          ) : (
            <AiOutlineHeart className="icon" />
          )}

          <h4>{`${post.likesCount} likes`}</h4>
        </div>

        <p className="caption">{post.caption}</p>

        <h4 className="time-ago">{post?.timeAgo}</h4>
      </div>
    </div>
  );
}

export default Post;
