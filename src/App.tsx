import {
  IonApp,
  IonLoading,
  IonRouterOutlet as RouterOutlet,
} from "@ionic/react";
import { IonReactRouter as Router } from "@ionic/react-router";
import React from "react";
import { Redirect, Route } from "react-router";

// App Authentication
import { AuthContext, useAuthInit } from "./auth/auth";

import AppTabs from "./AppTabs";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  // AUTHENTICATION STATE
  const { loading, auth } = useAuthInit();

  // Briefly show a loading indicator while we obtain the authState instead of showing
  // the login page.
  if (loading) {
    return <IonLoading isOpen />;
  }

  // console.log(" Auth State : ", auth);

  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <Router>
          {/* REPLACED Switch */}
          <RouterOutlet>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <SignupPage />
            </Route>
            <Route path="/my">
              <AppTabs />
            </Route>
            <Redirect exact path="/" to="/my/home" />
            <Route>
              <NotFoundPage />
            </Route>
          </RouterOutlet>
        </Router>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
