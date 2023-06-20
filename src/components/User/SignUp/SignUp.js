import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
import "../SignUp/login.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../../navigation/Navigation";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import api from "../../../WebApi/api";

const initialValues = {
  name: "",
  password: "",
  email: "",
  contact: "",
};

export default function FormikSignup() {
  const navigate = useNavigate()
  const [login, setLogin] = useState({});
  const {
    values,
    errors,
    touched,
    name,
    email,
    password,
    contact,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async(values) => {
      setLogin(values);
      try {
        console.log(login)
        var response = await axios.post(api.USER_SIGNUP, { customerName:login.name, customerEmail:login.email, customerPassword:login.password, customerContact:login.contact })
        if (response.data.status){
          toast.success("your are sucessfully sigin up")
        navigate("/signin")
        }
      }
      catch (err) {
        if (response.status.err === 400)
          toast.error("Bad Request!")
        else if (response.status.err === 500)
          toast.error("Server Error !")
        console.log(err)
      }
    }
  });


  console.log(login);
  return (
    <>
     <Navigation />
    <h2 className="tip">Register yourself</h2>
    <ToastContainer/>
      <div className="cont">
        <form onSubmit={handleSubmit}>
          <div className="form sign-up">
          <div className="input-block ">
            <lable className="input-block labellogin" htmlFor="name">
              <span>Name</span>
              <input
                type="text"
                autoComplete="off"
                name="name"
                id="name"
               
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                className="logininput"
              />
              {errors.name && touched.name ? (
                <p className="form-error">{errors.name}</p>
              ) : null}
            </lable>
          </div>
          <div className="input-block">
            <lable className="input-block labellogin" htmlFor="email">
            <span>Email</span>
            <br/>
              <input
                type="email"
                autoComplete="off"
                name="email"
                id="email"
              
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                className="logininput"
              />
              {errors.email && touched.email ? (
                <p className="form-error">{errors.email}</p>
              ) : null}
            </lable>
          </div>
          <div className="input-block">
            <lable className="input-block labellogin" htmlFor="password">
              <span>Password</span>
              <input
                type="password"
                autoComplete="off"
                name="password"
                id="password"
                
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                className="logininput"
              />
              {errors.password && touched.password ? (
                <p className="form-error labellogin">{errors.password}</p>
              ) : null}
            </lable>
          </div>
          <div className="input-block">
            <label className="input-block labellogin" htmlFor="contact">
              <span>Contact</span>
              <input
                type="text"
                autoComplete="off"
                name="contact"
                id="contact"
               
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                className="logininput"
              />
              {errors.contact && touched.contact ? (
                <p className="form-error labellogin">{errors.contact}</p>
              ) : null}
            </label>
          </div>
          <br/>
          <br/>
          <div className="modal-buttons">
            <button type="submit" className="btn btn-success loginbtn">
              Sign up
            </button>
            <br/>
            <br/>
          </div>
          </div>
        </form>
        <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>One of us?</h2>
            <p>Sign In and discover great amount of new opportunities!</p>
          </div>
          <Link to="/signIn">
            <div className="img__btn">
              <span className="m--up">Sign In</span>
            </div>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
