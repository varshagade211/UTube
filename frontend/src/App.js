import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from './components/Home'
import YourVideos from './components/YourVideos'

import  SingleVideoPage from './components/SingleVideoPage'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div className="appContainer">
    <Navigation isLoaded={isLoaded} />

    {isLoaded && (
      <Switch>
        <Route exact={true} path='/'>
            <Home />
        </Route>
        <Route exact={true} path="/signup">
          <SignupForm />
        </Route>
        <Route exact={true} path="/signin">
          <LoginForm />
        </Route>
        <Route exact={true} path="/video/:id/">
          <SingleVideoPage />
        </Route>
        <ProtectedRoute exact={true} path="/:userId/videos/">
          <YourVideos />
        </ProtectedRoute>
      </Switch>
    )}
  </div>
  );
}

export default App;
