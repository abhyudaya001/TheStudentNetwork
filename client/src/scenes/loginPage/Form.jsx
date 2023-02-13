import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { Button, TextField } from "@mui/material";
import { setLogin } from "../../state/index.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import { orange } from "@mui/material/colors";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  college: yup.string().required("required"),
  graduation_year: yup.string().required("required"),
  tags: yup.string().required("required"),
  // picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  college: "",
  graduation_year: "",
  tags: "",
  // picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <div className="form">
      <div className="toggle-buttons">
        <div
          className={pageType === "login" ? "login-clicked" : "login"}
          onClick={() => setPageType("login")}
        >
          LOGIN
        </div>
        <div
          className={pageType === "register" ? "register-clicked" : "register"}
          onClick={() => setPageType("register")}
        >
          REGISTER
        </div>
      </div>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <>
                <div className="name">
                  <input
                    type="text"
                    className="ip1"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    placeholder="First Name"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                  />
                  <input
                    label="Last Name"
                    className="ip1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    placeholder="Last Name"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                </div>
                <input
                  label="College"
                  className="ip2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.college}
                  name="college"
                  placeholder="College Name"
                  error={Boolean(touched.college) && Boolean(errors.college)}
                  helperText={touched.college && errors.college}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
          </form>
        )}
      </Formik>
    </div>

    //         <div className="box">
    //           {isRegister && (
    //             <>
    //               <TextField
    //                 className="input-text"
    //                 label="First Name"
    //                 onBlur={handleBlur}
    //                 onChange={handleChange}
    //                 value={values.firstName}
    //                 name="firstName"
    //                 error={
    //                   Boolean(touched.firstName) && Boolean(errors.firstName)
    //                 }
    //                 helperText={touched.firstName && errors.firstName}
    //                 sx={{
    //                   height: "50px",
    //                   width: "300px",
    //                   outline: "none",
    //                   borderColor: "white",
    //                   color: "white",
    //                   fontSize: "16px",
    //                 }}
    //               />
    //               <TextField
    //                 label="Last Name"
    //                 onBlur={handleBlur}
    //                 onChange={handleChange}
    //                 value={values.lastName}
    //                 name="lastName"
    //                 error={
    //                   Boolean(touched.lastName) && Boolean(errors.lastName)
    //                 }
    //                 helperText={touched.lastName && errors.lastName}
    //                 sx={{ gridColumn: "span 2" }}
    //               />
    //               <TextField
    //                 label="College"
    //                 onBlur={handleBlur}
    //                 onChange={handleChange}
    //                 value={values.college}
    //                 name="college"
    //                 error={Boolean(touched.college) && Boolean(errors.college)}
    //                 helperText={touched.college && errors.college}
    //                 sx={{ gridColumn: "span 4" }}
    //               />
    //               <TextField
    //                 label="Graduation Year"
    //                 onBlur={handleBlur}
    //                 onChange={handleChange}
    //                 value={values.graduation_year}
    //                 name="graduation_year"
    //                 error={
    //                   Boolean(touched.graduation_year) &&
    //                   Boolean(errors.graduation_year)
    //                 }
    //                 helperText={
    //                   touched.graduation_year && errors.graduation_year
    //                 }
    //                 sx={{ gridColumn: "span 4" }}
    //               />
    //               <TextField
    //                 label="Skills"
    //                 onBlur={handleBlur}
    //                 onChange={handleChange}
    //                 value={values.tags}
    //                 name="tags"
    //                 error={Boolean(touched.tags) && Boolean(errors.tags)}
    //                 helperText={touched.tags && errors.tags}
    //                 sx={{ gridColumn: "span 4" }}
    //               />
    //             </>
    //           )}
    //           <TextField
    //             label="Email"
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             value={values.email}
    //             name="email"
    //             error={Boolean(touched.email) && Boolean(errors.email)}
    //             helperText={touched.email && errors.email}
    //             // sx={{ gridColumn: "span 2" }}
    //           />
    //           <TextField
    //             label="Password"
    //             type="password"
    //             onBlur={handleBlur}
    //             onChange={handleChange}
    //             value={values.password}
    //             name="password"
    //             error={Boolean(touched.password) && Boolean(errors.password)}
    //             helperText={touched.password && errors.password}
    //             // sx={{ gridColumn: "span 4" }}
    //           />
    //         </div>
    //         <div>
    //           <Button className="btn" type="submit">
    //             {isLogin ? "LOGIN" : "REGISTER"}
    //           </Button>
    //           {/* <div
    //             className="g-text"
    //             onClick={() => {
    //               setPageType(isLogin ? "register" : "login");
    //             }}
    //           >
    //             {isLogin
    //               ? "Don't have an account? Sign Up here."
    //               : "Already have an account? Login here."}
    //           </div> */}
    //         </div>
  );
};

export default Form;
