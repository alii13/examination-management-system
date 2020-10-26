import React from "react";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Dashboard from "./dashboard/Dashboard";
import Navbar from "./navbar/";

function App() {
  

  return (
    <>
      <Router>
      <Navbar/>
        <Switch>
          <Route exact={true} path={"/signin"}  component={Login} />
          <ProtectedRoute exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/signup" component={Signup} />
          <ProtectedRoute component={Dashboard} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
