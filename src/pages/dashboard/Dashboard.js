import React from "react";

import { AuthUserContext, withAuthentication } from "../../components/Session";
import { withRouter } from "react-router-dom";

import AppBar from "../../components/AppBar/AppBar";
import Calendar from "../../components/Calendar/Calendar";
import Copyright from "../../components/Copyright/Copyright";

import Roll from "react-reveal/Roll";

import user from "../../assets/user.jpg";

import "./dashboard.style.css";

const Dashboard = (props) => {
  const signOut = () => {
    props.firebase.auth.signOut();
    props.history.push("/");
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <div className="dashboard">
            <h1 className="title">Dashboard</h1>
            <h3 className="user">
              <img src={user} alt="" />
            </h3>
            <Roll top>
              <AppBar signOut={signOut} />
            </Roll>
            <div className="container mg">
              <Calendar firebase={props.firebase} authUser={authUser} />
            </div>
            <Copyright />
          </div>
        ) : (
          <h1 className="title">Not Authorized</h1>
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default withRouter(withAuthentication(Dashboard));
