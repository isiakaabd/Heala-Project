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
  const {
    selectedMenu,
    setSelectedMenu,
    chatMediaActive,
    setChatMediaActive,
    /* selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
    setSelectedHcpMenu,
    waitingListMenu,
    setWaitingListMenu,
    selectedAppointmentMenu,
    setSelectedAppointmentMenu,
    doctorView,
    setDoctorView,
    setSelectedManagementMenu,
    selectedScopedMenu,
    setSelectedScopedMenu, */
  } = props;

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
      <PrivateRoute
        exact
        path="/patients"
        component={Patients}
        /* setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu} */
      />

      <PrivateRoute
        exact
        path="/patients/:patientId"
        component={SinglePatient}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile"
        component={PatientProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile/chat"
        component={Chat}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations"
        exact
        component={Consultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedPatientMenu={selectedPatientMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
      />

      <PrivateRoute
        path="/patients/:patientId/prescriptions"
        component={Prescriptions}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu} */
      />

      <PrivateRoute
        path="/patients/:patientId/appointments"
        component={PatientAppointment}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu} */
      />

      <PrivateRoute
        path="/patients/:patientId/records"
        component={MedicalRecords}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu} */
      />

      <PrivateRoute
        path="/patients/:patientId/consultations/case-notes/:rowId"
        component={CaseNotes}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
      />

      <PrivateRoute
        path="/patients/:patientId/medications"
        component={Medications}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedPatientMenu={selectedPatientMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      {/*  =====  DOCTORS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/hcps"
        component={Hcps}
        /* setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId"
        component={SingleHCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile"
        component={HcpProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile/chat"
        component={HCPChat}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />
      <PrivateRoute
        exact
        path="/hcps/:hcpId/verification"
        component={ViewDoctorVerification}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/hcps/:hcpId/appointments"
        component={HcpAppointments}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/hcps/:hcpId/availability"
        component={HcpAvailability}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/hcps/:hcpId/doctor-patients"
        component={HcpPatients}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/consultations"
        component={HcpConsultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
      />

      <PrivateRoute
        path="/hcps/:hcpId/consultations/case-notes/:rowId"
        component={HcpCaseNote}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu} */
      />

      {/*  =====  PARTNERS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/partners" component={Partners} />

      {/*  =====  APPOINTMENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/appointments"
        component={Appointments}
        /* setSelectedSubMenu={setSelectedSubMenu}
        setSelectedAppointmentMenu={setSelectedAppointmentMenu} */
      />

      <PrivateRoute
        exact
        path="/appointments/waiting-list"
        component={WaitingList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setWaitingListMenu={setWaitingListMenu}
        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
        selectedAppointmentMenu={selectedAppointmentMenu} */
      />

      <PrivateRoute
        path="/appointments/waiting-list/:listId"
        component={WaitingListDetails}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        waitingListMenu={waitingListMenu}
        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
        setWaitingListMenu={setWaitingListMenu} */
      />

      <PrivateRoute
        exact
        path="/appointments/consultation"
        component={CircularChart}
      />

      {/*  =====  MESSAGES ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/messages"
        component={Messages}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/messages/create-message"
        component={CreateMessage}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/messages/:messageId"
        component={ViewMessage}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      {/*  =====  EMAILS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/email/create-email"
        component={CreateEmail}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/email/:emailId"
        component={ViewMail}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/email"
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
        component={Email}
      />

      {/*  =====  DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/verification"
        component={HCP}
        /* setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/verification"
        component={HCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu} */
      />

      {/*  =====  WHITE LABEL ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/label"
        component={WhiteLabel}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />
      <PrivateRoute
        path="/label/provider"
        component={Providers}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/label/types"
        component={UserTypes}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
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
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/finance/payouts"
        component={Payout}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />
      <PrivateRoute
        exact
        path="/finance/pending"
        component={PendingPayout}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      {/*  =====  REFERRALS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/referrals/:referralId"
        component={ViewReferral}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu} */
      />

      <PrivateRoute
        path="/referrals"
        component={ReferralTab}
        /* setSelectedSubMenu={setSelectedSubMenu} */
      />

      {/*  =====  SUBSCRIPTION ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/plans" component={Subscription} />

      {/*  =====  VIEW DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/verification/view/:viewId"
        exact
        component={ViewHCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* setSelectedSubMenu={setSelectedSubMenu}
        setDoctorView={setDoctorView}
        doctorView={doctorView}
        selectedSubMenu={selectedSubMenu} */
      />
      <PrivateRoute
        exact
        path="/verification/view/:viewId/doctor/:id" ///verification/view/${viewId}/doctor
        component={DoctorVerificationProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* setDoctorView={setDoctorView}
        doctorView={doctorView}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu} */
      />

      {/*  =====  SETTINGS ROUTES STARTS HERE ===== */}
      <PrivateRoute
        exact
        path="/settings"
        component={Settings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/settings/administrator"
        component={Administrator}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        path="/settings/permissions"
        component={Permission}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu} */
      />

      <PrivateRoute
        exact
        path="/settings/management"
        component={Management}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedManagementMenu={setSelectedManagementMenu} */
      />
      <PrivateRoute
        exact
        path="/settings/management/:editId"
        component={EditManagement}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedManagementMenu={setSelectedManagementMenu} */
      />
      <PrivateRoute
        exact
        path="/settings/list-management"
        component={ListManagment}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedManagementMenu={setSelectedManagementMenu} */
      />
      <PrivateRoute
        exact
        path="/settings/list-management/tests"
        component={TestList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        /* setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedManagementMenu={setSelectedManagementMenu} */
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
  /* doctorView: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func,
  setSelectedPatientMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func,
  setWaitingListMenu: PropTypes.func,
  setDoctorView: PropTypes.func,
  setSelectedAppointmentMenu: PropTypes.func,
  setSelectedScopedMenu: PropTypes.func,
  setSelectedManagementMenu: PropTypes.func, */
};

export default Routes;
