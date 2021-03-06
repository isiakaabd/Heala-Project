export const patterns = {
  // PATIENTS PATTERNS
  Patients: "patients",
  "Patient view": "patients/{id}",
  "Patient Profile": "patients/{id}/profile",
  chat: "patients/{id}/profile/chat",

  // DOCTORS PATTERNS
  Doctors: "hcps",
  "Doctor view": "hcps/{id}",
  "Doctor profile": "hcps/{id}/profile",
  Earnings: "hcps/{id}/earnings",
  Availibility: "hcps/{id}/availability",
  "Doctor patients": "hcps/{id}/doctor-patients",
  "Send message": "hcps/{id}/profile/chat",

  // PARTNERS PATTERNS
  Partners: "partners",

  // MESSAGES PATTERNS
  Messages: "messages",
  "View message": "messages/{id}",

  // EMAIL PATTERNS
  Email: "email",

  // DOCTOR VERIFICATION PATTERNS
  "Doctors verification": "verification",
  "View verification": "verification/view/{id}",

  // WHITE LABEL PATTERNS
  "White labels": "label",
  "User types": "label/types",
  Providers: "label/provider",

  // FINANCE PATTERS
  Finance: "finance",
  "Earnings table": "finance/earnings",
  Payouts: "finance/payouts",
  "Pending payouts": "finance/pending",
  "Subscription earnings": "finance/sub-income",

  // REFERRALS PATTERNS
  Referrals: "referrals",
  Referral: "referrals/{id}",

  // SUBSCRIPTION PATTERNS
  Subscriptions: "plans",

  //SETTINGS PATTERNS
  Settings: "settings",
  Administrator: "settings/administrator",
  "Roles management": "settings/management",
  Role: "settings/management/{id}",
  "Permissions management": "settings/permissions",
  "List management": "settings/list-management",
  Tests: "settings/list-management/tests",

  // GENERIC PATTERNS
  Records: "{id}/records",
  /* Profile: "^{id}/profile", */
  Medications: "{id}/medications",
  Appointments: "{id}/appointments",
  Prescriptions: "{id}/prescriptions",
  Consultations: "{id}/consultations",
  "Consultation Details": "consultations/case-notes/{id}",
};

const isRootPath = (path) =>
  String(path)
    .split("/")
    .filter((e) => e).length === 1;

export function replaceWithGenerics(generics, path) {
  let str = path;

  for (const [param, regexString] of Object.entries(generics)) {
    str = str.replace(`{${param}}`, regexString);
  }

  return isRootPath(str) ? `^${str}` : str;
}

export const pathParamsRegex = {
  id: `(\\w|\\d)+`,
};

export function predicateBreadcrumbFromUrl(pattern, url) {
  const breadcrumbs = [];

  for (const [title, path] of Object.entries(pattern)) {
    const regexStr = replaceWithGenerics(pathParamsRegex, path);
    const regex = new RegExp(regexStr, "i");
    if (regex.test(url)) {
      breadcrumbs.push(title);
    }
  }

  return breadcrumbs;
}
