import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
// import ActivationEmail from "./auth/ActivationEmail";
import NotFound from "../utils/NotFound/NotFound";

import Profile from "../body/profile/Profile";
import EditUser from "../body/profile/EditUser";

import Home from "../body/home/Home";
import Chat from "../chat_views/Chat/Chat";
import Join from "../chat_views/Join/Join";

import { useSelector } from "react-redux";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route path="/home" component={isLogged ? Home : Login} exact />

        <Route path="/login" component={isLogged ? NotFound : Login} exact />
        <Route
          path="/register"
          component={isLogged ? NotFound : Signup}
          exact
        />

        {/* <Route
          path="/user/activate/:activation_token"
          component={ActivationEmail}
          exact
        /> */}

        <Route path="/profile" component={isLogged ? Profile : Login} exact />

        <Route path="/join" exact component={isLogged ? Join : Login} />
        <Route path="/chat" component={isLogged ? Chat : Login} />

        <Route
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
          exact
        />
      </Switch>
    </section>
  );
}

export default Body;
