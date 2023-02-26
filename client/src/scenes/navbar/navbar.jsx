import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import Logo from "../assets/logo.png";
import SampleUser from "../assets/sampleuser2.svg";
import "./navbar.css";
import Home from "../assets/home.svg";
import Message from "../assets/message.svg";
import Notification from "../assets/notification.svg";
import Setting from "../assets/setting.svg";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="nav">
      <div className="left">
        <img src={Logo} alt="logo" className="n-logo" />
        <div className="logo-name">StuNet</div>
      </div>
      <div className="right">
        <img className="nav-icons" src={Home} alt="home" />
        <img className="nav-icons" src={Message} alt="message" />
        <img className="nav-icons" src={Notification} alt="notification" />
        <img className="nav-icons" src={Setting} alt="setting" />
        <img src={SampleUser} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
