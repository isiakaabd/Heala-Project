import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import HCPVerification from "components/pages/HCP";
import ViewHCP from "components/pages/ViewHCP";
import Finance from "components/pages/Financetable";
import Appointments from "components/pages/Appointments";
import Patients from "components/pages/Patients";
import Hcps from "components/pages/Hcps";
import SingleHCP from "components/pages/SingleHCP";
import HcpProfile from "components/pages/HcpProfile";
import HcpAppointments from "components/pages/HcpAppointments";
import HcpPatients from "components/pages/HcpPatients";
import HcpAvailability from "components/pages/HcpAvailability";
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
import Messages from "components/pages/Messages";
import CreateMessage from "components/pages/CreateMessage";
import ViewMessage from "components/pages/ViewMessage";
import Email from "components/pages/Email";
import MainFinanceTab from "components/pages/MainFinanceTab";
import Payout from "components/pages/Payout";
import ReferralTab from "components/pages/ReferralTab";
import Subscription from "components/pages/Subscription";
import ViewReferral from "components/pages/ViewReferral";
import Settings from "components/pages/Settings";
import Administrator from "components/pages/Administrator";
import Management from "components/pages/Management";

const Routes = ({ selectedMenu, setSelectedMenu, setSelectedSubMenu }) => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route
        exact
        path="/patients"
        render={(props) => <Patients {...props} setSelectedSubMenu={setSelectedSubMenu} />}
      />
      <Route
        exact
        path="/patients/:patientId"
        render={(props) => (
          <SinglePatient selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} {...props} />
        )}
      />
      <Route path="/patients/:patientId/profile" component={PatientProfile} />
      <Route path="/patients/:patientId/consultations" component={Consultations} />
      <Route path="/patients/:patientId/prescriptions" component={Prescriptions} />
      <Route path="/patients/:patientId/records" component={MedicalRecords} />
      <Route path="/patients/:patientId/case-notes" component={CaseNotes} />
      <Route path="/patients/:patientId/medications" component={Medications} />
      <Route exact path="/hcps" component={Hcps} />
      <Route
        exact
        path="/hcps/:hcpId"
        render={(props) => (
          <SingleHCP {...props} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/profile"
        render={(props) => (
          <HcpProfile {...props} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/appointments"
        render={(props) => (
          <HcpAppointments
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/availability"
        render={(props) => (
          <HcpAvailability
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/patients"
        render={(props) => (
          <HcpPatients {...props} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        )}
      />
      <Route exact path="/partners" component={Partners} />
      <Route path="/partners" render={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>} />
      <Route exact path="/appointments" component={Appointments} />
      <Route
        path="/appointments/waiting-list"
        render={(props) => (
          <WaitingList {...props} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
        )}
      />
      <Route exact path="/messages" render={(props) => <Messages {...props} />} />
      <Route path="/messages/create-message" render={(props) => <CreateMessage {...props} />} />
      <Route path="/messages/:messageId" render={(props) => <ViewMessage {...props} />} />
      <Route path="/email" component={Email} />
      <Route path="/verification" component={HCPVerification} />
      <Route path="/finance" component={MainFinanceTab} />
      <Route path="/view-referral" component={ViewReferral} />
      <Route path="/earning" component={Finance} />
      <Route path="/payout" component={Payout} />
      <Route path="/referrals" component={ReferralTab} />
      <Route path="/plans" component={Subscription} />
      <Route path="/view" component={ViewHCP} />
      <Route exact path="/settings/administrator" component={Administrator} />
      <Route exact path="/settings/management" component={Management} />
      <Route path="/settings" component={Settings} />
    </Switch>
  );
};

Routes.propTypes = {
  setSelectedMenu: PropTypes.func.isRequired,
  selectedMenu: PropTypes.number.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Routes;
