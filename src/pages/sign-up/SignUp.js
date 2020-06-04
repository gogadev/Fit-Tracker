import React, { useState } from "react";
import { withFirebase } from "../../components/Firebase";
import { Link, withRouter } from "react-router-dom";

import workoutImg from "../../assets/workout.png";

const SignUp = (props) => {
  const initialUser = {
    id: null,
    name: "",
    email: "",
    password: "",
    error: null,
    auth: null,
  };

  const [user, setUser] = useState(initialUser);

  const handleSubmit = () => {
    props.firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        return props.firebase.user(authUser.user.uid).set({
          username: user.name,
          email: user.email,
          activities: "not set",
        });
      })
      .then((authUser) => {
        setUser(initialUser);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        setUser({ ...user, err: err.message });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isValid = user.name === "" || user.email === "" || user.password === "";

  return (
    <div className="sign-up-container">
      <img className="workout-img" src={workoutImg} alt="" />
      <h1 className="title ">Sign Up</h1>
      <form className="form " onSubmit={(e) => e.preventDefault()}>
        <input
          type="name"
          name="name"
          value={user.name}
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
        />
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
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />
        <button
          className="btn"
          type="submit"
          onClick={handleSubmit}
          disabled={isValid}
        >
          Sign Up
        </button>
        <Link className="link" to="/">
          Already Have An Account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default withRouter(withFirebase(SignUp));
