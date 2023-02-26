import React from "react";
import Navbar from "../navbar/navbar";
import Posts from "../widgets/Posts";
import { useSelector } from "react-redux";
import "./homepage.css";
import UserWidget from "../widgets/UserWidget";
import Friends from "../widgets/Friends";

const Homepage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div>
      <Navbar />
      <div className="posts-widgets">
        <div className="user-wid">
          <UserWidget userId={_id} />
        </div>
        <div className="post-wid">
          <Posts userId={_id} tags={"java , android"} />
        </div>
        <div className="friend-wid">
          <Friends />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
