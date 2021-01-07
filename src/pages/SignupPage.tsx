import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonImg,
  IonList,
  IonToast,
  IonLoading,
  IonDatetime,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import { BloodGroup } from "../data/data.model";

// Authentication Context and auth provider
import { appAuth as auth, useAuth, addNewUserInfo } from "../auth/auth";

import logo from "../assets/logo_large.png";
import "./LoginSignupPage.css";

const SignupPage: React.FC = () => {
  const history = useHistory();
  // States
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(BloodGroup.NULL);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleEmail = (e) => {
    setEmail(e.detail.value);
  };

  const handlePassword = (e) => {
    setPassword(e.detail.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.detail.value);
  };

  const handleFullname = (e) => {
    setFullName(e.detail.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.detail.value);
  };

  const handleDateOfBirth = (e) => {
    setDateOfBirth(e.detail.value);
  };

  const handleBloodGroup = (e) => {
    setBloodGroup(e.detail.value);
  };

  // Basic validation
  const Validate = (): Boolean => {
    return (
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1 &&
      fullName != "" &&
      dateOfBirth != "" &&
      bloodGroup != BloodGroup.NULL &&
      phoneNumber.length == 10 &&
      password !== "" &&
      password === confirmPassword
    );
  };

  // LOGGED IN CONTEXT
  const { loggedIn } = useAuth();

  // To provide a user tour
  // let isNewUser = false;

  // SIGNING UP A NEW USER
  const handleSignup = async () => {
    if (!Validate()) {
      setStatus({ loading: false, error: true });
      setPassword("");
      setConfirmPassword("");
      // console.log("Improper email or Passwords do not match");
    } else {
      try {
        setStatus({ loading: true, error: false });
        // const credential =
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        // ASYNC PROCESS, Set the details of New User
        addNewUserInfo(user.uid, {
          full_name: fullName,
          date_of_birth: dateOfBirth,
          blood_group: bloodGroup,
          phoneNumber: phoneNumber,
          weight: 0,
        });

        // If succeeds, automatically calls onAuthStateChanged in App.
        // setStatus({ loading: false, error: false }); At this stage LoginPage component will be unmounted
        // isNewUser = true;
      } catch (err) {
        setStatus({ loading: false, error: true });
        setPassword("");
        setConfirmPassword("");
        console.log(err.message);
      }
    }
  };

  // if (loggedIn && isNewUser) {
  //   return <Redirect to="/my/profile" />;
  // }
  if (loggedIn) {
    return <Redirect to="/my/home" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonText color="primary">{"Sign Up"}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding page-content-plain">
        <IonImg className="image-logo" src={logo} />
        <IonList>
          {/* E - MAIL */}
          <IonItem>
            <IonLabel position="floating" color="primary">
              {"E - mail"}
            </IonLabel>
            <IonInput type="email" value={email} onIonChange={handleEmail} />
          </IonItem>
          {/* FULL NAME */}
          <IonItem>
            <IonLabel position="floating" color="primary">
              {"Full Name"}
            </IonLabel>
            <IonInput
              type="text"
              value={fullName}
              onIonChange={handleFullname}
            />
          </IonItem>
          {/* DATE OF BIRTH */}
          <IonItem>
            <IonLabel position="floating" color="primary">
              {"Date of Birth"}
            </IonLabel>
            <IonDatetime
              value={dateOfBirth}
              displayFormat="D MMM YYYY"
              onIonChange={handleDateOfBirth}
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
              <IonSelectOption value={BloodGroup.AB_p}>{"AB+"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.AB_n}>{"AB-"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.A_p}>{"A+"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.A_n}>{"A-"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.B_p}>{"B+"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.B_n}>{"B-"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.O_p}>{"O+"}</IonSelectOption>
              <IonSelectOption value={BloodGroup.O_n}>{"O-"}</IonSelectOption>
            </IonSelect>
          </IonItem>
          {/* PHONE NUMBER */}
          <IonItem>
            <IonLabel position="floating" color="primary">
              {"Ph No. +91"}
            </IonLabel>
            <IonInput
              type="tel"
              value={phoneNumber}
              onIonChange={handlePhoneNumber}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              {"Password"}
            </IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={handlePassword}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" color="primary">
              {"Confirm Password"}
            </IonLabel>
            <IonInput
              type="password"
              value={confirmPassword}
              onIonChange={handleConfirmPassword}
            />
          </IonItem>
        </IonList>
        <IonButton
          className="app-button"
          color="primary"
          expand="block"
          onClick={handleSignup}
        >
          {"Sign Up"}
        </IonButton>
        <IonButton
          className="app-button app-button-outline"
          fill="clear"
          color="primary"
          expand="block"
          // routerLink="/login" // Pushes duplicate to stack again
          onClick={(e) => {
            e.preventDefault();
            // history.replace("/login");
            history.goBack();
          }}
        >
          {"Already have an account? Log In"}
        </IonButton>
        {/* Displaying Errors */}
        <IonToast
          isOpen={status.error}
          onDidDismiss={() => setStatus({ loading: false, error: false })}
          message="Insufficient or Invalid Entries or Password Mismatch"
          position="bottom"
          duration={3000}
          color="app-blood-color"
          buttons={[
            // {
            //   side: "start",
            //   text: "Invalid Email or Password Mismatch",
            // },
            {
              text: "Ok",
              role: "cancel",
            },
          ]}
        />
        <IonLoading cssClass="app-loading-indicator" isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
