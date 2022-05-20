import React from "react";
import PropTypes from "prop-types";
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

const Routes = (props) => {
  const { selectedMenu, setSelectedMenu, chatMediaActive, setChatMediaActive } = props;

  return (
    <Switch>
      {/*  =====  DASHBORD ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path={["/", "/dashboard"]}
        exact
        component={Dashboard}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      {/*  =====  PATENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/patients" component={Patients} />

      <PrivateRoute
        exact
        path="/patients/:patientId"
        component={SinglePatient}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile"
        component={PatientProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile/chat"
        component={Chat}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations"
        exact
        component={Consultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/prescriptions"
        component={Prescriptions}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/appointments"
        component={PatientAppointment}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/records"
        component={MedicalRecords}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations/case-notes/:rowId"
        component={CaseNotes}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/medications"
        component={Medications}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  DOCTORS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/hcps" component={Hcps} />

      <PrivateRoute
        exact
        path="/hcps/:hcpId"
        component={SingleHCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile"
        component={HcpProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile/chat"
        component={HCPChat}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />
      <PrivateRoute
        exact
        path="/hcps/:hcpId/verification"
        component={ViewDoctorVerification}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/hcps/:hcpId/appointments"
        component={HcpAppointments}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/availability"
        component={HcpAvailability}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/doctor-patients"
        component={HcpPatients}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/consultations"
        component={HcpConsultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/consultations/case-notes/:rowId"
        component={HcpCaseNote}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  PARTNERS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/partners" component={Partners} />

      {/*  =====  APPOINTMENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/appointments" component={Appointments} />

      <PrivateRoute
        exact
        path="/appointments/waiting-list"
        component={WaitingList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/appointments/waiting-list/:listId"
        component={WaitingListDetails}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute exact path="/appointments/consultation" component={CircularChart} />

      {/*  =====  MESSAGES ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/messages"
        component={Messages}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/messages/create-message"
        component={CreateMessage}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/messages/:messageId"
        component={ViewMessage}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  EMAILS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/email/create-email"
        component={CreateEmail}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/email/:emailId"
        component={ViewMail}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/email"
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        component={Email}
      />

      {/*  =====  DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/verification" component={HCP} />

      <PrivateRoute
        exact
        path="/verification"
        component={HCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  WHITE LABEL ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/label"
        component={WhiteLabel}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        path="/label/provider"
        component={Providers}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/label/types"
        component={UserTypes}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  FINANCE ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/finance"
        component={Finance}
        /* setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/finance/earnings"
        component={Financetable}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        exact
        path="/finance/payouts"
        component={Payout}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        exact
        path="/finance/pending"
        component={PendingPayout}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  REFERRALS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/referrals/:referralId"
        component={ViewReferral}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute path="/referrals" component={ReferralTab} />

      {/*  =====  SUBSCRIPTION ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/plans" component={Subscription} />

      {/*  =====  VIEW DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/verification/view/:viewId"
        exact
        component={ViewHCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        exact
        path="/verification/view/:viewId/doctor/:id" ///verification/view/${viewId}/doctor
        component={DoctorVerificationProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      {/*  =====  SETTINGS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/settings"
        component={Settings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/settings/administrator"
        component={Administrator}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        path="/settings/permissions"
        component={Permission}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />

      <PrivateRoute
        exact
        path="/settings/management"
        component={Management}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        exact
        path="/settings/management/:editId"
        component={EditManagement}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        exact
        path="/settings/list-management"
        component={ListManagment}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <PrivateRoute
        exact
        path="/settings/list-management/tests"
        component={TestList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
    </Switch>
  );
  // }
};

Routes.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
};

export default Routes;
