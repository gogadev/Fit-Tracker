import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import admin from "../../assets/admin.png";

import "./app-bar.style.css";

const AppBar = (props) => {
  let match = useRouteMatch();
  return (
    <div className="sidebar-container">
      <h3 className="sub-title">Menu</h3>
      <div className="details">
        <Link to={`${match.url}`}>
          <h4 className="section">Workouts</h4>
        </Link>
        <div className="account">
          <h4 className="sub-title">Account</h4>
          <div className="icon-section">
            {" "}
            <img className="admin" src={admin} alt="" />
          </div>
          <Link to={`${match.url}/admin`}>
            <h4 className="section">Admin</h4>
          </Link>
        </div>
        <button className="btn" onClick={() => props.signOut()}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default AppBar;
