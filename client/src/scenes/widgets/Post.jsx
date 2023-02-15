import React from "react";
import "./Post.css";
import SampleU from "../assets/sample-user.svg";
import Like from "../assets/like.svg";
import Comment from "../assets/comment.svg";
import Share from "../assets/share.svg";

const Post = ({
  _id,
  userId,
  firstName,
  lastName,
  title,
  description,
  likes,
  comments,
}) => {
  return (
    <div className="post-containers">
      <div className="pc-user-details">
        <img src={SampleU} alt="dp" />
        <div className="pc-ud-container">
          <p className="pc-UserName">
            {firstName} {lastName}
          </p>
          <p className="pc-college">GEHU</p>
        </div>
      </div>
      <div className="pc-title">{title}</div>
      <div className="pc-description">{description}</div>
      <div className="interaction-board">
        <div className="i-left">
          <img src={Like} alt="" className="i-like" />
          <img src={Comment} alt="" className="i-comment" />
        </div>
        <div className="i-right">
          <img src={Share} alt="" className="i-share" />
        </div>
      </div>
    </div>
  );
};

export default Post;
