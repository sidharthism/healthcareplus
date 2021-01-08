// Firebase
import { firestore } from "../firebase/firebase";

import { BloodGroup } from "./data.model";

// BLOOD REQUIREMENTS

function toAppUserInfo(firestoreUserInfo) {
  return {
    fullName: firestoreUserInfo.full_name,
    dateOfBirth: firestoreUserInfo.date_of_birth,
    bloodGroup: firestoreUserInfo.blood_group,
    phoneNumber: firestoreUserInfo.phone_number,
    weight: firestoreUserInfo.weight,
  };
}

function toFirestoreUserInfo(appUserInfo) {
  return {
    full_name: appUserInfo.fullName,
    date_of_birth: appUserInfo.dateOfBirth,
    blood_group: appUserInfo.bloodGroup,
    phone_number: "+91" + appUserInfo.phoneNumber,
    weight: appUserInfo.weight ? appUserInfo.weight : 0,
  };
}

// GET A SPECIFIC FIELD - Blood Group
export const getUserBloodGroup = (uId, callback) => {
  const userRef = firestore.collection("users").doc(uId);
  userRef
    .get()
    .then((snapshot) => {
      callback(toAppUserInfo(snapshot.data()).bloodGroup);
    })
    .catch((err) => {
      console.log(err);
      callback(BloodGroup.NULL);
    });
};

export function getRequests(uId, callback) {
  getUserBloodGroup(uId, (bloodGroup) => {
    const requirementsRef = firestore.collection("blood_requirement");
    requirementsRef
      .where("blood_group", "==", bloodGroup)
      .get()
      .then(({ docs }) => {
        // snapshot.docs
        const requests = docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        callback(requests);
      })
      .catch((err) => {
        console.log(err.message);
        callback([]);
      });
  });
}

export function getRequestUpdates(uId, callback) {
  getUserBloodGroup(uId, (bloodGroup) => {
    const requirementsRef = firestore.collection("blood_requirement");
    return requirementsRef.where("blood_group", "==", bloodGroup).onSnapshot(
      ({ docs }) => {
        const requests = docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        callback(requests);
      },
      (err) => {
        console.log(err.message);
        callback({});
      }
    );
  });
}

// USER DATA
export const addNewUserInfo = async (uId, userInfo, callback?) => {
  const userRef = firestore.collection("users").doc(uId);
  try {
    await userRef.set(toFirestoreUserInfo(userInfo));
    callback("Registered Successfully!");
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUserInfo = async (uId, callback) => {
  const userRef = firestore.collection("users").doc(uId);
  try {
    const snapshot = await userRef.get();
    callback(toAppUserInfo(snapshot.data()));
  } catch (err) {
    console.log(err);
  }
};

export const calculateUserAgeFromDateOfBirth = (dateOfBirth): string => {
  // const currentYear = Number(new Date().getFullYear());
  // const yearOfBirth = Number(new Date(dateOfBirth).getFullYear());
  // return (currentYear - yearOfBirth).toString();
  const birthDate = new Date(dateOfBirth);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
};

// CONSULTATION DETAILS
export const getUserConsultationDetails = async (uId, callback) => {
  const userRef = firestore
    .collection("users")
    .doc(uId)
    .collection("consultation_details");
  try {
    const snapshot = await userRef.get();
    callback(snapshot.docs.map((doc) => doc.data()));
  } catch (err) {
    console.log(err);
  }
};
