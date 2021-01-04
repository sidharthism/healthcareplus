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
  blood_group: BloodGroup;
  number_of_units: number;
  is_critical: boolean;
  recepient_name: string;
  issuer_id: string;
  date_time_of_issue: Date;
  admitted_hospital: string;
  contact_number: string;
  case?: string;
}

const sample_data: Array<BloodRequirement> = [
  {
    blood_group: BloodGroup.AB_p,
    number_of_units: 3,
    is_critical: true,
    recepient_name: "John Doe",
    issuer_id: "xc123",
    date_time_of_issue: new Date(),
    admitted_hospital: "Hospital",
    contact_number: "+91 9000000000",
  },
  {
    blood_group: BloodGroup.AB_p,
    number_of_units: 4,
    is_critical: false,
    recepient_name: "John Doe",
    issuer_id: "xc123",
    date_time_of_issue: new Date(),
    admitted_hospital: "Hospital",
    contact_number: "+91 9000000000",
  },
  {
    blood_group: BloodGroup.AB_p,
    number_of_units: 2,
    is_critical: false,
    recepient_name: "John Doe",
    issuer_id: "xc123",
    date_time_of_issue: new Date(),
    admitted_hospital: "Hospital",
    contact_number: "+91 9000000000",
  },
];

export default sample_data;
