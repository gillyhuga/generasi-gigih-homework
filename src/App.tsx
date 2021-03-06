import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CreatePlaylist from "./pages/CreatePlaylist";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar"
import { useSelector, useDispatch } from "react-redux";
import { removeToken } from "./store/auth";
import { LOGIN_URL } from "./config/config"

import { RootState } from "./store";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  const logout = () => {
    dispatch(removeToken());
    localStorage.clear()
  }

  return (
    <Router>
      <div className="bg-base-200 min-h-screen">
        <Navbar
          login={LOGIN_URL}
          logout={logout}
        />
        <Switch>
          <Route path="/create-playlist" exact>
            {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
          </Route>
          <Route path="/profile" exact>
            {isAuthorized ? <ProfilePage /> : <Redirect to="/" />}
          </Route>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="*" >
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
