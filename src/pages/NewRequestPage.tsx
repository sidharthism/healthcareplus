import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  IonButtons,
  IonModal,
  IonBackButton,
  IonLoading,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonCheckbox,
} from "@ionic/react";
import { useHistory } from "react-router";

import "./NewRequestPage.css";

import { useAuth } from "../auth/auth";

import { createNewBloodRequest } from "../data/dataHandler";

import { onCreateNewBloodRequirement } from "../events/events";
import { BloodGroup } from "../data/data.model";

const NewRequestPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  // Blood Requirement States
  const [recepientName, setRecepientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(BloodGroup.NULL);
  // const [dateOfBirth, setDateOfBirth] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState(1);
  const [isCritical, setIsCritical] = useState<boolean>(false);
  const [admittedHospital, setAdmittedHospital] = useState("");
  // const [status, setStatus] = useState({ loading: false, error: false });
  const [loading, setLoading] = useState(false);

  const handleNumberOfUnits = (e) => {
    setNumberOfUnits(e.detail.value as number);
  };

  const handleIsCritical = (e) => {
    setIsCritical(e.detail.value as boolean);
  };

  const handleRecepientName = (e) => {
    setRecepientName(e.detail.value as string);
  };

  const handleAdmittedHospital = (e) => {
    setAdmittedHospital(e.detail.value as string);
  };

  const handleContactNumber = (e) => {
    setContactNumber(e.detail.value as string);
  };

  const handleBloodGroup = (e) => {
    setBloodGroup(e.detail.value);
  };

  // Basic validation
  const Validate = (): Boolean => {
    return (
      numberOfUnits > 0 &&
      recepientName !== "" &&
      bloodGroup !== BloodGroup.NULL &&
      admittedHospital !== "" &&
      contactNumber.length === 10
    );
  };

  const handleCreateNewBloodRequirement = async () => {
    if (!Validate()) {
      console.log("Fill in necessary information!");
    } else {
      try {
        await createNewBloodRequest({
          issuerId: userId,
          recepientName,
          bloodGroup,
          numberOfUnits,
          admittedHospital,
          contactNumber,
          isCritical,
          dateTimeOfIssue: new Date(),
        });
      } catch (err) {
        console.log("Error creating new blood requirement!");
      }
    }
  };

  return (
    <IonModal isOpen showBackdrop={false} cssClass="app-modal-page">
      <IonPage>
        <IonHeader>
          <IonToolbar color="app-blood-color">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/my/request" />
            </IonButtons>
            <IonTitle>
              <IonText>{"New Request"}</IonText>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding page-content-plain">
          <IonList>
            {/* RECEPIENT NAME */}
            <IonItem>
              <IonLabel position="floating" color="primary">
                {"Recepient's Full Name"}
              </IonLabel>
              <IonInput
                value={recepientName}
                type="text"
                onIonChange={handleRecepientName}
              />
            </IonItem>
            {/* {error && <p className="app-error-text">{"Value is Invalid"}</p>} */}
            {/* RECEPIENT'S AGE */}
            <IonItem disabled>
              <IonLabel position="floating" color="primary">
                {"Age"}
              </IonLabel>
              <IonInput
                // value={recepientAge}
                type="number"
                // onIonChange={handleRecepientAge}
              />
            </IonItem>
            {/* BLOOD GROUP */}
            <IonItem>
              <IonLabel color="app-blood-color">{"Blood Group"}</IonLabel>
              <IonSelect
                interfaceOptions={{ cssClass: "app-select-blood-group" }}
                value={bloodGroup}
                okText="Ok"
                cancelText="Cancel"
                onIonChange={handleBloodGroup}
              >
                <IonSelectOption value={BloodGroup.AB_p}>
                  {"AB+"}
                </IonSelectOption>
                <IonSelectOption value={BloodGroup.AB_n}>
                  {"AB-"}
                </IonSelectOption>
                <IonSelectOption value={BloodGroup.A_p}>{"A+"}</IonSelectOption>
                <IonSelectOption value={BloodGroup.A_n}>{"A-"}</IonSelectOption>
                <IonSelectOption value={BloodGroup.B_p}>{"B+"}</IonSelectOption>
                <IonSelectOption value={BloodGroup.B_n}>{"B-"}</IonSelectOption>
                <IonSelectOption value={BloodGroup.O_p}>{"O+"}</IonSelectOption>
                <IonSelectOption value={BloodGroup.O_n}>{"O-"}</IonSelectOption>
              </IonSelect>
            </IonItem>
            {/* NUMBER OF UNITS */}
            <IonItem className="app-item-input-container-clear-border">
              <IonLabel position="floating" color="app-blood-color">
                {"Units Required"}
              </IonLabel>
              <IonRange
                pin={true}
                snaps={true}
                color="app-blood-color"
                min={1}
                max={10}
                step={1}
                value={numberOfUnits}
                onIonChange={handleNumberOfUnits}
              >
                <IonText
                  slot="end"
                  // color="app-blood-color"
                >
                  <h5 className="app-range-indicator-number-of-units">
                    {numberOfUnits}
                  </h5>
                </IonText>
              </IonRange>
            </IonItem>
            {/* IS CRITICAL */}
            <IonItem className="app-item-input-container-clear-border">
              <IonCheckbox
                slot="start"
                color="app-blood-color"
                checked={isCritical}
                onIonChange={handleIsCritical}
              />
              <IonLabel color="app-blood-color">{"Is Critical?"}</IonLabel>
            </IonItem>
            {/* ADMITTED HOSPITAL */}
            <IonItem>
              <IonLabel position="floating" color="primary">
                {"Admitted Hospital"}
              </IonLabel>
              <IonInput
                value={admittedHospital}
                type="text"
                onIonChange={handleAdmittedHospital}
              />
            </IonItem>
            {/* CASE */}
            <IonItem disabled>
              <IonLabel position="floating" color="primary">
                {"Case"}
              </IonLabel>
              <IonInput
                // value={bystanderName}
                type="text"
                // onIonChange={handleByStanderName}
              />
            </IonItem>
            {/* BLEEDING TIME */}
            <IonItem disabled>
              <IonLabel position="floating" color="primary">
                {"Bleeding Time"}
              </IonLabel>
              <IonInput
                // value={bystanderName}
                type="time"
                // onIonChange={handleByStanderName}
              />
            </IonItem>
            {/* BYSTANDER'S NAME */}
            <IonItem disabled>
              <IonLabel position="floating" color="primary">
                {"Bystander's Name"}
              </IonLabel>
              <IonInput
                // value={bystanderName}
                type="text"
                // onIonChange={handleByStanderName}
              />
            </IonItem>
            {/* CONTACT NUMBER */}
            <IonItem>
              <IonLabel position="floating" color="primary">
                {"Contact Number +91"}
              </IonLabel>
              <IonInput
                value={contactNumber}
                type="number"
                onIonChange={handleContactNumber}
              />
            </IonItem>
            {/* FOR VERIFICATION */}
            {/* ISSUED BY */}
            <IonItem disabled>
              <IonLabel color="app-blood-color">
                {"Issued By (For Verification)"}
              </IonLabel>
              <IonSelect
                interfaceOptions={{ cssClass: "app-select-blood-group" }}
                value={bloodGroup}
                okText="Ok"
                cancelText="Cancel"
                onIonChange={handleBloodGroup}
              ></IonSelect>
            </IonItem>
            <IonItem className="app-buttons-container-clear-border">
              <IonButton
                size="default"
                slot="start"
                fill="clear"
                color="app-blood-color"
                onClick={() => history.goBack()}
              >
                {"Cancel"}
              </IonButton>
              <IonButton
                size="default"
                // disabled={error}
                color="app-blood-color"
                slot="end"
                onClick={async () => {
                  setLoading(true);
                  await handleCreateNewBloodRequirement();
                  window.dispatchEvent(onCreateNewBloodRequirement);
                  // console.log("Update event fired!");
                  history.goBack();
                }}
              >
                {"Confirm"}
              </IonButton>
            </IonItem>
          </IonList>
          <IonLoading cssClass="app-loading-indicator-red" isOpen={loading} />
        </IonContent>
      </IonPage>
    </IonModal>
  );
};

export default NewRequestPage;
