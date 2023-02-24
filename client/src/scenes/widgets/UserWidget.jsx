import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
        <img src="" alt="dp" />
        <div className="general-info-detail">
          <div className="general-info-name">
            {firstName} {lastName}
          </div>
          <div className="general-info-friends">{friends.length}</div>
        </div>
        <img src="" alt="account-setting" />
      </div>
      <div className="college-info">
        <div className="college-info-box">
          <img src="" alt="university" />
          <div className="college-info-collegename">{college}</div>
        </div>
        <div className="college-info-box">
          <img src="" alt="passing-year" />
          <div className="graduation year">{graduation_year}</div>
        </div>
      </div>
      <div className="other-socials">
        <img src="" alt="github" className="github" />
        <img src="" alt="linkedin" className="linkedin" />
      </div>
    </div>
  );
};

export default UserWidget;
