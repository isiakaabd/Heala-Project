import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "components/routes/PrivateRoute";
import { CircularChart } from "components/Utilities";
import {
  ViewHCP,
  Chat,
  Patients,
  Subscription,
  DoctorPayout,
  Hcps,
  ViewDoctorVerification,
  SingleHCP,
  DoctorVerificationProfile,
  Appointments,
  DoctorEarning,
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
  Heala,
  CreateMessage,
  Messages,
  Illness,
  Hm,
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
  EditManagement,
  PendingPayout,
  WhiteLabel,
  UserTypes,
  Providers,
  Financetable,
} from "components/pages";
import Hmo from "components/pages/Hmo";
import TestList from "components/pages/TestList";
import ListManagment from "components/pages/ListManagment";
import SubscriptionIncome from "components/pages/SubscriptionIncome";
import SingleHMO from "components/pages/SingleHMO";
import SubscriptionPlans from "components/pages/SubscriptionPlans";
import Hospitals from "components/pages/Hospitals";
import HealaPlans from "components/pages/HealaPlans";
import HmoPlans from "components/pages/HmoPlans";

const Routes = () => {
  return (
    <Switch>
      {/*  =====  DASHBORD ROUTES STARTS HERE ===== */}
      <PrivateRoute path={["/", "/dashboard"]} exact component={Dashboard} />

      {/*  =====  PATENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/patients" component={Patients} />

      <PrivateRoute
        exact
        path="/patients/:patientId"
        component={SinglePatient}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile"
        component={PatientProfile}
      />

      <PrivateRoute
        exact
        path="/patients/:patientId/profile/chat"
        component={Chat}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations"
        exact
        component={Consultations}
      />

      <PrivateRoute
        path="/patients/:patientId/prescriptions"
        component={Prescriptions}
      />

      <PrivateRoute
        path="/patients/:patientId/appointments"
        component={PatientAppointment}
      />

      <PrivateRoute
        path="/patients/:patientId/records"
        component={MedicalRecords}
      />

      <PrivateRoute
        path="/patients/:patientId/consultations/case-notes/:rowId"
        component={CaseNotes}
      />

      <PrivateRoute
        path="/patients/:patientId/medications"
        component={Medications}
      />

      {/*  =====  Heala ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/heala" component={Heala} />
      <PrivateRoute exact path="/hmos" component={Hm} />
      <PrivateRoute exact path="/user-type" component={UserTypes} />
      {/*  =====  DOCTORS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/hcps" component={Hcps} />

      <PrivateRoute exact path="/hcps/:hcpId" component={SingleHCP} />

      <PrivateRoute exact path="/hcps/:hcpId/profile" component={HcpProfile} />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/profile/chat"
        component={HCPChat}
      />
      <PrivateRoute
        exact
        path="/hcps/:hcpId/verification"
        component={ViewDoctorVerification}
      />

      <PrivateRoute
        path="/hcps/:hcpId/appointments"
        component={HcpAppointments}
      />

      <PrivateRoute
        path="/hcps/:hcpId/availability"
        component={HcpAvailability}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/earnings/payout"
        component={DoctorPayout}
      />
      <PrivateRoute
        exact
        path="/hcps/:hcpId/earnings/earn"
        component={DoctorEarning}
      />
      <PrivateRoute
        exact
        path="/hcps/:hcpId/earnings"
        component={HcpEarnings}
      />

      <PrivateRoute
        path="/hcps/:hcpId/doctor-patients"
        component={HcpPatients}
      />

      <PrivateRoute
        exact
        path="/hcps/:hcpId/consultations"
        component={HcpConsultations}
      />

      <PrivateRoute
        path="/hcps/:hcpId/consultations/case-notes/:rowId"
        component={HcpCaseNote}
      />
      {/*  =====  PARTNERS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/partners" component={Partners} />

      {/*  =====  HMO ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/hmo" component={Hmo} />
      <PrivateRoute exact path="/hmo/:hmoId" component={SingleHMO} />

      {/*  =====  APPOINTMENTS ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/appointments" component={Appointments} />

      <PrivateRoute
        exact
        path="/appointments/waiting-list"
        component={WaitingList}
      />

      <PrivateRoute
        path="/appointments/waiting-list/:listId"
        component={WaitingListDetails}
      />

      <PrivateRoute
        exact
        path="/appointments/consultation"
        component={CircularChart}
      />

      {/*  =====  MESSAGES ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/messages" component={Messages} />

      <PrivateRoute path="/messages/create-message" component={CreateMessage} />

      <PrivateRoute path="/messages/:messageId" component={ViewMessage} />

      {/*  =====  EMAILS ROUTES STARTS HERE ===== */}

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
      <PrivateRoute
        exact
        path="/finance/sub-income"
        component={SubscriptionIncome}
      />

      {/*  =====  REFERRALS ROUTES STARTS HERE ===== */}
      <PrivateRoute path="/referrals/:referralId" component={ViewReferral} />

      <PrivateRoute path="/referrals" component={ReferralTab} />

      {/*  =====  SUBSCRIPTION ROUTES STARTS HERE ===== */}
      <PrivateRoute exact path="/plans" component={SubscriptionPlans} />
      <PrivateRoute exact path="/plans/heala-plans" component={HealaPlans} />
      <PrivateRoute exact path="/plans/hmo-plans" component={HmoPlans} />
      <PrivateRoute exact path="/plans/hospitals" component={Hospitals} />
      <PrivateRoute
        exact
        path="/plans/hospitals/:id"
        component={Subscription}
      />

      {/*  =====  VIEW DOCTORS VERIFICATION ROUTES STARTS HERE ===== */}
      <PrivateRoute
        path="/verification/view/:viewId"
        exact
        component={ViewHCP}
      />
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
      <PrivateRoute
        exact
        path="/settings/management/:editId"
        component={EditManagement}
      />
      <PrivateRoute
        exact
        path="/settings/list-management"
        component={ListManagment}
      />
      <PrivateRoute
        exact
        path="/settings/list-management/tests"
        component={TestList}
      />
      <PrivateRoute
        exact
        path="/settings/list-management/illness"
        component={Illness}
      />
    </Switch>
  );
  // }
};

export default Routes;
