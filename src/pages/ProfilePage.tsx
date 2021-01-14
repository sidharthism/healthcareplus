import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonItem,
  IonIcon,
  IonRow,
  IonCol,
  IonLabel,
  IonImg,
  IonToggle,
  IonChip,
  IonActionSheet,
  IonAlert,
  IonLoading,
} from "@ionic/react";
import {
  settings as settingsIcon,
  chevronForward as arrowIcon,
  close as closeIcon,
  pencil as editIcon,
  logOut as logoutIcon,
} from "ionicons/icons";
import avatarImage from "../assets/svg/avatar.svg";
import weightIcon from "../assets/svg/weight.svg";
import bloodGroupIcon from "../assets/svg/blood_group.svg";

import "./ProfilePage.css";

import { appAuth as auth, useAuth } from "../auth/auth";
import { UserInformation } from "../data/data.model";
import {
  getCurrentUserInfo,
  calculateUserAgeFromDateOfBirth,
  eligibleToDonate,
} from "../data/dataHandler";

// LogOut
// Causes onAuthStateChanged to be fired
const handleLogOut = async () => {
  await auth.signOut();
};

// Confirm Alert

const AppAlertConfirm: React.FC<any> = ({ isOpen, handleAlertDismiss }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onWillDismiss={() => handleAlertDismiss(false)}
      // cssClass="my-custom-class"
      header={"Confirm Log Out"}
      message={"Are you sure?"}
      buttons={[
        {
          text: "Yes",
          handler: () => {
            handleLogOut();
          },
        },
        {
          text: "No",
          role: "cancel",
          // cssClass: "secondary",
          handler: () => {
            handleAlertDismiss(false);
          },
        },
      ]}
    />
  );
};

// Action Sheet
const AppActionSheet: React.FC<any> = ({
  isOpen,
  handleActionDismiss,
  handleConfirmLogOut,
  // handleEditProfile,
}) => {
  const history = useHistory();
  return (
    <IonActionSheet
      // mode="ios"
      isOpen={isOpen}
      onDidDismiss={() => handleActionDismiss(false)}
      header="Profile Settings"
      buttons={[
        {
          text: "Edit Profile",
          icon: editIcon,
          handler: () => {
            history.push("/my/profile/edit");
          },
        },
        {
          text: "Log Out",
          icon: logoutIcon,
          role: "destructive",
          handler: () => {
            handleConfirmLogOut(true);
          },
        },
        {
          text: "Cancel",
          icon: closeIcon,
          role: "cancel",
          // handler: () => {
          //   console.log("Cancel clicked");
          // },
        },
      ]}
    ></IonActionSheet>
  );
};

const ProfilePage: React.FC = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [attachUpdateListener, setAttachUpdateListener] = useState<boolean>(
    false
  );
  const [currentUserInfo, setCurrentUserInfo] = useState<UserInformation>();
  const [isEligibleToDonate, setIsEligibleToDonate] = useState<boolean>(false);
  const [showActionSheet, setShowActionSheet] = useState<boolean>(false);
  const [showAlertConfirm, setShowAlertConfirm] = useState<boolean>(false);
  // const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    getCurrentUserInfo(userId, (userInfo: UserInformation) => {
      // console.log(userInfo);
      setCurrentUserInfo(userInfo);
      setIsEligibleToDonate(
        eligibleToDonate(
          calculateUserAgeFromDateOfBirth(userInfo.dateOfBirth),
          userInfo.weight
        )
      );
      setLoading(false);
    });
  }, [userId]); // [userId, loading]
  // Handlers
  const handleAction = (state: boolean) => {
    setShowActionSheet(state);
  };
  const handleAlert = (state: boolean) => {
    setShowAlertConfirm(state);
  };
  // const handleEdit = (state: boolean) => {
  //   setEditMode(state);
  // };

  if (loading) {
    return <IonLoading isOpen />;
  }

  // const listenToUserBasicInfoUpdates =
  (() => {
    // if(!.getEventListeners(window).APP_UPDATED_USER_BASIC_INFO))
    if (!attachUpdateListener) {
      window.addEventListener("APP_UPDATED_USER_BASIC_INFO", () => {
        getCurrentUserInfo(userId, (userInfo: UserInformation) => {
          // console.log(userInfo);
          setCurrentUserInfo(userInfo);
          setIsEligibleToDonate(
            eligibleToDonate(
              calculateUserAgeFromDateOfBirth(userInfo.dateOfBirth),
              userInfo.weight
            )
          );
        });
      });
      // console.log("Update listener attached!");
      setAttachUpdateListener(true);
    }
  })();

  // listenToUserBasicInfoUpdates();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            <IonText>{"My Profile"}</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding page-content app-page-profile">
        <div className="app-profile-settings">
          <IonButton
            color="medium"
            size="small"
            fill="clear"
            // routerLink="/my/profile/settings"
            onClick={() => handleAction(true)}
          >
            <IonIcon color="medium" slot="icon-only" icon={settingsIcon} />
          </IonButton>
        </div>
        <IonItem className="app-detail-container-user">
          <IonImg className="app-avatar-user" slot="start" src={avatarImage} />
          <IonLabel className="app-detail-user">
            <h2>{currentUserInfo.fullName}</h2>
            <p>
              {calculateUserAgeFromDateOfBirth(currentUserInfo.dateOfBirth) +
                " Years"}
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel className="app-basic-info-user">
            <h2>{"Basic Info"}</h2>
            <IonRow>
              <IonCol>
                <IonIcon className="app-basic-info-icon" icon={weightIcon} />
                <IonText color="light">
                  {currentUserInfo.weight === 0
                    ? "- Kg"
                    : currentUserInfo.weight + " Kg"}
                </IonText>
              </IonCol>
              <IonCol>
                <IonIcon
                  className="app-basic-info-icon"
                  icon={bloodGroupIcon}
                />
                <IonText color="app-blood-color">
                  {currentUserInfo.bloodGroup}
                </IonText>
              </IonCol>
            </IonRow>
          </IonLabel>
          <IonText slot="end" color="app-blood-color">
            {"Donate"}
          </IonText>
          <IonToggle
            disabled={!isEligibleToDonate}
            slot="end"
            color="app-blood-color"
          />
        </IonItem>
        <IonItem disabled>
          <IonLabel className="app-basic-info-user">
            <h2>{"Emergency Contacts"}</h2>
            <IonRow>
              <IonCol>
                <p>{"+91 9000000000"}</p>
              </IonCol>
              <IonCol>
                <p>{"+91 9000000001"}</p>
              </IonCol>
            </IonRow>
          </IonLabel>
        </IonItem>
        <IonItem button disabled>
          <IonLabel className="app-basic-info-user">
            <h2>{"Chronic Conditions"}</h2>
            <IonChip color="primary">{"Asthma"}</IonChip>
            <IonChip color="primary">{"Acidity"}</IonChip>
            <IonChip color="primary">{"Allergy"}</IonChip>
          </IonLabel>
          <IonIcon size="small" slot="end" color="primary" icon={arrowIcon} />
        </IonItem>
        <IonItem button disabled>
          <IonLabel className="app-basic-info-user">
            <h2>{"Medicines"}</h2>
            <IonChip color="primary">{"Medicine 1"}</IonChip>
            <IonChip color="primary">{"Medicine 2"}</IonChip>
            <IonChip color="primary">{"Medicine 3"}</IonChip>
          </IonLabel>
          <IonIcon size="small" slot="end" color="primary" icon={arrowIcon} />
        </IonItem>
        <IonItem button disabled>
          <IonLabel className="app-basic-info-user">
            <h2>{"Health Vault"}</h2>
          </IonLabel>
          <IonIcon size="small" slot="end" color="primary" icon={arrowIcon} />
        </IonItem>
        {showActionSheet && (
          <AppActionSheet
            isOpen={showActionSheet}
            handleActionDismiss={(state) => handleAction(state)}
            handleConfirmLogOut={(state) => handleAlert(state)}
            // handleEditProfile={() => handleEdit(true)}
          />
        )}
        {showAlertConfirm && (
          <AppAlertConfirm
            isOpen={showAlertConfirm}
            handleAlertDismiss={(state) => handleAlert(state)}
          />
        )}
        {/* {editMode && (
          <EditProfilePage
            isOpen={editMode}
            onDismiss={() => handleEdit(false)}
          />
        )} */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
