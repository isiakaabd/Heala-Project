// Patients Route TableHeader
export const patientsHeadCells = [
  {
    id: 0,
    label: "User ID",
  },
  {
    id: 1,
    label: "Patient Name",
  },
  {
    id: 2,
    label: "Plan",
  },
  {
    id: 3,
    label: "Consultations",
  },
  {
    id: 4,
    label: "Status",
  },
  {
    id: 5,
    label: "",
  },
];

// Patient > Consultation Route Table
export const consultationsHeadCells = [
  { id: 100, label: "HCP Name" },
  { id: 101, label: "Date" },
  { id: 102, label: "Description" },
  { id: 103, label: "" },
  { id: 104, label: "" },
];

// Patients > Prescription Route Table
export const prescriptionsHeadCells = [
  { id: 200, label: "Date" },
  { id: 201, label: "Details" },
  { id: 202, label: "Dosage" },
];

// Patients > Medications Route Table
export const medicationsHeadCells = [
  { id: 300, label: "Date Prescribed" },
  { id: 301, label: "Medication Name" },
  { id: 302, label: "Prescription Types" },
  { id: 303, label: "Caregiver" },
];

// ------------------------------------

// Dashboard Route TableHeader
export const waitingHeadCells = [
  { id: 0, label: "User ID" },
  { id: 1, label: "Name" },
  { id: 2, label: "Waiting Time" },
  { id: 3, label: "" },
];

export const availabilityHeadCells = [
  { id: 0, label: "HCP ID" },
  { id: 1, label: "HCP Name" },
  { id: 2, label: "Specialization" },
  { id: 3, label: "Available Time" },
  { id: 4, label: "" },
];
