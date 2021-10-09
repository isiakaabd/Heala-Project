import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
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
  } = props;
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route
        exact
        path="/patients"
        render={(props) => (
          <Patients
            {...props}
            setSelectedSubMenu={setSelectedSubMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
          />
        )}
      />
      <Route
        exact
        path="/patients/:patientId"
        render={(props) => (
          <SinglePatient
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            selectedPatientMenu={selectedPatientMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        path="/patients/:patientId/profile"
        render={(props) => (
          <PatientProfile
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        path="/patients/:patientId/consultations"
        render={(props) => (
          <Consultations
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedPatientMenu={selectedPatientMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
          />
        )}
      />
      <Route
        path="/patients/:patientId/prescriptions"
        render={(props) => (
          <Prescriptions
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
            selectedPatientMenu={selectedPatientMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
          />
        )}
      />

      <Route
        path="/patients/:patientId/records"
        render={(props) => (
          <MedicalRecords
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            selectedPatientMenu={selectedPatientMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
          />
        )}
      />

      <Route
        path="/patients/:patientId/case-notes"
        render={(props) => (
          <CaseNotes
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
            selectedPatientMenu={selectedPatientMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
          />
        )}
      />
      <Route
        path="/patients/:patientId/medications"
        render={(props) => (
          <Medications
            {...props}
            selectedMenu={selectedMenu}
            selectedPatientMenu={selectedPatientMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedPatientMenu={setSelectedPatientMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps"
        render={(props) => (
          <Hcps
            {...props}
            setSelectedHcpMenu={setSelectedHcpMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId"
        render={(props) => (
          <SingleHCP
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedHcpMenu={selectedHcpMenu}
            setSelectedHcpMenu={setSelectedHcpMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/profile"
        render={(props) => (
          <HcpProfile
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedHcpMenu={selectedHcpMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedHcpMenu={setSelectedHcpMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
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
            selectedHcpMenu={selectedHcpMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedHcpMenu={setSelectedHcpMenu}
            setSelectedSubMenu={setSelectedSubMenu}
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
            selectedHcpMenu={selectedHcpMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedHcpMenu={setSelectedHcpMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/earnings"
        render={(props) => (
          <HcpEarnings
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedHcpMenu={selectedHcpMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedHcpMenu={setSelectedHcpMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/hcps/:hcpId/patients"
        render={(props) => (
          <HcpPatients
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedHcpMenu={selectedHcpMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedHcpMenu={setSelectedHcpMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route exact path="/partners" component={Partners} />
      <Route path="/partners" render={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>} />
      <Route
        exact
        path="/appointments"
        render={(props) => <Appointments setSelectedSubMenu={setSelectedSubMenu} />}
      />
      <Route exact path="/appointments/consultation" render={() => <h1>Consultation</h1>} />
      <Route
        path="/appointments/waiting-list"
        render={(props) => (
          <WaitingList
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/messages"
        render={(props) => (
          <Messages
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        path="/messages/create-message"
        render={(props) => (
          <CreateMessage
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        path="/messages/:messageId"
        render={(props) => (
          <ViewMessage
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route path="/email" component={Email} />
      <Route
        path="/verification"
        render={(props) => <HCPVerification {...props} setSelectedSubMenu={setSelectedSubMenu} />}
      />
      <Route
        exact
        path="/finance/earnings"
        render={(props) => (
          <Earnings
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        exact
        path="/finance/payouts"
        render={(props) => (
          <Payout
            {...props}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route
        path="/finance"
        exact
        render={(props) => <Finance {...props} setSelectedSubMenu={setSelectedSubMenu} />}
      />
      <Route path="/view-referral" component={ViewReferral} />

      <Route path="/referrals" component={ReferralTab} />
      <Route path="/plans" component={Subscription} />
      <Route
        path="/view"
        render={(props) => (
          <ViewHCP
            {...props}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
            selectedSubMenu={selectedSubMenu}
          />
        )}
      />
      {/* <Route path="/settings" render={() => <h3 style={{ fontSize: "3rem" }}>Settings</h3>} /> */}
      <Route
        exact
        path="/settings"
        render={(props) => <Settings {...props} setSelectedSubMenu={setSelectedSubMenu} />}
      />
      <Route
        exact
        path="/settings/administrator"
        render={(props) => (
          <Administrator
            {...props}
            selectedMenu={selectedMenu}
            selectedSubMenu={selectedSubMenu}
            setSelectedMenu={setSelectedMenu}
            setSelectedSubMenu={setSelectedSubMenu}
          />
        )}
      />
      <Route exact path="/settings/management" component={Management} />
    </Switch>
  );
};

Routes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default Routes;
