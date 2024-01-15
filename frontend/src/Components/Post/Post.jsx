import React, { useEffect, useState } from "react";
import "./Post.css";
import {
  MoreVert,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import {
  DeletePost,
  Getcommnetpost,
  UpdatePost,
  getlikeanddislikepost,
} from "../../Actions/Post";
import { GetMyposts, LoadUser, postoffollowinguser } from "../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

const Post = ({
  postId,
  postcaption,
  postimage,
  likes = [],
  comments = [],
  userId,
  userimage,
  userName,
  IsDelete = false,
  IsAccount = false,
}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [likeuser, setLikeuser] = useState(false);
  const [commentuser, setCommnetuser] = useState("");
  const [commenttoogle, setCommnetoogle] = useState(false);
  const [captiontoggle, setCationtoggle] = useState(false);
  const [captionvalue, setcaptionvalue] = useState(postcaption);

  const { userdata } = useSelector((state) => state.user);

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === userdata._id) {
        setLike(true);
      }
    });
  });

  const commenthandler = async (e) => {
    e.preventDefault();
    await dispatch(Getcommnetpost(postId, commentuser));

    if (IsAccount) {
      dispatch(GetMyposts());
    } else {
      dispatch(postoffollowinguser());
    }
  };

  const deleteposthandler = async () => {
    await dispatch(DeletePost(postId));
    dispatch(GetMyposts());
    dispatch(LoadUser());
  };

  const updatehandler = (e) => {
    e.preventDefault();
    dispatch(UpdatePost(captionvalue, postId));
    dispatch(GetMyposts());
  };

  const hanldlike = async () => {
    setLike(!like);
    await dispatch(getlikeanddislikepost(postId));

    if (IsAccount) {
      dispatch(GetMyposts());
    } else {
      dispatch(postoffollowinguser());
    }
  };

  return (
    <div className="post">
      <div className="postHeader">
        {IsAccount ? (
          <Button onClick={() => setCationtoggle(!captiontoggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>

      <img src={postimage} alt="post" />

      <div className="postDetails">
        <Avatar
          src={userimage}
          alt="user"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${userId}`}>
          <Typography fontWeight={700}>{userName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color={grey}
          style={{ alignSelf: "center" }}
        >
          {postcaption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        disabled={likes.length === 0 ? true : false}
        onClick={() => setLikeuser(!likeuser)}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={hanldlike}>
          {like ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setCommnetoogle(!commenttoogle)}>
          <ChatBubbleOutline />
        </Button>

        <Button onClick={deleteposthandler}>
          {IsDelete ? <DeleteOutline /> : null}
        </Button>
      </div>

      <Dialog open={likeuser} onClose={() => setLikeuser(!likeuser)}>
        <div className="DialogBox">
          <Typography> Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like?._id}
              userID={like?._id}
              avator={like?.profilepic.url}
              name={like?.name}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commenttoogle}
        onClose={() => setCommnetoogle(!commenttoogle)}
      >
        <div className="DialogBox">
          <Typography> Comments</Typography>

          <form className="commentForm" onSubmit={commenthandler}>
            <input
              type="text"
              value={commentuser}
              onChange={(e) => setCommnetuser(e.target.value)}
              placeholder="ENTER YOUR COMMENT"
              required
            />

            <Button variant="contained" type="submit">
              Add
            </Button>
          </form>

          {comments && comments.length > 0 ? (
            comments.map((user) => (
              <CommentCard
                key={user?._id}
                userId={user?.user._id}
                picture={user?.user?.profilepic.url}
                name={user?.user.name}
                comment={user?.comment}
                commentId={user?._id}
                postId={postId}
              />
            ))
          ) : (
            <Typography>No Comment Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captiontoggle}
        onClose={() => setCationtoggle(!captiontoggle)}
      >
        <div className="DialogBox">
          <Typography> Update Caption</Typography>

          <form className="commentForm" onSubmit={updatehandler}>
            <input
              type="text"
              value={captionvalue}
              onChange={(e) => setcaptionvalue(e.target.value)}
              placeholder="Caption here"
              required
            />

            <Button variant="contained" type="submit">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;