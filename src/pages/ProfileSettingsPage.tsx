import React, { useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonBackButton,
  IonContent,
  IonButtons,
  IonButton,
} from "@ionic/react";

const ProfileSettingsPage: React.FC = () => {
  //   useEffect(() => {
  //     return () => {
  //       console.log("UNMOUNTED");
  //     };
  //   }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/my/profile" />
          </IonButtons>
          <IonTitle>
            <IonText>{"Edit Profile"}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding page-content">
        {/* <IonButton
          size="small"
          className="app-button app-button-outline"
          fill="outline"
          onClick={handleLogOut}
        >
          {"Log Out"}
        </IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfileSettingsPage;
