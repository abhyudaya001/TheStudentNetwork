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
        <UserWidget />
        <div>
          <Posts userId={_id} />
        </div>
        <Friends />
      </div>
    </div>
  );
};

export default Homepage;
