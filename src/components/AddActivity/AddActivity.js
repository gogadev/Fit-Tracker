import React, { useState } from "react";
import { withFirebase } from "../Firebase";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import image from "../../assets/image.png";
import durationImg from "../../assets/time.png";

import "./add-activity.style.css";

const AddActivity = (props) => {
  const {
    authUser,
    firebase,
    selectedDay,
    setOpenSnackbar,
    setSnackbarMsg,
  } = props;
  const uid = authUser.uid;

  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  const defaultActivity = {
    name: "",
    type: 0,
    duration: "",
    date: queryDate,
  };

  const [activity, setActivity] = useState(defaultActivity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      date: queryDate,
      [name]: value,
    });
  };

  const isValid = activity.name === "";

  const handleSubmit = () => {
    if (authUser) {
      firebase.addActivity(uid, activity);
      setActivity(defaultActivity);
      setOpenSnackbar(true);
      setSnackbarMsg("Workout Added");
      setTimeout(() => {
        setOpenSnackbar(false);
      }, 3500);
    }
  };

  return (
    <div className="container">
      <form className="workout-form" onSubmit={(e) => e.preventDefault()}>
        <h2 className="the-title">Add Workout</h2>
        <img className="image" src={image} alt="" />
        <input
          type="text"
          name="name"
          value={activity.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <Select
          className="select"
          labelId="demo-simple-select-label"
          id="select"
          value={activity.type}
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
          value={activity.duration}
          placeholder="Duration"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="btn"
          onClick={handleSubmit}
          disabled={isValid}
        >
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default withFirebase(AddActivity);
