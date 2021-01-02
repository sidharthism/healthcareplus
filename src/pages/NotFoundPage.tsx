import React from "react";
import {
  IonPage,
  IonContent,
  IonText,
  IonRouterLink as RouterLink,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { arrowBack as backIcon } from "ionicons/icons";

const NotFoundPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding page-content">
        <IonText color="primary">
          <h4>
            {"Oops! Landed here?"}
            <br />
            {"Don't worry."}
            <br />
            {"We've found a way back home"}
            <br />
            {"for you ;)"}
          </h4>
        </IonText>
        <RouterLink routerLink="/">
          <IonButton className="button" color="primary">
            <IonIcon slot="start" icon={backIcon} size="small" />
            {"Take me back home"}
          </IonButton>
        </RouterLink>
      </IonContent>
    </IonPage>
  );
};

export default NotFoundPage;
