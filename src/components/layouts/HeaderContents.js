import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Grid } from "@mui/material";
import HeaderProfile from "./HeaderProfile";
import { makeStyles } from "@mui/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { findAccounts } from "components/graphQL/useQuery";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useLazyQuery } from "@apollo/client";
import { getPatients, DoctorCount } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "center",
    // width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  text: {
    color: theme.palette.common.lightGrey,
    fontSize: "1.5rem",
    fontWeight: 300,
  },
  name: {
    fontSize: "2rem",
    fontWeight: 300,
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    // fontSize: "clamp(1.2rem, 1vw+1rem, 2.4rem )",
    fontSize: "clamp(1.5rem, 1.5vw, 2.25rem)",
    color: theme.palette.common.red,
    "&.MuiTypography-root": {
      marginRight: ".5rem",
    },
  },
  subtitle: {
    color: theme.palette.common.green,
    "&.MuiTypography-root": {
      fontSize: "clamp(0.6rem, 1vw + .5rem, 1.25rem)",
      marginLeft: ".5rem",
      alignSelf: "flex-end",
    },
  },
  customSubHeaderWrapper: {
    display: "flex",
    alignItems: "center",
  },
}));

const CustomHeaderText = ({ title, total, path, data }) => {
  const classes = useStyles();

  return (
    <Grid container flexDirection="column" justifyContent="center" rowGap={1}>
      <Grid item container flexWrap="nowrap" alignItems="center">
        <Link to={`/${path}`} className={classes.link}>
          <Typography variant="h3" classes={{ root: classes.title }}>
            {title}
          </Typography>
        </Link>
        <ArrowUpwardIcon color="success" />
      </Grid>
      <Grid item>
        <Typography variant="h5" className={classes.subtitle}>
          {total} total
        </Typography>
      </Grid>
    </Grid>
  );
};

CustomHeaderText.propTypes = {
  title: PropTypes.string,
  total: PropTypes.number,
  path: PropTypes.string,
  data: PropTypes.object,
};

const CustomHeaderTitle = ({ title, path }) => {
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      <Link to={`/${path}`} className={classes.link}>
        <Typography variant="h3" classes={{ root: classes.title }}>
          {title}
        </Typography>
      </Link>
    </div>
  );
};

CustomHeaderTitle.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string,
};

// SUBMENU HEADERS
const CustomSubHeaderText = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const {
    title,
    subTitle,
    subSubTitle,
    scopedSubTitle,
    scopedMenu,
    scopedSubMenu,
    titleColor = theme.palette.common.red,
  } = props;

  return (
    <div className={classes.customSubHeaderWrapper}>
      <Typography variant="h3" style={{ color: theme.palette.common.grey }}>
        {title}
      </Typography>
      <KeyboardArrowRightIcon
        style={{
          fontSize: "2rem",
          color: theme.palette.common.grey,
        }}
      />
      <Typography
        variant="h3"
        classes={{ root: classes.title }}
        style={{
          color: titleColor,
        }}
      >
        {subTitle}
      </Typography>
      {scopedMenu !== 0 && (
        <Fragment>
          <KeyboardArrowRightIcon style={{ fontSize: "2rem", color: theme.palette.common.grey }} />
          <Typography
            variant="h3"
            classes={{ root: classes.title }}
            style={{
              color: scopedSubMenu === 0 ? theme.palette.common.red : theme.palette.common.grey,
            }}
          >
            {subSubTitle}
          </Typography>
        </Fragment>
      )}

      {scopedSubMenu !== 0 && (
        <Fragment>
          <KeyboardArrowRightIcon style={{ fontSize: "2rem", color: theme.palette.common.grey }} />
          <Typography
            variant="h3"
            classes={{ root: classes.title }}
            style={{ color: theme.palette.common.red }}
          >
            {scopedSubTitle}
          </Typography>
        </Fragment>
      )}
    </div>
  );
};

CustomSubHeaderText.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  subSubTitle: PropTypes.string,
  scopedSubTitle: PropTypes.string,
  titleColor: PropTypes.string,
  scopedMenu: PropTypes.number,
  scopedSubMenu: PropTypes.number,
  data: PropTypes.object,
};

// HEADER DYNAMIC RENDERING COMPONENT
const HeaderText = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    doctorView,
    selectedAppointmentMenu,
    selectedManagementMenu,
    selectedScopedMenu,
  } = props;

  const theme = useTheme();
  const email = localStorage.getItem("email");
  const [profileAcc, setProfileAcc] = useState([]);
  const [profile, { data }] = useLazyQuery(findAccounts, {
    variables: { email },
  });
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      profile();
      if (data) {
        setProfileAcc(data.accounts.data[0]);
      }
    })();
  }, [profile, email, data]);
  const [patient, patientContent] = useLazyQuery(getPatients);
  const [doctor, doctorContent] = useLazyQuery(DoctorCount, { fetchPolicy: "cache-first" });
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    (async () => {
      patient();
      doctor();
      if (patientContent.data) setProfiles(patientContent.data.profiles.pageInfo.totalDocs);
    })();
  }, [doctor, patient, patientContent.data, doctorContent.data]);

  const { pathname } = useLocation();

  switch (selectedMenu) {
    case 0:
      return (
        <div>
          <Typography variant="h5" className={classes.text} gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="h3" color="primary" className={classes.name}>
            {profileAcc && profileAcc.role}
          </Typography>
        </div>
      );
    case 1:
      if (selectedSubMenu === 2) {
        return (
          <CustomSubHeaderText
            title="Patients"
            subTitle="Patient View"
            scopedMenu={selectedPatientMenu}
            scopedSubMenu={selectedScopedMenu}
            scopedSubTitle={
              selectedScopedMenu === 1
                ? "Consultation Details"
                : selectedScopedMenu === 3
                ? "Create Message"
                : ""
            }
            titleColor={
              selectedPatientMenu === 0 ? theme.palette.common.red : theme.palette.common.grey
            }
            subSubTitle={
              selectedPatientMenu === 1
                ? "Patient Profile"
                : selectedPatientMenu === 2
                ? "Appointments"
                : selectedPatientMenu === 3
                ? "Prescriptions"
                : selectedPatientMenu === 4
                ? "Medical Records"
                : selectedPatientMenu === 5
                ? "Consultations"
                : selectedPatientMenu === 6
                ? "Medications"
                : ""
            }
            selectedPatientMenu={selectedPatientMenu}
          />
        );
      }
      return (
        <CustomHeaderText
          title="Patients"
          total={patientContent.loading ? "Loading" : profiles}
          path="patients"
        />
      );
    case 2:
      if (selectedSubMenu === 3) {
        return (
          <CustomSubHeaderText
            scopedMenu={selectedHcpMenu}
            scopedSubMenu={selectedScopedMenu}
            subSubTitle={
              selectedHcpMenu === 1
                ? "Doctor Profile"
                : selectedHcpMenu === 2
                ? "Doctor Appointments"
                : selectedHcpMenu === 3
                ? "Availability"
                : selectedHcpMenu === 4
                ? "Earnings"
                : selectedHcpMenu === 5
                ? "Patients"
                : selectedHcpMenu === 6
                ? "Consultations"
                : selectedHcpMenu === 7
                ? "Doctor Verification"
                : "White Label"
            }
            scopedSubTitle={
              selectedScopedMenu === 2
                ? "Case Note"
                : selectedScopedMenu === 3
                ? "Create Message"
                : selectedScopedMenu === 4
                ? "Doctor Verification"
                : "ghgy"
            }
            title="Doctors"
            subTitle="Doctor View"
            titleColor={
              selectedHcpMenu === 0 ? theme.palette.common.red : theme.palette.common.grey
            }
          />
        );
      }
      return (
        <CustomHeaderText
          title="Doctors"
          total={doctorContent.data && doctorContent.data.DoctorCount}
          path="hcps"
        />
      );
    case 3:
      return <CustomHeaderText title="Partners" total={24} path="partners" />;

    case 4:
      if (selectedSubMenu === 5) {
        if (selectedAppointmentMenu === 1) {
          return (
            <CustomSubHeaderText
              title="Appointments"
              subTitle="Waiting List"
              subSubTitle={waitingListMenu === 1 ? "Details View" : ""}
              scopedMenu={waitingListMenu}
              scopedSubMenu={0}
            />
          );
        }
        return (
          <CustomSubHeaderText
            title="Appointments"
            subTitle="Consultation"
            scopedMenu={0}
            scopedSubMenu={0}
          />
        );
      }
      return <CustomHeaderTitle title="Appointments" path="appointments" />;
    case 5:
      if (selectedSubMenu === 6) {
        return (
          <CustomSubHeaderText
            title="Messages"
            scopedMenu={0}
            scopedSubMenu={0}
            subTitle={pathname === "/messages/create-message" ? "New Message" : "View Message"}
          />
        );
      }
      return <CustomHeaderTitle title="Messages" path="messages" />;
    case 6:
      return <CustomHeaderTitle title="Email" path="email" />;
    case 7:
      if (selectedSubMenu === 8) {
        return (
          <CustomSubHeaderText
            title="Doctor Verification"
            scopedMenu={doctorView}
            scopedSubMenu={0}
            subTitle="Doctor View"
            subSubTitle={doctorView === 1 ? "Doctor Profile" : ""}
            // subSubTitle={selectedManagementMenu === 1 ? "Edit Management" : ""}
          />
        );
      }
      return <CustomHeaderTitle title="Doctor Verification" path="verification" />;
    case 8:
      if (selectedSubMenu === 9) {
        return (
          <CustomSubHeaderText
            title="Finance"
            scopedMenu={0}
            scopedSubMenu={0}
            subTitle={pathname === "/finance/earnings" ? "Earnings Table" : "Payouts Table"}
          />
        );
      }
      return <CustomHeaderTitle title="Finance" path="finance" />;
    case 9:
      if (selectedSubMenu === 10) {
        return (
          <CustomSubHeaderText
            title="Referrals"
            subTitle="Referral View"
            scopedMenu={0}
            scopedSubMenu={0}
          />
        );
      }
      return <CustomHeaderTitle title="Referrals" path="referrals" />;
    case 10:
      return <CustomHeaderTitle title="Subscription Plans" path="plans" />;
    case 11:
      if (selectedSubMenu === 12) {
        return (
          <CustomSubHeaderText
            title="Settings"
            subTitle={pathname === "/settings/administrator" ? "Administrator" : "Management"}
            scopedSubMenu={0} // okay
            subSubTitle={selectedManagementMenu === 1 ? "Edit Management" : ""}
            scopedMenu={selectedManagementMenu}
            // scopedMenu={selectedManagementMenu}
            // scopedSubMenu={selectedManagementMenu}
          />
        );
      }
      return <CustomHeaderTitle title="Settings" path="settings" />;
    case 12:
      if (selectedSubMenu === 13) {
        return (
          <CustomSubHeaderText
            title="White Label"
            subTitle={pathname === "/label/provider" ? "Providers" : "User Types"}
            scopedMenu={0}
            scopedSubMenu={selectedScopedMenu}
            // scopedSubMenu={0}
          />
        );
      }
      return <CustomHeaderTitle title="White Label" path="label" />;
    default:
      return (
        <div>
          <Typography variant="h5" className={classes.text} gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="h3" color="primary" className={classes.name}>
            {profileAcc && profileAcc.role}
          </Typography>
        </div>
      );
  }
};

HeaderText.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  selectedManagementMenu: PropTypes.number,
  doctorView: PropTypes.number,
};

const HeaderContent = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
    data,
    selectedManagementMenu,
  } = props;

  return (
    <Grid
      container
      sx={{
        flex: 1,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
      }}
    >
      <HeaderText
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedHcpMenu={selectedHcpMenu}
        waitingListMenu={waitingListMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
        selectedScopedMenu={selectedScopedMenu}
        selectedManagementMenu={selectedManagementMenu}
      />
      <HeaderProfile data={data} />
    </Grid>
  );
};

HeaderContent.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  selectedManagementMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  data: PropTypes.object,
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func,
};

export default HeaderContent;
