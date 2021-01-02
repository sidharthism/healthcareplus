export enum BloodGroup {
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
  recepient: string;
  recepientID: string;
  dateTimeOfIssue: Date;
  admittedHospital: string;
  contactNumber: string;
}

const sample_data: Array<BloodRequirement> = [
  {
    bloodGroup: BloodGroup.AB_p,
    numberOfUnits: 3,
    isCritical: true,
    recepient: "John Doe",
    recepientID: "xc123",
    dateTimeOfIssue: new Date(),
    admittedHospital: "Hospital",
    contactNumber: "9000000000",
  },
  {
    bloodGroup: BloodGroup.AB_p,
    numberOfUnits: 4,
    isCritical: false,
    recepient: "John Doe",
    recepientID: "xc123",
    dateTimeOfIssue: new Date(),
    admittedHospital: "Hospital",
    contactNumber: "9000000000",
  },
  {
    bloodGroup: BloodGroup.AB_p,
    numberOfUnits: 2,
    isCritical: false,
    recepient: "John Doe",
    recepientID: "xc123",
    dateTimeOfIssue: new Date(),
    admittedHospital: "Hospital",
    contactNumber: "9000000000",
  },
];

export default sample_data;
