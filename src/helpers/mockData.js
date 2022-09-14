/* ============ FILTER VALUES ========== */

export const categoryFilterOptions = [
  { key: "Diagnostics", value: "diagnostics" },
  { key: "Pharmacy", value: "pharmacy" },
  { key: "Hospital", value: "hospital" },
];

export const genderType = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
];

export const searchOptions = [
  { key: "By ID", value: "id" },
  { key: "By first name", value: "firstName" },
  { key: "By last name", value: "lastName" },
];
export const HealaSearchOptions = [{ key: "By ID", value: "id" }];

export const hmoSearchOptions = [
  { key: "By HMO ID", value: "hmoId" },
  { key: "By first name", value: "firstName" },
  { key: "By last name", value: "lastName" },
  { key: "By HMO plan", value: "plan" },
];

export const plansSearchOptions = [{ key: "By name", value: "name" }];

export const hmoSearchFilterOptions = {
  hmoId: "SDT07657",
  firstName: "John",
  lastName: "Doe",
  plan: "Plan name",
};

export const plansSearchFilterOptions = {
  name: "Heala plan",
};

export const doctorsSearchOptions = [
  { key: "By ID", value: "id" },
  { key: "By first name", value: "firstName" },
  { key: "By last name", value: "lastName" },
];

export const doctorsProfileDefaultFilterByValues = {
  gender: "",
  cadre: "",
  specialization: "",
  providerId: "",
};

export const patientsProfileDefaultFilterByValues = {
  gender: "",
  provider: "",
};

export const cadreOptions = [
  {
    key: "House Officer",
    value: "House Officer",
  },
  {
    key: "Medical officer (MO)",
    value: "Medical officer (MO)",
  },
  {
    key: "Registrar",
    value: "Registrar",
  },
  {
    key: "Senior Registrar",
    value: "Senior Registrar",
  },
  {
    key: "Consultant",
    value: "Consultant",
  },
];

export const specializationOptions = [
  { key: "Internal medicine", value: "Internal medicine" },
  { key: "Family medicine", value: "Family medicine" },
  { key: "General Practitioner (GP)", value: "General Practitioner (GP)" },
  { key: "Pediatrics", value: "Pediatrics" },
  { key: "Emergency medicine", value: "Emergency medicine" },
  { key: "Obstetrics gynecology", value: "Obstetrics gynecology" },
  { key: "Neurology", value: "Neurology" },
  { key: "Geriatrics", value: "Geriatrics" },
  { key: "Psychiatry", value: "Psychiatry" },
  { key: "Anesthesiology", value: "Anesthesiology" },
  { key: "Cardiology", value: "Cardiology" },
  { key: "Dermatology", value: "Dermatology" },
  { key: "Intensive medicine", value: "Intensive medicine" },
  { key: "Endocrinology", value: "Endocrinology" },
  { key: "Radiology", value: "Radiology" },
  { key: "Otorhinolaryngology", value: "Otorhinolaryngology" },
  { key: "Ophthalmology", value: "Ophthalmology" },
  { key: "Oncology", value: "Oncology" },
  { key: "General surgery", value: "General surgery" },
  { key: "Gynaecology", value: "Gynaecology" },
  { key: "Infectious disease", value: "Infectious disease" },
  { key: "Rheumatology", value: "Rheumatology" },
  { key: "Nephrology", value: "Nephrology" },
  { key: "Infectious disease", value: "Infectious disease" },
  { key: "Pulmonology", value: "Pulmonology" },
  { key: "Gastroenterology", value: "Gastroenterology" },
  { key: "Osteopathy", value: "Osteopathy" },
  { key: "Clinical  physiology", value: "Clinical physiology" },
  { key: "Allergology", value: "Allergology" },
  { key: "Adolescent medicine ", value: "Adolescent medicine " },
  { key: "Aviation medicine", value: "Aviation medicine" },
  {
    key: "Child and adolescent psychiatry",
    value: "Child and adolescent psychiatry",
  },
  { key: "occupational medicine ", value: "occupational medicine " },
  { key: "Neonatology", value: "Neonatology" },
];

export const planFilterBy = [
  { key: "Basic", value: "Basic" },
  { key: "Premium", value: "Premium" },
  { key: "Diamond", value: "Diamond" },
];

export const statusFilterBy = [
  { key: "Inactive", value: false },
  { key: "Active", value: true },
];

export const docVerifyStatusFilterBy = [
  { key: "Verified", value: true },
  { key: "Not Verified", value: false },
];

export const patientsFilterBy = {
  gender: "",
  status: "",
  provider: "",
  plan: "",
};

export const specializationFilterBy = [
  { key: "Hospital", value: "hospital" },
  { key: "Pharmacy", value: "pharmacy" },
  { key: "Diagnostics", value: "diagnostics" },
];

export const cadreFilterBy = [
  { key: "Consultant", value: "Consultant" },
  { key: "House Officer", value: "House Officer" },
  { key: "Registrar", value: "Registrar" },
  { key: "Senior Registrar", value: "Senior Registrar" },
];

export const providerFilterBy = [
  { key: "Heala", value: "Heala" },
  { key: "No provider", value: "No provider" },
];

export const roleFilterBy = [
  { key: "user", value: "user" },
  { key: "success", value: "success" },
  { key: "failed", value: "failed" },
];

export const payoutFilterBy = [
  { key: "Pending", value: "Pending" },
  { key: "Success", value: "Success" },
  { key: "Failed", value: "Failed" },
];

export const referralFilterBy = [{ key: "diagnostics", value: "diagnostics" }];

export const addHMOInitialValues = {
  name: "",
  icon: "",
  iconAlt: "",
  userTypeId: "61ed2b68e6091400135e3dba",
  email: "",
  phone: "",
  address: "",
};

/* ================ FILTER DEFAULT VALUES ==================== */

export const doctorsPageDefaultFilterValues = {
  gender: "",
  status: "",
  provider: "",
  cadre: "",
  specialization: "",
};

export const patientsPageDefaultFilterValues = {
  gender: "",
  status: "",
  provider: "",
  plan: "",
};

export const docVerifyPageDefaultFilterValues = {
  status: "",
};

export const emailPageDefaultFilterValues = {
  role: "",
};

export const payoutPageDefaultFilterValues = {
  status: "",
};

export const referralPageDefaultFilterValues = {
  type: "",
};

export const docSpecializationsOptions = [
  { key: "diagnostics", value: "diagnostics" },
  { key: "pharmacy", value: "pharmacy" },
];

export const addDocInitialValues = {
  firstName: "",
  lastName: "",
  specialization: "",
  image: null,
  cadre: "",
  gender: "",
  hospital: "",
  phone: "",
  dob: null,
  dociId: "",
};

export const docCadreOptions = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
  { key: "3", value: "3" },
  { key: "4", value: "4" },
  { key: "5", value: "5" },
];

export const defaultPageInfo = {
  totalDocs: 0,
  limit: 10,
  offset: null,
  hasPrevPage: false,
  hasNextPage: true,
  page: 1,
  totalPages: 9,
  pagingCounter: 1,
  prevPage: null,
  nextPage: 2,
};
export const QualificationOptions = [
  {
    key: "MBBS Qualification",
    value: "MBBS Qualification",
  },
  {
    key: "Primary Certificate",
    value: "Primary Certificate",
  },
  {
    key: "Member Certificate",
    value: "Member Certificate",
  },
  {
    key: "Fellow Certificate",
    value: "Fellow Certificate",
  },
];

export const addHMOEnrolleInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  photo: "",
  hmoId: "",
  noc: "",
  plan: "",
  planId: "",
  expiryDate: "",
};

/* ========= TYPES ============ */

export const paginationActionTypes = Object.freeze({
  FIRSTPAGE: "FIRSTPAGE",
  NEXTPAGE: "NEXTPAGE",
  PREVPAGE: "PREVPAGE",
  LASTPAGE: "LASTPAGE",
});

/* MOCK */

export const hospitalData = [
  {
    _id: 1,
    name: "Paleon Hospital",
    plans: 12,
    email: "johndoe@test.com",
  },
  {
    _id: 2,
    name: "Evercare Hospital",
    plans: 5,
    email: "johndoe@test.com",
  },
  {
    _id: 3,
    name: "Wella Health Hospital",
    plans: 7,
    email: "johndoe@test.com",
  },
  {
    _id: 4,
    name: "St. Nicohlas Hospital",
    plans: 2,
    email: "johndoe@test.com",
  },
  {
    _id: 5,
    name: "ABC Hospital",
    plans: 1,
    email: "johndoe@test.com",
  },
];
