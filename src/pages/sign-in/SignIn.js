import React, { useState } from "react";
import { withFirebase } from "../../components/Firebase";
import { Link, withRouter } from "react-router-dom";

import Slide from "react-reveal/Slide";

import icon from "../../assets/icon.png";

import Image from "../../components/Image/Image";

import "./sign-in-up.style.css";

const SignIn = (props) => {
  const initialUser = {
    id: null,
    email: "",
    password: "",
    error: null,
    auth: null,
  };

  const [user, setUser] = useState(initialUser);

  const handleSubmit = () => {
    props.firebase
      .doSignInWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        setUser({ initialUser });
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setUser({ ...user, error: error.message });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isValid = user.email === "" || user.password === "";

  return (
    <div className="container">
      <Image />
      <Slide right>
        <div className="main">
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <h1 className="title">Sign In</h1>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="e.g. fit@email.com"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              value={user.password}
              placeholder="Enter Your Password"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn"
              onClick={handleSubmit}
              disabled={isValid}
            >
              Sign In
            </button>
            <div className="icon-img">
              <img className="icon" src={icon} alt="" />
            </div>
            <Link className="link" to="/sign-up">
              Don't Have An Account?<span className="sign-up">Sign Up</span>
            </Link>{" "}
          </form>
        </div>
      </Slide>
    </div>
  );
};

export default withRouter(withFirebase(SignIn));
