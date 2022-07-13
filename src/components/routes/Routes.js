import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import { CircularChart } from "components/Utilities";
import {
  ViewHCP,
  Chat,
  Patients,
  Subscription,
  Hcps,
  ViewDoctorVerification,
  SingleHCP,
  DoctorVerificationProfile,
  Appointments,
  HcpEarnings,
  HcpAvailability,
  HcpPatients,
  HcpAppointments,
  HcpProfile,
  Medications,
  SinglePatient,
  CaseNotes,
  MedicalRecords,
  Prescriptions,
  PatientAppointment,
  Email,
  HCP,
  Consultations,
  PatientProfile,
  Dashboard,
  HcpCaseNote,
  HcpConsultations,
  ViewMessage,
  CreateMessage,
  Messages,
  WaitingListDetails,
  WaitingList,
  Permission,
  Management,
  Administrator,
  ViewReferral,
  Settings,
  ReferralTab,
  Partners,
  Finance,
  Payout,
  HCPChat,
  CreateEmail,
  ViewMail,
  EditManagement,
  PendingPayout,
  WhiteLabel,
  UserTypes,
  Providers,
  Financetable,
} from "components/pages";
import ListManagment from "components/pages/ListManagment";
import TestList from "components/pages/TestList";

const Routes = () => {
  return (
    <Switch>
      {/*  =====  DASHBORD ROUTES STARTS HERE ===== */}
      <PrivateRoute path={["/", "/dashboard"]} exact component={Dashboard} />

      {/*  =====  PATENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/patients" component={Patients} />

      <PrivateRoute exact path="/patients/:patientId" component={SinglePatient} />

      <PrivateRoute exact path="/patients/:patientId/profile" component={PatientProfile} />

      <PrivateRoute exact path="/patients/:patientId/profile/chat" component={Chat} />

      <PrivateRoute path="/patients/:patientId/consultations" exact component={Consultations} />

      <PrivateRoute path="/patients/:patientId/prescriptions" component={Prescriptions} />

      <PrivateRoute path="/patients/:patientId/appointments" component={PatientAppointment} />

      <PrivateRoute path="/patients/:patientId/records" component={MedicalRecords} />

      <PrivateRoute
        path="/patients/:patientId/consultations/case-notes/:rowId"
        component={CaseNotes}
      />

      <PrivateRoute path="/patients/:patientId/medications" component={Medications} />

      {/*  =====  DOCTORS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/hcps" component={Hcps} />

      <PrivateRoute exact path="/hcps/:hcpId" component={SingleHCP} />

      <PrivateRoute exact path="/hcps/:hcpId/profile" component={HcpProfile} />

      <PrivateRoute exact path="/hcps/:hcpId/profile/chat" component={HCPChat} />
      <PrivateRoute exact path="/hcps/:hcpId/verification" component={ViewDoctorVerification} />

      <PrivateRoute path="/hcps/:hcpId/appointments" component={HcpAppointments} />

      <PrivateRoute path="/hcps/:hcpId/availability" component={HcpAvailability} />

      <PrivateRoute path="/hcps/:hcpId/earnings" component={HcpEarnings} />

      <PrivateRoute path="/hcps/:hcpId/earnings" component={HcpEarnings} />

      <PrivateRoute path="/hcps/:hcpId/doctor-patients" component={HcpPatients} />

      <PrivateRoute exact path="/hcps/:hcpId/consultations" component={HcpConsultations} />

      <PrivateRoute path="/hcps/:hcpId/consultations/case-notes/:rowId" component={HcpCaseNote} />

      {/*  =====  PARTNERS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/partners" component={Partners} />

      {/*  =====  APPOINTMENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/appointments" component={Appointments} />

      <PrivateRoute exact path="/appointments/waiting-list" component={WaitingList} />

      <PrivateRoute path="/appointments/waiting-list/:listId" component={WaitingListDetails} />

      <PrivateRoute exact path="/appointments/consultation" component={CircularChart} />

      {/*  =====  MESSAGES ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/messages" component={Messages} />

      <PrivateRoute path="/messages/create-message" component={CreateMessage} />

      <PrivateRoute path="/messages/:messageId" component={ViewMessage} />

      {/*  =====  EMAILS ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/email/create-email" component={CreateEmail} />

      <PrivateRoute path="/email/:emailId" component={ViewMail} />

      <PrivateRoute path="/email" component={Email} />

      {/*  =====  DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/verification" component={HCP} />

      <PrivateRoute exact path="/verification" component={HCP} />

      {/*  =====  WHITE LABEL ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/label" component={WhiteLabel} />
      <PrivateRoute path="/label/provider" component={Providers} />

      <PrivateRoute path="/label/types" component={UserTypes} />

      {/*  =====  FINANCE ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/finance" component={Finance} />

      <PrivateRoute exact path="/finance/earnings" component={Financetable} />

      <PrivateRoute exact path="/finance/payouts" component={Payout} />
      <PrivateRoute exact path="/finance/pending" component={PendingPayout} />

      {/*  =====  REFERRALS ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/referrals/:referralId" component={ViewReferral} />

      <PrivateRoute path="/referrals" component={ReferralTab} />

      {/*  =====  SUBSCRIPTION ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/plans" component={Subscription} />

      {/*  =====  VIEW DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/verification/view/:viewId" exact component={ViewHCP} />
      <PrivateRoute
        exact
        path="/verification/view/:viewId/doctor/:id"
        component={DoctorVerificationProfile}
      />

      {/*  =====  SETTINGS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/settings" component={Settings} />

      <PrivateRoute path="/settings/administrator" component={Administrator} />

      <PrivateRoute path="/settings/permissions" component={Permission} />

      <PrivateRoute exact path="/settings/management" component={Management} />
      <PrivateRoute exact path="/settings/management/:editId" component={EditManagement} />
      <PrivateRoute exact path="/settings/list-management" component={ListManagment} />
      <PrivateRoute exact path="/settings/list-management/tests" component={TestList} />
    </Switch>
  );
  // }
};

export default Routes;
