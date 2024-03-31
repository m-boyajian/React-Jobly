import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../Home";
import NewLoginForm from "../auth/NewLoginForm";
import NewSignupForm from "../auth/NewSignupForm";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import ProfileForm from "../auth/ProfileForm";
import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup}) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`
  );

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <NewLoginForm login={login} />
      </Route>
      <Route exact path="/signup">
        <NewSignupForm signup={signup} />
      </Route>
      <PrivateRoute exact path="/companies">
        <CompanyList />
      </PrivateRoute>
      <PrivateRoute exact path="/jobs">
        <JobList />
      </PrivateRoute>
      <PrivateRoute exact path="/companies/:handle">
        <CompanyDetail />
      </PrivateRoute>
      <PrivateRoute path="/profile">
        <ProfileForm />
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;