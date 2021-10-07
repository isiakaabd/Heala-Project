import React from "react";
import { Switch, Route } from "react-router-dom";
import HCPVerification from "components/pages/HCP";
import ViewHCP from "components/pages/ViewHCP";
import Finance from "components/pages/Financetable";
import Appointments from "components/pages/Appointments";
import Patients from "components/pages/Patients";
import Hcps from "components/pages/Hcps";
import Dashboard from "components/pages/Dashboard";
import PatientProfile from "components/pages/PatientProfile";
import Consultations from "components/pages/Consultations";
import Prescriptions from "components/pages/Prescriptions";
import MedicalRecords from "components/pages/MedicalRecords";
import CaseNotes from "components/pages/CaseNotes";
import Medications from "components/pages/Medications";
import SinglePatient from "components/pages/SinglePatient";
import PropTypes from "prop-types";
import Email from "components/pages/Email";
import MainFinanceTab from "components/pages/MainFinanceTab";
import Payout from "components/pages/Payout";
import ReferralTab from "components/pages/ReferralTab";
import Subscription from "components/pages/Subscription";
import ViewReferral from "components/pages/ViewReferral";
import Settings from "components/pages/Settings";
import Administrator from "components/pages/Administrator";
import Management from "components/pages/Management";

const Routes = ({ setSelectedMenu }) => {
  return (
    <Switch>
      <Route path={["/", "/dashboard"]} exact component={Dashboard} />
      <Route exact path="/patients" component={Patients} />
      <Route
        exact
        path="/patients/:patientId"
        render={(props) => <SinglePatient setSelectedMenu={setSelectedMenu} {...props} />}
      />
      <Route path="/patients/:patientId/profile" component={PatientProfile} />
      <Route path="/patients/:patientId/consultations" component={Consultations} />
      <Route path="/patients/:patientId/prescriptions" component={Prescriptions} />
      <Route path="/patients/:patientId/records" component={MedicalRecords} />
      <Route path="/patients/:patientId/case-notes" component={CaseNotes} />
      <Route path="/patients/:patientId/medications" component={Medications} />
      <Route exact path="/hcps" component={Hcps} />
      <Route path="/partners" render={() => <h3 style={{ fontSize: "3rem" }}>Partners</h3>} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/messages" render={() => <h3 style={{ fontSize: "3rem" }}>Messages</h3>} />
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
};

export default Routes;
