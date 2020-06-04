import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";

import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
