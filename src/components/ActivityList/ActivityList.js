import React from "react";
import { withFirebase } from "../Firebase";

import Zoom from "react-reveal/Zoom";

import img from "../../assets/img.png";
import del from "../../assets/delete.png";
import edit from "../../assets/edit.png";
import loader from "../../assets/loader.gif";

import "./activity-list.style.css";

const ActivityList = (props) => {
  const {
    loading,
    activities,
    editActivity,
    setOpenSnackbar,
    setSnackbarMsg,
    setEditing,
  } = props;

  const deleteActivity = (i) => {
    const activityKey = Object.keys(activities)[i];
    const emptyActivity = {
      date: null,
      duration: null,
      type: null,
      name: null,
    };
    props.firebase.updateActivity(
      props.authUser.uid,
      emptyActivity,
      activityKey
    );

    setOpenSnackbar(true);
    setSnackbarMsg("Workout Deleted");
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3500);

    setEditing(false);
  };

  return (
    <div className="list">
      {loading === true ? (
        <div className="loader">
          <img src={loader} alt="" />
        </div>
      ) : null}
      {activities === "not set" || activities === null ? (
        <div className="list-section">
          <p className="text">~No Activities Added Yet~</p>
          <img className="text-img" src={img} alt="" />
        </div>
      ) : (
        <div className="activity-list">
          {Object.values(activities).map((activity, i) => {
            let { name, type, duration } = activity;
            switch (activity.type) {
              case 1:
                type = "Lifting Weights";
                break;
              case 2:
                type = "Running";
                break;
              case 3:
                type = "Cycling";
                break;
              default:
                type = "Not Set";
            }
            return (
              <div key={i} className="category">
                <Zoom bottom>
                  <h4>
                    <span>Name: </span> {name}
                  </h4>
                  <h4>
                    <span>Type:</span>
                    {type}
                  </h4>
                  <h4>
                    <span>Duration:</span> {duration}min
                  </h4>
                  <button className="btn bg" onClick={(e) => deleteActivity(i)}>
                    <img className="del" src={del} alt="" />
                  </button>
                  <button
                    className="btn bg"
                    onClick={(e) => editActivity(activity, i)}
                  >
                    <img className="edit" src={edit} alt="" />
                  </button>
                </Zoom>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default withFirebase(ActivityList);
