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
  blood_group,
  number_of_units,
  is_critical,
  recepient_name,
  date_time_of_issue,
  admitted_hospital,
  contact_number,
}) => {
  return (
    <IonCard className="ion-padding blood-request-card">
      <IonCardHeader>
        {is_critical && (
          <IonText className="is-critical" color="app-blood-color">
            {"CRITICAL"}
          </IonText>
        )}
        <IonCardTitle className="card-title">
          <IonBadge color="app-blood-color" className="number-of-units">
            <IonText>
              <span>{number_of_units}</span>
            </IonText>
          </IonBadge>
          <br />
          <IonText className="caption">
            <span>{"Units Required"}</span>
          </IonText>
        </IonCardTitle>
        <IonCardSubtitle>
          <IonText className="blood-group" color="app-blood-color">
            {blood_group}
          </IonText>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{recepient_name}</p>
        <p>{"Issued on " + new Date(date_time_of_issue).toDateString()}</p>
        <p>{admitted_hospital}</p>
        <p>{"Ph no. " + contact_number}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default BloodRequestCard;
