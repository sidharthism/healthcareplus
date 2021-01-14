import {
  IonRouterOutlet as RouterOutlet,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  home as homeIcon,
  heart as bloodIcon,
  personAdd as requestIcon,
  personCircle as profileIcon,
} from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";

import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import RequestPage from "./pages/RequestPage";
import ProfilePage from "./pages/ProfilePage";
// import NotFoundPage from "./pages/NotFoundPage";
import "./styles.css";

// Authentication Context
import { useAuth } from "./auth/auth";
import EditProfilePage from "./pages/EditProfilePage";
import NewRequestPage from "./pages/NewRequestPage";

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <RouterOutlet>
        <Route exact path="/my/home">
          <HomePage />
        </Route>
        <Route exact path="/my/donate">
          <DonatePage />
        </Route>
        <Route exact path="/my/request">
          <RequestPage />
        </Route>
        <Route exact path="/my/request/new">
          <NewRequestPage />
        </Route>
        <Route exact path="/my/profile">
          <ProfilePage />
        </Route>
        <Route exact path="/my/profile/edit">
          <EditProfilePage />
        </Route>
        <Redirect exact path="/my" to="/my/home" />
        {/* DEFAULT ROUTE - Valid? */}
        <Route>
          <Redirect to="/my/home" />
        </Route>
      </RouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton className="home-tab" tab="home" href="/my/home">
          <IonIcon icon={homeIcon} />
          <IonLabel>
            <IonText>{"Home"}</IonText>
          </IonLabel>
        </IonTabButton>
        <IonTabButton className="donate-tab" tab="donate" href="/my/donate">
          <IonIcon icon={bloodIcon} />
          <IonLabel>
            <IonText>{"Donate"}</IonText>
          </IonLabel>
        </IonTabButton>
        <IonTabButton className="request-tab" tab="request" href="/my/request">
          <IonIcon icon={requestIcon} />
          <IonLabel>
            <IonText>{"Request"}</IonText>
          </IonLabel>
        </IonTabButton>
        <IonTabButton className="profile-tab" tab="profile" href="/my/profile">
          <IonIcon icon={profileIcon} />
          <IonLabel>
            <IonText>{"My Profile"}</IonText>
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
