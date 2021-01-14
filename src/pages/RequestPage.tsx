import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonRefresher,
  IonSpinner,
  IonLoading,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { water as bloodIcon } from "ionicons/icons";

import { BloodRequestItem } from "../components/BloodRequestItem";

import "./RequestPage.css";

import { useAuth } from "../auth/auth";

import { getUserIssuedRequests } from "../data/dataHandler";

const RequestPage: React.FC = () => {
  const { userId } = useAuth();
  // Requests status state
  const [status, setStatus] = useState<{
    loading: boolean;
    issuedRequests: Array<any>;
  }>({ loading: true, issuedRequests: [] });
  const [attachUpdateListener, setAttachUpdateListener] = useState<Boolean>(
    false
  );

  // Pull to refresh requests data
  const refresh = (e) => {
    e.preventDefault();
    getUserIssuedRequests(userId, (reqs) => {
      setStatus({ loading: false, issuedRequests: reqs });
      console.log("Refreshed");
    });
    e.detail.complete();
  };

  useEffect(() => {
    // DATA LOADING
    getUserIssuedRequests(userId, (reqs) => {
      setStatus({ loading: false, issuedRequests: reqs });
    });
  }, [userId]);

  // const listenToCreatedRequirementUpdates =
  (() => {
    // if(!.getEventListeners(window).APP_UPDATED_USER_BASIC_INFO))
    if (!attachUpdateListener) {
      window.addEventListener("APP_CREATED_NEW_BLOOD_REQUIREMENT", () => {
        getUserIssuedRequests(userId, (reqs) => {
          setStatus({ loading: false, issuedRequests: reqs });
        });
      });
      // console.log("Update listener attached!");
      setAttachUpdateListener(true);
    }
  })();

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
        <IonRefresher
          slot="fixed"
          onIonRefresh={refresh}
          pullMax={80}
          pullMin={34}
        >
          <div className="app-pull-refresh">
            <IonSpinner name="crescent" color="app-blood-color" />
          </div>
        </IonRefresher>
        <IonList className="app-list-issued-blood-requests">
          {status.issuedRequests?.map((req) => (
            <BloodRequestItem key={req.id} {...req.data} />
          ))}
        </IonList>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton
            className="app-button-fab-blood-request"
            routerLink="/my/request/new"
          >
            <IonIcon icon={bloodIcon} color="app-blood-color" />
          </IonFabButton>
        </IonFab>
        <IonLoading
          cssClass="app-loading-indicator-red"
          isOpen={status.loading}
        />
      </IonContent>
    </IonPage>
  );
};

export default RequestPage;
