import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import image from "../../assets/image.png";
import durationImg from "../../assets/time.png";

import "./edit-activity.style.css";

const EditActivity = (props) => {
  const {
    authUser,
    firebase,
    activity,
    activityKey,
    setEditing,
    setOpenSnackbar,
    setSnackbarMsg,
  } = props;
  const uid = authUser.uid;

  const defaultActivity = {
    name: activity.name,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
  };

  const [newActivity, setNewActivity] = useState(defaultActivity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const isValid = newActivity.name === "";

  const handleSubmit = (action) => {
    if (authUser) {
      firebase.updateActivity(uid, newActivity, activityKey);
      setEditing(false);
      setOpenSnackbar(true);
      setSnackbarMsg("Workout Updated");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3500);
    }
  };

  return (
    <div className="container edit-activity">
      <form className="workout-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="workout title edit-title">Edit Workout</h2>
        <img className="image" src={image} alt="" />
        <input
          type="text"
          name="name"
          value={newActivity.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <Select
          className="select"
          labelId="demo-simple-select-label"
          id="select"
          value={newActivity.type}
          style={{ minWidth: "100%" }}
          name="type"
          onChange={handleChange}
        >
          <MenuItem id="menu" value={0}>
            Choose Your Workout
          </MenuItem>
          <MenuItem id="menu" value={1}>
            Lifting Weights
          </MenuItem>
          <MenuItem id="menu" value={2}>
            Running
          </MenuItem>
          <MenuItem id="menu" value={3}>
            Cycling
          </MenuItem>
        </Select>
        <img src={durationImg} className="duration" alt="" />
        <input
          type="number"
          name="duration"
          value={newActivity.duration}
          placeholder="Duration"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="btn edit-btn"
          onClick={() => handleSubmit("add")}
          disabled={isValid}
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default withFirebase(EditActivity);
