import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonList,
  IonLoading,
  IonRefresher,
  IonSpinner,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

import "./DonatePage.css";
// import sample_data from "../data/sampleData";
import BloodRequestCard from "../components/BloodRequestCard";

import { useAuth } from "../auth/auth";

// Get Requests Handler
import { getRequests, getRequestUpdates } from "../data/dataHandler";

const DonatePage: React.FC = () => {
  const { userId } = useAuth();
  // Requests status state
  const [status, setStatus] = useState({ loading: true, requests: [] });

  // Pull to refresh requests data
  const refresh = (e) => {
    e.preventDefault();
    getRequests(userId, (reqs) => {
      setStatus({ loading: false, requests: reqs });
      console.log("Refreshed");
    });
    e.detail.complete();
  };

  // Fetch requests for the first time
  useEffect(() => {
    // getRequests((reqs) => {
    //   setStatus({ loading: false, requests: reqs });
    // });
    // Updating data
    // setInterval(() => {
    //   getRequests((reqs) => {
    //     setStatus({ loading: false, requests: reqs });
    //   });
    // }, 5000);
    // Subscribing to data updates
    getRequestUpdates(userId, (reqs) => {
      // console.log(reqs);
      setStatus({ loading: false, requests: reqs });
    });
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="app-blood-color">
          <IonTitle>
            <IonText>{"Donate"}</IonText>
          </IonTitle>
        </IonToolbar>
        <IonToolbar color="app-blood-color">
          <IonSegment
            // color="app-blood-color"
            onIonChange={(e) => console.log("Segment selected", e.detail.value)}
            value="Requests"
          >
            <IonSegmentButton
              className="app-segment-button-donate-page"
              value="Requests"
            >
              <IonLabel>{"Requests"}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              disabled
              className="app-segment-button-donate-page"
              value="History"
            >
              <IonLabel>{"History"}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
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
        <IonText className="requirements-text" color="primary">
          {"Requests"}
        </IonText>
        <IonText color="app-blood-color">{status.requests.length}</IonText>
        <IonList className="blood-request-list">
          {status.requests.map((item) => (
            <BloodRequestCard key={item.id} {...item.data} />
          ))}
        </IonList>
        <IonLoading
          cssClass="app-loading-indicator-red"
          isOpen={status.loading}
        />
      </IonContent>
    </IonPage>
  );
};

export default DonatePage;
