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
} from "@ionic/react";
import { useHistory } from "react-router";

import { useAuth } from "../auth/auth";
// import { UserInformation } from "../data/data.model";
import {
  getCurrentUserInfo,
  updateCurrentUserBasicInfo,
} from "../data/dataHandler";

import { onUpdateUserBasicInfo } from "../events/events";

import "./EditProfilePage.css";

const EditProfilePage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  // const [currentUserInfo, setCurrentUserInfo] = useState<UserInformation>();
  const [error, setError] = useState<boolean>(false);
  // User Info States
  const [weight, setWeight] = useState("");

  useEffect(() => {
    getCurrentUserInfo(userId, (userInfo) => {
      // console.log(userInfo);
      // setCurrentUserInfo(userInfo);
      setWeight(userInfo.weight.toString());
      setLoading(false);
    });
  }, [userId]);

  const handleInfo = (e) => {
    // console.log(e.detail.value);
    if (e.detail.value === "" || e.detail.value === "0") setError(true);
    else setError(false);

    setWeight(e.detail.value);
    // let tempUserInfo = currentUserInfo;
    // tempUserInfo.weight = Number(e.detail.value);
    // setCurrentUserInfo({
    //   ...currentUserInfo,
    //   weight: e.detail.value === "" ? "" : Number(e.detail.value),
    // });
    // console.log(currentUserInfo);
  };

  const handleSave = () => {
    updateCurrentUserBasicInfo(userId, weight, (res) => console.log(res));
  };

  if (loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonModal isOpen showBackdrop={false} cssClass="app-modal-page">
      {/* onWillDismiss={() => handleEdit(false)} */}
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              {/* <IonButton onClick={onDismiss} shape="round" fill="clear">
                <IonIcon slot="icon-only" size="large" icon={backIcon} />
              </IonButton> */}
              <IonBackButton defaultHref="/my/profile" />
            </IonButtons>
            <IonTitle>
              <IonText>{"Edit Profile"}</IonText>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding page-content-plain">
          <IonList>
            <IonItem>
              <IonLabel position="floating" color="primary">
                {"Weight in Kg"}
              </IonLabel>
              <IonInput type="number" value={weight} onIonChange={handleInfo} />
            </IonItem>
            {error && <p className="app-error-text">{"Value is Invalid"}</p>}
            <IonItem className="app-buttons-container-edit-profile">
              <IonButton
                size="default"
                slot="start"
                fill="clear"
                onClick={() => history.goBack()}
              >
                {"Cancel"}
              </IonButton>
              <IonButton
                size="default"
                disabled={error}
                slot="end"
                onClick={async () => {
                  await handleSave();
                  window.dispatchEvent(onUpdateUserBasicInfo);
                  // console.log("Update event fired!");
                  history.goBack();
                }}
              >
                {"Save"}
              </IonButton>
            </IonItem>
            {/* <IonButton
          size="small"
          className="app-button app-button-outline"
          fill="outline"
          onClick={handleLogOut}
        >
          {"Log Out"}
        </IonButton> */}
          </IonList>
        </IonContent>
      </IonPage>
    </IonModal>
  );
};

export default EditProfilePage;
