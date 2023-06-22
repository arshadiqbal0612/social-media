import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CreatePost from "../createPost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  console.log({ userProfile });

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  const feedData = useSelector((state) => state.feedDataReducer.feedData);

  // aur humare params ka naam hai user id in app.js
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      })
    );
    setIsMyProfile(myProfile?._id === params.userId);

    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId, feedData]);

  {
    /* jitni bhi post aa rahi hai usme iterate karna hai through map by userProfile */
  }

  function handleUserFollow() {
    dispatch(
      followAndUnfollowUser({
        userIdToFollow: params.userId
        // 25 wali line ki id kai hisaab se mujhe follow and unfollow karna
      })
    );
  }
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-part">
          {isMyProfile && <CreatePost />}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        {/* he key prop is being used to help React efficiently render the list of posts by providing a unique identifier for each post. This key is typically a string or a number that is unique to each element in the array. */}
        {/* ye jo post hai line 39 par woh single post hai  */}

        <div className="right-part">
          <div className="profile-card">
            <img className="user-img" src={userProfile?.avatar?.url} alt="" />
            <h3 className="user-name">{userProfile?.name}</h3>
            <p className="bio">{userProfile?.bio}</p>

            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Followings`}</h4>
            </div>
            {!isMyProfile && (
              <h5
                style={{ marginTop: "20px" }}
                onClick={handleUserFollow}
                className={
                  isFollowing ? "hover-link follow-link" : "btn-primary"
                }
              >
                {isFollowing ? "unfollow " : "follow"}
              </h5>
            )}

            {isMyProfile && (
              <button
                className="update-profile btn-secondary"
                onClick={() => {
                  navigate("/updateProfile");
                }}
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
