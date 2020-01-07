import React from "react";
import { Router as ReachRouter } from "@reach/router";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../Login";
import Signup from "../Signup";
import Places from "../Places";
import PlaceCreator from "../PlaceCreator";
import NotFound from "../NotFound";

const Router: React.FunctionComponent = () => {
  return (
    <ReachRouter>
      <PublicRoute path="/login" pageComponent={Login} />
      <PublicRoute path="/signup" pageComponent={Signup} />

      <ProtectedRoute path="/places" pageComponent={Places} />
      <ProtectedRoute path="/places/create" pageComponent={PlaceCreator} />

      <PublicRoute default pageComponent={NotFound} />
    </ReachRouter>
  )
}

export default Router;
