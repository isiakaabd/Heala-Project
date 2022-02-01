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
import HcpConsultation from "components/pages/HcpConsultations";
import HcpCaseNote from "components/pages/HcpCaseNote";
import Dashboard from "components/pages/Dashboard";
import PatientProfile from "components/pages/PatientProfile";
import Consultations from "components/pages/Consultations";
import PatientAppointments from "components/pages/PatientAppointment";
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
import CreateEmail from "components/pages/CreateEmail";
import ViewMail from "components/pages/ViewMail";
import PendingPayout from "components/pages/PendingPayout";
import CircularChart from "components/Utilities/CircularChart";
import WhiteLabel from "components/pages/WhiteLabel";
import Providers from "components/pages/Providers";
import UserTypes from "components/pages/UserTypes";
import EditManagement from "components/pages/EditManagement";
// import { useSelector } from "react-redux";
// import { useActions } from "components/hooks/useActions";
// import { UserProfile } from "components/graphQL/useQuery";

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
  // const { id } = useSelector((state) => state.auth);
  // const { data, loading, error } = UserProfile(id);
  // const { refreshAuth, userDetail } = useActions();

  // useEffect(() => {
  //   if (data) {
  //     userDetail(data.account);
  //   }
  // }, [data]);
  // if (loading) return <div>Loading</div>;
  // else {
  return (
    <Switch>
      {/* <Route path="/dashboard" exact render={() => <h1>Hello World</h1>} /> */}
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
        component={PatientAppointments}
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
        path="/hcps/:hcpId/profile/chat"
        component={Chat}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/hcps/:hcpId/profile/call"
        component={PhoneCall}
        chatMediaActive={chatMediaActive}
        setChatMediaActive={setChatMediaActive}
      />

      <PrivateRoute
        path="/hcps/:hcpId/profile/video"
        component={VideoCall}
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
        component={HcpConsultation}
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
