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
      <PrivateRoute path="/dashboard" exact>
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute exact path="/patients">
        <Patients
          setSelectedSubMenu={setSelectedSubMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/patients/:patientId">
        <SinglePatient
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/patients/:patientId/profile">
        <PatientProfile
          {...props}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/patients/:patientId/consultations">
        <Consultations
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/patients/:patientId/prescriptions">
        <Prescriptions
          {...props}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/patients/:patientId/records">
        <MedicalRecords
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/patients/:patientId/case-notes">
        <CaseNotes
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          selectedPatientMenu={selectedPatientMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/patients/:patientId/medications">
        <Medications
          selectedMenu={selectedMenu}
          selectedPatientMenu={selectedPatientMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedPatientMenu={setSelectedPatientMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/hcps">
        <Hcps setSelectedHcpMenu={setSelectedHcpMenu} setSelectedSubMenu={setSelectedSubMenu} />
      </PrivateRoute>

      <PrivateRoute exact path="/hcps/:hcpId">
        <SingleHCP
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/hcps/:hcpId/profile">
        <HcpProfile
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/hcps/:hcpId/appointments">
        <HcpAppointments
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/hcps/:hcpId/availability">
        <HcpAvailability
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/hcps/:hcpId/earnings">
        <HcpEarnings
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/hcps/:hcpId/earnings">
        <HcpEarnings
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/hcps/:hcpId/patients">
        <HcpPatients
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedHcpMenu={selectedHcpMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/partners">
        <Partners />
      </PrivateRoute>

      <PrivateRoute path="/partners">
        <h3 style={{ fontSize: "3rem" }}>Partners</h3>
      </PrivateRoute>

      <PrivateRoute exact path="/appointments">
        <Appointments setSelectedSubMenu={setSelectedSubMenu} />
      </PrivateRoute>

      <PrivateRoute exact path="/appointments/consultation">
        <h1>Consultation</h1>
      </PrivateRoute>

      <PrivateRoute path="/appointments/waiting-list">
        <WaitingList
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/messages">
        <Messages
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/messages/create-message">
        <CreateMessage
          {...props}
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/messages/:messageId">
        <ViewMessage
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/email">
        <Email />
      </PrivateRoute>

      <PrivateRoute exact path="/verification">
        <HCPVerification setSelectedSubMenu={setSelectedSubMenu} />
      </PrivateRoute>
      <PrivateRoute exact path="/verification/view">
        <ViewHCP
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/finance">
        <Finance setSelectedSubMenu={setSelectedSubMenu} />
      </PrivateRoute>

      <PrivateRoute exact path="/finance/earnings">
        <Earnings
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          setSelectedHcpMenu={setSelectedHcpMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/finance/payouts">
        <Payout selectedSubMenu={selectedSubMenu} setSelectedSubMenu={setSelectedSubMenu} />
      </PrivateRoute>

      <PrivateRoute path="/view-referral">
        <ViewReferral />
      </PrivateRoute>

      <PrivateRoute path="/referrals">
        <ReferralTab />
      </PrivateRoute>

      <PrivateRoute path="/plans">
        <Subscription />
      </PrivateRoute>

      <PrivateRoute path="/verification/view">
        <ViewHCP
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
          selectedSubMenu={selectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute exact path="/settings">
        <Settings
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/settings/administrator">
        <Administrator
          selectedMenu={selectedMenu}
          selectedSubMenu={selectedSubMenu}
          setSelectedMenu={setSelectedMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
      </PrivateRoute>

      <PrivateRoute path="/settings/management">
        <Management />
      </PrivateRoute>
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
