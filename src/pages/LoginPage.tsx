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
import { Redirect } from "react-router-dom";

// Authentication Context
import { useAuth } from "../auth/auth";
// Firebase auth
import { auth } from "../firebase/firebase";

const LoginPage: React.FC = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleEmail = (e) => {
    setEmail(e.detail.value);
  };

  const handlePassword = (e) => {
    setPassword(e.detail.value);
  };

  // Basic validation
  const Validate = (): Boolean => {
    return (
      email.indexOf("@") !== -1 && email.indexOf(".") !== -1 && password !== ""
    );
  };

  // LOGGED IN CONTEXT
  const { loggedIn } = useAuth();

  const handleLogin = async () => {
    if (!Validate()) {
      setStatus({ loading: false, error: true });
      setPassword("");
    } else {
      try {
        setStatus({ loading: true, error: false });
        // const credential =
        await auth.signInWithEmailAndPassword(email, password);
        // If succeeds, automatically calls onAuthStateChanged in App.
        // setStatus({ loading: false, error: false }); At this stage LoginPage component will be unmounted
      } catch (err) {
        setStatus({ loading: false, error: true });
        setPassword("");
        console.log(err.message);
      }
    }
  };
  // If the user is already logged in, redirect to the home page.
  if (loggedIn) {
    return <Redirect to="/my/home" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonText color="primary">{"Log In"}</IonText>
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
        </IonList>
        <IonButton
          className="app-button"
          color="primary"
          expand="block"
          onClick={handleLogin}
        >
          {"Log In"}
        </IonButton>
        <IonButton
          className="app-button app-button-outline"
          fill="outline"
          color="primary"
          expand="block"
          // onClick={onLoginWithOTP}
        >
          {"Log In With OTP"}
        </IonButton>
        <IonButton
          className="app-button app-button-outline"
          fill="clear"
          color="primary"
          expand="block"
          routerLink="/register"
        >
          {"Don't have an account? Sign Up"}
        </IonButton>
        {/* Displaying Errors */}
        <IonToast
          isOpen={status.error}
          onDidDismiss={() => setStatus({ loading: false, error: false })}
          message="Invalid Credentials"
          position="bottom"
          duration={3000}
          color="app-blood-color"
          buttons={[
            // {
            //   side: "start",
            //   text: "Invalid Credentials",
            // },
            {
              text: "Ok",
              role: "cancel",
            },
          ]}
        />
        <IonLoading
          cssClass="app-loading-indicator-main"
          isOpen={status.loading}
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
