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
  SingleHCP,
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
  HCP,
  Financetable
  

} from "components/pages";

const Routes = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
    setSelectedHcpMenu,
    waitingListMenu,
    setWaitingListMenu,
    selectedAppointmentMenu,
    setSelectedAppointmentMenu,
    chatMediaActive,
    setChatMediaActive,
    setSelectedManagementMenu,
    selectedScopedMenu,
    setSelectedScopedMenu,
    
  } = props;

  return (
    <Switch>
      <PrivateRoute
        path={["/", "/dashboard"]}
        exact
        component={Dashboard}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/patients"
        component={Patients}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId"
        component={SinglePatient}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile"
        component={PatientProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile/chat"
        component={Chat}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations"
        exact
        component={Consultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/prescriptions"
        component={Prescriptions}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/appointments"
        component={PatientAppointment}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/records"
        component={MedicalRecords}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations/case-note/:rowId"
        component={CaseNotes}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
      />

      <PrivateRoute
        path="/patients/:patientId/medications"
        component={Medications}
        selectedMenu={selectedMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/hcps"
        component={Hcps}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId"
        component={SingleHCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile"
        component={HcpProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        chatMediaActive={chatMediaActive}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile/chat"
        component={HCPChat}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/hcps/:hcpId/appointments"
        component={HcpAppointments}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/availability"
        component={HcpAvailability}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/patients"
        component={HcpPatients}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/consultations"
        component={HcpConsultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
      />

      <PrivateRoute
        path="/hcps/:hcpId/consultations/case-notes/:rowId"
        component={HcpCaseNote}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedScopedMenu={selectedScopedMenu}
        setSelectedScopedMenu={setSelectedScopedMenu}
      />

      <PrivateRoute exact path="/partners" component={Partners} />

      <PrivateRoute
        exact
        path="/appointments"
        component={Appointments}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
      />

      <PrivateRoute
        exact
        path="/appointments/waiting-list"
        component={WaitingList}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setWaitingListMenu={setWaitingListMenu}
        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
      />

      <PrivateRoute
        path="/appointments/waiting-list/:listId"
        component={WaitingListDetails}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        waitingListMenu={waitingListMenu}
        setSelectedAppointmentMenu={setSelectedAppointmentMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
        setWaitingListMenu={setWaitingListMenu}
      />

      <PrivateRoute exact path="/appointments/consultation" component={CircularChart} />

      <PrivateRoute
        exact
        path="/messages"
        component={Messages}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/messages/create-message"
        component={CreateMessage}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/messages/:messageId"
        component={ViewMessage}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
      <PrivateRoute
        path="/email/create-email"
        component={CreateEmail}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/email/:emailId"
        component={ViewMail}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/email"
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        component={Email}
      />
      {/* <PrivateRoute
        exact
        path="/verification"
        component={HCPVerification}
        setSelectedSubMenu={setSelectedSubMenu}
      /> */}

      <PrivateRoute
        exact
        path="/verification"
        component={HCP}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
      />
      <PrivateRoute
        exact
        path="/label"
        component={WhiteLabel}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
      <PrivateRoute
        path="/label/provider"
        component={Providers}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/label/types"
        component={UserTypes}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/finance"
        component={Finance}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/finance/earnings"
        component={Financetable}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/finance/payouts"
        component={Payout}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />
      <PrivateRoute
        exact
        path="/finance/pending"
        component={PendingPayout}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/referrals/:referralId"
        component={ViewReferral}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
      />

      <PrivateRoute
        path="/referrals"
        component={ReferralTab}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute path="/plans" component={Subscription} />

      <PrivateRoute
        path="/verification/view/:viewId"
        component={ViewHCP}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/settings"
        component={Settings}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/settings/administrator"
        component={Administrator}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/settings/permissions"
        component={Permission}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/settings/management"
        component={Management}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedManagementMenu={setSelectedManagementMenu}
      />
      <PrivateRoute
        exact
        path="/settings/management/:editId"
        component={EditManagement}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedManagementMenu={setSelectedManagementMenu}
      />
    </Switch>
  );
  // }
};

Routes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
  chatMediaActive: PropTypes.bool.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setWaitingListMenu: PropTypes.func.isRequired,
  setSelectedAppointmentMenu: PropTypes.func.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
  setSelectedScopedMenu: PropTypes.func.isRequired,
  setSelectedManagementMenu: PropTypes.func.isRequired,
};

export default Routes;
