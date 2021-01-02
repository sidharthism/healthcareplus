import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
} from "@ionic/react";

import "./DonatePage.css";
import sample_data from "../data/data";
import BloodRequestCard from "../components/BloodRequestCard";

const DonatePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="app-blood-color">
          <IonTitle>
            <IonText>{"Donate"}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding page-content">
        <IonText className="ion-padding" color="primary">
          {"Requirements"}
        </IonText>
        <IonText color="app-blood-color">{sample_data.length}</IonText>
        <IonList className="blood-request-list">
          {sample_data.map((item, index) => (
            <BloodRequestCard key={index} {...item} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DonatePage;
