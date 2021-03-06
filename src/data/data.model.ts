// BLOOD REQUIREMENTS AND DONATION DATA MODELS
export enum BloodGroup {
  NULL = "",
  A_p = "A+",
  A_n = "A-",
  B_p = "B+",
  B_n = "B-",
  O_p = "O+",
  O_n = "O-",
  AB_p = "AB+",
  AB_n = "AB-",
}

export interface BloodRequirement {
  bloodGroup: BloodGroup;
  numberOfUnits: number;
  isCritical: boolean;
  recepientName: string;
  issuerId: string;
  dateTimeOfIssue: Date;
  admittedHospital: string;
  contactNumber: string;
  case?: string;
  bystanderName?: string;
  recepientAge?: number;
  bleedingTime?: string;
  verifiedId?: string;
}

export interface BloodRequirementSnapshot {
  id?: string;
  data?: BloodRequirement;
}

// APP DB
const MEMBERSHIP_DB = {};

// INDIVIDUAL USERS
const INDIVIDUAL_USERS_DB = {
  users: {
    uid: {
      // aadhar_uid: "1234 5678 9123",
      date_and_time_joined: new Date(),
      membership_id: "1234 5678 9123",
      name: "name",
      blood_group: "blood group",
      date_of_birth: new Date(),
      is_eligible_for_donation: {
        age: 30,
        weight: 65,
        last_donated_on: new Date(),
        // Reduced state based on above values
        eligibility: true,
      },
      contact_number: "+91 9000000000", // Already available in authentication service
      medical_conditions: {
        mild: [
          {
            condition: "allergy",
            visibility: "PUBLIC",
          },
          {
            condition: "acidity",
            visibility: "PUBLIC",
          },
        ],
        chronic: [
          {
            condition: "asthma",
            visibility: "PROTECTED",
          },
          {
            condition: "arthritis",
            visibility: "PRIVATE",
          },
        ],
      },
      medications: [
        {
          medicine: "m1",
          dosage: "1",
        },
        {
          medicine: "m2",
          dosage: "2",
        },
      ],
      emergency_information: {
        contacts: ["1", "2"],
        conditions: ["a", "b"], // Or object with condition and related medications
        blood_group: "blood_group",
        medications: ["x", "y"],
      },
    },
  },
};

const DONATION_DETAILS_DB = {
  ID: {
    uid: "uid",
  },
};

const CONSULTATION_DETAILS_DB = {
  ID: {},
};

const REQUESTS_DB = {}; // REALTIME DATABASE

const USER_DOCUMENTS = {};
// ========================================

// ORGANIZATIONS
// =====================

export interface UserInformation {
  fullName: string;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  phoneNumber: string;
  weight?: number | string;
}
