import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import HCPVerification from "components/pages/HCP";
import ViewHCP from "components/pages/ViewHCP";
import Earnings from "components/pages/Financetable";
import Appointments from "components/pages/Appointments";
import Patients from "components/pages/Patients";
import Hcps from "components/pages/Hcps";
import SingleHCP from "components/pages/SingleHCP";
import HcpProfile from "components/pages/HcpProfile";
import HcpAppointments from "components/pages/HcpAppointments";
import HcpPatients from "components/pages/HcpPatients";
import HcpAvailability from "components/pages/HcpAvailability";
import HcpEarnings from "components/pages/HcpEarnings";
import Dashboard from "components/pages/Dashboard";
import PatientProfile from "components/pages/PatientProfile";
import Consultations from "components/pages/Consultations";
import Prescriptions from "components/pages/Prescriptions";
import MedicalRecords from "components/pages/MedicalRecords";
import CaseNotes from "components/pages/CaseNotes";
import Medications from "components/pages/Medications";
import SinglePatient from "components/pages/SinglePatient";
import Partners from "components/pages/Partners";
import WaitingList from "components/pages/WaitingList";
import WaitingListDetails from "components/pages/WaitingListDetails";
import Messages from "components/pages/Messages";
import CreateMessage from "components/pages/CreateMessage";
import ViewMessage from "components/pages/ViewMessage";
import Email from "components/pages/Email";
import Finance from "components/pages/Finance";
import Payout from "components/pages/Payout";
import ReferralTab from "components/pages/ReferralTab";
import Subscription from "components/pages/Subscription";
import ViewReferral from "components/pages/ViewReferral";
import Settings from "components/pages/Settings";
import Administrator from "components/pages/Administrator";
import Management from "components/pages/Management";
import Permission from "components/pages/Permission";
import Chat from "components/pages/Chat";
import PhoneCall from "components/pages/PhoneCall";
import VideoCall from "components/pages/VideoCall";

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
  } = props;
  return (
    <Switch>
      <PrivateRoute path="/dashboard" exact component={Dashboard} />

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
        path="/patients/:patientId/profile/chat"
        component={Chat}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/patients/:patientId/profile/call"
        component={PhoneCall}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/patients/:patientId/profile/video"
        component={VideoCall}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations"
        component={Consultations}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
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
        path="/patients/:patientId/case-notes"
        component={CaseNotes}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        setSelectedPatientMenu={setSelectedPatientMenu}
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
      />

      <PrivateRoute
        path="/hcps/:hcpId/profile"
        component={HcpProfile}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        selectedHcpMenu={selectedHcpMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
        setSelectedSubMenu={setSelectedSubMenu}
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

      <PrivateRoute exact path="/partners" component={Partners} />

      <PrivateRoute
        path="/partners"
        component={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>}
      />

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

      <PrivateRoute
        exact
        path="/appointments/consultation"
        component={() => <h1>Consultation</h1>}
      />

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

      <PrivateRoute path="/email" component={Email} />

      <PrivateRoute
        exact
        path="/verification"
        component={HCPVerification}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        exact
        path="/verification/view"
        component={ViewHCP}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        setSelectedHcpMenu={setSelectedHcpMenu}
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
        component={Earnings}
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
        path="/referrals/:referralId"
        component={ViewReferral}
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute
        path="/referrals"
        component={ReferralTab}
        setSelectedSubMenu={setSelectedSubMenu}
      />

      <PrivateRoute path="/plans" component={Subscription} />

      <PrivateRoute
        path="/verification/view"
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
        path="/settings/management"
        component={Management}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
        setSelectedSubMenu={setSelectedSubMenu}
        selectedSubMenu={selectedSubMenu}
      />
    </Switch>
  );
};

Routes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  chatMediaActive: PropTypes.bool.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setWaitingListMenu: PropTypes.func.isRequired,
  setSelectedAppointmentMenu: PropTypes.func.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default Routes;
