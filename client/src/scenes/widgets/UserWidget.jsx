import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SampleUser from "../assets/sampleuser2.svg";
import ProfileSetting from "../assets/profilesetting.svg";
import GradYear from "../assets/gradyear.svg";
import College from "../assets/college.svg";
import Github from "../assets/github.svg";
import LinkedIn from "../assets/linkedin.svg";
import Hr from "../assets/line.svg";
import "./Post.css";
const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const getDetail = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userDetail = await response.json();
    setUser(userDetail);
  };
  useEffect(() => {
    getDetail();
  }, []);
  if (!user) return null;
  const { firstName, lastName, college, email, friends, graduation_year } =
    user;
  console.log(user);
  return (
    <div className="user-container">
      <div className="general-info">
        <img src={SampleUser} alt="dp" />
        <div className="general-info-detail">
          <div className="general-info-name">
            {firstName} {lastName}
          </div>
          <div className="general-info-friends">{friends.length}</div>
        </div>
        <img src={ProfileSetting} alt="account-setting" />
      </div>
      <img src={Hr} alt="" />
      <div className="college-info">
        <div className="college-info-box">
          <img src={College} alt="university" />
          <div className="college-info-collegename">{college}</div>
        </div>
        <div className="college-info-box">
          <img src={GradYear} alt="passing-year" />
          <div className="graduation year">{graduation_year}</div>
        </div>
      </div>
      <img src={Hr} alt="" />
      <div className="other-socials">
        <img src={Github} alt="github" className="github" />
        <img src={LinkedIn} alt="linkedin" className="linkedin" />
      </div>
    </div>
  );
};

export default UserWidget;
