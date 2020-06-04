import React, { useState, useEffect } from "react";

import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";

import CalendarBody from "./CalendarBody";
import CalendarHead from "./CalendarHead";

import AddActivity from "../AddActivity/AddActivity";
import ActivityList from "../ActivityList/ActivityList";
import EditActivity from "../EditActivity/EditActivity";

import calendar from "../../assets/calendar.png";

import "./calendar.style.css";

const Calendar = (props) => {
  const { firebase, authUser } = props;

  let defaultSelected = {
    day: moment().format("D"),
    month: moment().month(),
  };

  const [dateObj, setDateObj] = useState(moment());
  const [showMonthTable, setMonthTable] = useState(true);
  const [selectedDay, setSelected] = useState(defaultSelected);

  const allMonths = moment.months();
  const currMonth = () => dateObj.format("MMMM");
  const currYear = () => dateObj.format("YYYY");

  const setMonth = (month) => {
    let monthNo = allMonths.indexOf(month);
    let newDateObj = Object.assign({}, dateObj);
    newDateObj = moment(dateObj).set("month", monthNo);
    setDateObj(newDateObj);
    setMonthTable(true);
  };

  const toggleMonthSelect = () => setMonthTable(!showMonthTable);

  // Calendar Body //
  const setSelectedDay = (day) => {
    setSelected({ day, month: currentMonthNum() });
  };

  const currentMonthNum = () => dateObj.month();
  const daysInMonth = () => dateObj.daysInMonth();
  const currDay = () => dateObj.format("D");
  const actualMonth = () => moment().format("MMMM");

  const firstDayOfMonth = () => {
    moment(dateObj).startOf("month").format("d");
  };

  // *** Add Activity *** //
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState(null);

  // *** Activity List *** //
  const [activities, setActivities] = useState(true);
  const [loading, setLoading] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  const getData = () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
    ref
      .orderByChild("date")
      .equalTo(queryDate)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setActivities(data);
        setLoading(false);
        // setEditing(false);
      });
    retrieveActiveDays();
  };

  const retrieveActiveDays = () => {
    let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
    ref.on("value", (snapshot) => {
      let data = snapshot.val();
      const values = Object.values(data);
      const arr = values.map((obj) => {
        return obj.date.length === 8
          ? obj.date.slice(0, 3)
          : obj.date.slice(0, 4);
      });
      setActiveDays(arr);
    });
  };

  useEffect(() => {
    getData();
  }, [selectedDay]);

  // *** Edit An Activity ***/
  const [editing, setEditing] = useState(false);
  const [activity, setActivity] = useState(null);
  const [activityKey, setActivityKey] = useState(null);

  const editActivity = (activity, i) => {
    setActivityKey(Object.keys(activities)[i]);
    setEditing(true);
    setActivity(activity);
  };

  return (
    <div className="container">
      <Grid item xs={12} md={8} lg={6}>
        <h2 className="the-title">Calendar</h2>
        <CalendarHead
          allMonths={allMonths}
          currMonth={currMonth}
          currYear={currYear}
          setMonth={setMonth}
          showMonthTable={showMonthTable}
          toggleMonthSelect={toggleMonthSelect}
        />
        <CalendarBody
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currDay={currDay}
          currMonth={currMonth}
          currentMonthNum={currentMonthNum}
          actualMonth={actualMonth}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          weekdays={moment.weekdays()}
          activeDays={activeDays}
        />
      </Grid>
      <div className="sections">
        {editing ? (
          <>
            <EditActivity
              activity={activity}
              activityKey={activityKey}
              selectedDay={selectedDay}
              authUser={props.authUser}
              setEditing={setEditing}
              setOpenSnackbar={setOpenSnackbar}
              setSnackbarMsg={setSnackbarMsg}
            />
          </>
        ) : (
          <>
            <AddActivity
              selectedDay={selectedDay}
              authUser={props.authUser}
              setOpenSnackbar={setOpenSnackbar}
              setSnackbarMsg={setSnackbarMsg}
            />
          </>
        )}
        <div className="date">
          <h5>
            <span>
              <img className="calendar" src={calendar} alt="" />
            </span>
            {selectedDay.day}-{selectedDay.month + 1}-{selectedDay.year}
          </h5>
        </div>
        <ActivityList
          loading={loading}
          activities={activities}
          authUser={props.authUser}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMsg={setSnackbarMsg}
          editActivity={editActivity}
          setEditing={setEditing}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        message={snackbarMsg}
      />
    </div>
  );
};

export default Calendar;
