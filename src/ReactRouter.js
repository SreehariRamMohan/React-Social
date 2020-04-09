import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import App from "./App"
import Login from "./Authentication/Login"
import Signup from "./Authentication/Signup"
import Profile from "./Profile/Profile"

class ReactRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>

          <Route path="/home">
            <App />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ReactRouter;