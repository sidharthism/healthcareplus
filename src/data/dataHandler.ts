// Firebase
import { firestore } from "../firebase/firebase";

// import { BloodRequirementSnapshot } from "./data.model";

export function getRequests(callback) {
  const requirementsRef = firestore.collection("blood_requirement");
  requirementsRef
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
}

export function getRequestUpdates(callback) {
  const requirementsRef = firestore.collection("blood_requirement");
  requirementsRef.where("blood_group", "==", "AB+").onSnapshot(
    ({ docs }) => {
      const requests = docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      callback(requests);
    },
    (err) => {
      console.log(err.message);
      callback([]);
    }
  );
}
