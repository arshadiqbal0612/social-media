import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./CreatePost.scss";

import { BsCardImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postsSlice";
function CreatePost() {
  const [postImg, setPostImg] = useState("");

  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  }

  const hanldePostSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.post("/posts", {
        caption,
        postImg,
      });
      console.log("post done", result);

      dispatch(
        getUserProfile({
          userId: myProfile?._id,
        })
      );
    } catch (e) {
      console.log("what is th error", e);
    } finally {
      dispatch(setLoading(false));
      setCaption("");
      setPostImg("");
    }
  };

  return (
    <div className="CreatePost">
      <div className="left-part">
        <Avatar src={myProfile.avatar?.url} />
      </div>

      <div className="right-part">
        <input
          value={caption}
          type="text"
          className="captionInput"
          placeholder="whats on your mind"
          onChange={(e) => setCaption(e.target.value)}
        />

        {postImg && (
          <div className="img-container">
            <img className="post-img" src={postImg} alt="post img" />
          </div>
        )}

        {/* 29 se 31 tabhi dekkhna jab hum post sleect kar lete hai  iske liye thdoa jsx llikunga */}
        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="inputImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              className="inputImg"
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="post-btn btn-primary" onClick={hanldePostSubmit}>
            post
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
