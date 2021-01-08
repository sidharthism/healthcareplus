import React, { useEffect } from "react";
import { Plugins, AppUrlOpen } from "@capacitor/core";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
} from "@ionic/react";
import { arrowBack as backIcon } from "ionicons/icons";

const { App } = Plugins;

const EditProfilePage: React.FC<any> = ({ isOpen, onDismiss }) => {
  useEffect(() => {
    App.addListener("backButton", (data: AppUrlOpen) => {
      console.log(
        "User pushed the back button, default behaviour has been overiden"
      );
    });
    console.log("Edit Mode");
    return () => {
      App.removeAllListeners();
      console.log("Edit Mode Closed");
    };
    //     return () => {
    //       console.log("UNMOUNTED");
    //     };
  }, [isOpen]);
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} showBackdrop={false}>
      {/* onWillDismiss={() => handleEdit(false)} */}
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonButton onClick={onDismiss} shape="round" fill="clear">
                <IonIcon slot="icon-only" size="large" icon={backIcon} />
              </IonButton>
              {/* <IonBackButton defaultHref="/my/profile" /> */}
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
    </IonModal>
  );
};

export default EditProfilePage;
