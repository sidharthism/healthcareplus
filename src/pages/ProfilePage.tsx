import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRouterLink as RouterLink,
  IonText,
  IonButton,
} from "@ionic/react";

// Get the firebase auth service
import { auth } from "../firebase/firebase";

const ProfilePage: React.FC = () => {
  // LogOut
  // Causes onAuthStateChanged to be fired
  const handleLogOut = () => {
    auth.signOut();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonText>{"My Profile"}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding page-content">
        <IonText>{"Profile Page"}</IonText>
        <IonButton
          className="app-button app-button-outline"
          fill="outline"
          expand="block"
          onClick={handleLogOut}
        >
          {"Log Out"}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
