/* ============ FILTER VALUES ========== */

export const genderType = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
];

export const planFilterBy = [
  { key: "Basic", value: "Basic" },
  { key: "Premium", value: "Premium" },
  { key: "Diamond", value: "Diamond" },
];

export const statusFilterBy = [
  { key: "blocked", value: "Blocked" },
  { key: "Active", value: "Active" },
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

export const emailPageDefaultFilterValues = {
  role: "",
};

export const payoutPageDefaultFilterValues = {
  status: "",
};

export const referralPageDefaultFilterValues = {
  type: "",
};
