import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import React from "react";

import "./BloodRequestCard.css";
import { BloodRequirement } from "../data/data.model";

const BloodRequestCard: React.FC<BloodRequirement> = ({
  bloodGroup,
  numberOfUnits,
  isCritical,
  recepientName,
  dateTimeOfIssue,
  admittedHospital,
  contactNumber,
}) => {
  return (
    <IonCard className="ion-padding blood-request-card">
      <IonCardHeader>
        {isCritical && (
          <IonText className="is-critical" color="app-blood-color">
            {"CRITICAL"}
          </IonText>
        )}
        <IonCardTitle className="card-title">
          <IonBadge color="app-blood-color" className="number-of-units">
            <IonText>
              <span>{numberOfUnits}</span>
            </IonText>
          </IonBadge>
          <br />
          <IonText className="caption">
            <span>{"Units Required"}</span>
          </IonText>
        </IonCardTitle>
        <IonCardSubtitle>
          <IonText className="blood-group" color="app-blood-color">
            {bloodGroup}
          </IonText>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{recepientName}</p>
        <p>{"Issued on " + new Date(dateTimeOfIssue).toDateString()}</p>
        <p>{admittedHospital}</p>
        <p>{"Ph no. " + contactNumber}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default BloodRequestCard;
