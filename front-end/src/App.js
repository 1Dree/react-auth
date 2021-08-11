import "./App.css";
import React from "react";

import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signout from "./components/Signout";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./components/UpdateProfile";
import NewPassword from "./components/NewPassword";

import AuthProvider from "./contexts/AuthContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <div id="app">
      <Router>
        <Switch>
          <AuthProvider>
            <Route exact path="/" component={Signup} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <Route path="/login">
              <Login />
            </Route>

            <PrivateRoute exact path="/signout" component={Signout} />

            <PrivateRoute
              exact
              path="/update-profile"
              component={UpdateProfile}
            />

            <Route exact path="/forgot-password" component={NewPassword} />
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}
