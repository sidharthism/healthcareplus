import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
} from "@ionic/react";

const DonatePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="app-blood-color">
          <IonTitle>
            <IonText>{"Request"}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding page-content">
        <IonText>{"Request Donors"}</IonText>
      </IonContent>
    </IonPage>
  );
};

export default DonatePage;
