import React from "react";
import { IonItem, IonBadge, IonText, IonLabel } from "@ionic/react";
import { BloodRequirement } from "../data/data.model";

import "./BloodRequestItem.css";

export const BloodRequestItem: React.FC<BloodRequirement> = ({
  admittedHospital,
  bloodGroup,
  dateTimeOfIssue,
  numberOfUnits,
}) => {
  return (
    <IonItem button className="app-item-blood-request">
      <IonBadge
        slot="start"
        color="app-blood-color"
        className="app-item-number-of-units"
      >
        <IonText>
          <span>{numberOfUnits}</span>
        </IonText>
      </IonBadge>
      <IonLabel>
        <h2>{admittedHospital}</h2>
        <p>{new Date(dateTimeOfIssue).toDateString()}</p>
        <p>{new Date(dateTimeOfIssue).toLocaleTimeString()}</p>
      </IonLabel>
      <IonText slot="end" color="app-blood-color">
        {bloodGroup}
      </IonText>
    </IonItem>
  );
};
