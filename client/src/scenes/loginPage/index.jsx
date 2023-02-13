import Form from "./Form.jsx";
import React from "react";
import "./login.css";
import Logo from "../assets/logo.png";
import { useMediaQuery } from "@mui/material";
const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <div className="login-page">
      <div className="form-parent">
        <div className="f-left">
          <Form />
        </div>
        {isNonMobileScreens && (
          <div className="f-right">
            <p className="welcome-text">Welcome to StuNet</p>
            <p className="desc">
              Where computer science students and professionals come together to
              connect and solve complex problems. Ask questions, share
              knowledge, and find solutions in a dynamic and supportive
              community
            </p>
            <img className="logo" src={Logo} alt="logo" />
            <p className="l-name">StuNet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
