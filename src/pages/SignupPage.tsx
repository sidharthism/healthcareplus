import React, { useState } from "react";
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
} from "@ionic/react";

import logo from "../assets/logo_large.png";
import "./LoginSignupPage.css";
import { Redirect, useHistory } from "react-router-dom";

// Authentication Context
import { useAuth } from "../auth/auth";
// Firebase auth
import { auth } from "../firebase/firebase";

const SignupPage: React.FC = () => {
  const history = useHistory();
  // States
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

  // Basic validation
  const Validate = (): Boolean => {
    return (
      email.indexOf("@") !== -1 &&
      email.indexOf(".") !== -1 &&
      password !== "" &&
      password === confirmPassword
    );
  };

  // LOGGED IN CONTEXT
  const { loggedIn } = useAuth();

  // To provide a user tour
  let isNewUser = false;

  // SIGNING UP A NEW USER
  const handleSignup = async () => {
    if (!Validate()) {
      setStatus({ loading: false, error: true });
      // console.log("Improper email or Passwords do not match");
    } else {
      try {
        setStatus({ loading: true, error: false });
        const credential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        // If succeeds, automatically calls onAuthStateChanged in App.
        // setStatus({ loading: false, error: false }); At this stage LoginPage component will be unmounted
        isNewUser = true;
      } catch (err) {
        setStatus({ loading: false, error: true });
        console.log(err.message);
      }
    }
  };

  if (loggedIn && isNewUser) {
    return <Redirect to="/my/profile" />;
  }
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
          <IonItem>
            <IonLabel position="floating" color="primary">
              {/* {"Ph No."} */}
              {"E - mail"}
            </IonLabel>
            <IonInput type="email" value={email} onIonChange={handleEmail} />
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
          message="Invalid Entries or Password Mismatch"
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
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
