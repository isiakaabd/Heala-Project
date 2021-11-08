import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import HeaderProfile from "./HeaderProfile";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
// import { GetUserInfo } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "center",
    width: "100%",
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
    fontSize: "2.4rem",
    color: theme.palette.common.red,
    "&.MuiTypography-root": {
      marginRight: ".5rem",
    },
  },
  subtitle: {
    color: theme.palette.common.green,
    "&.MuiTypography-root": {
      fontSize: "1.25rem",
      marginLeft: ".5rem",
      alignSelf: "flex-end",
    },
  },
  customSubHeaderWrapper: {
    display: "flex",
    alignItems: "center",
  },
}));

const CustomHeaderText = ({ title, total, path }) => {
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      <Link to={`/${path}`} className={classes.link}>
        <Typography variant="h3" classes={{ root: classes.title }}>
          {title}
        </Typography>
      </Link>
      <ArrowUpwardIcon color="success" />
      <Typography variant="h5" className={classes.subtitle}>
        {total} total
      </Typography>
    </div>
  );
};

CustomHeaderText.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
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
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
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
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  subSubTitle: PropTypes.string,
  scopedSubTitle: PropTypes.string,
  titleColor: PropTypes.string,
  scopedMenu: PropTypes.number.isRequired,
  scopedSubMenu: PropTypes.number.isRequired,
};

// HEADER DYNAMIC RENDERING COMPONENT
const HeaderText = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
  } = props;

  // const id = "6188339f772751001a780b71";

  // const userId = localStorage.getItem("userId");
  // const { data, error, loading } = useQuery(UserInfo, {
  //   variable: {
  //     id: id,
  //   },
  // });
  // const data = GetUserInfo(userId);
  // console.log(data);

  const classes = useStyles();
  const theme = useTheme();
  // console.log(data);
  const { pathname } = useLocation();

  switch (selectedMenu) {
    case 0:
      return (
        <div>
          <Typography variant="h5" className={classes.text} gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="h3" color="primary" className={classes.name}>
            Emmanuel Chukwu
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
            scopedSubTitle={selectedScopedMenu === 1 ? "Case Note" : ""}
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
      return <CustomHeaderText title="Patients" total={24} path="patients" />;
    case 2:
      if (selectedSubMenu === 3) {
        return (
          <CustomSubHeaderText
            scopedMenu={selectedHcpMenu}
            scopedSubMenu={selectedScopedMenu}
            scopedSubTitle={selectedScopedMenu === 2 ? "Case Note" : ""}
            subSubTitle={
              selectedHcpMenu === 1
                ? "HCP Profile"
                : selectedHcpMenu === 2
                ? "HCP Appointments"
                : selectedHcpMenu === 3
                ? "Availability"
                : selectedHcpMenu === 4
                ? "Earnings"
                : selectedHcpMenu === 5
                ? "Patients"
                : selectedHcpMenu === 6
                ? "Consultations"
                : ""
            }
            title="HCPs"
            subTitle="HCP View"
            titleColor={
              selectedHcpMenu === 0 ? theme.palette.common.red : theme.palette.common.grey
            }
          />
        );
      }
      return <CustomHeaderText title="HCPs" total={352} path="hcps" />;
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
            title="HCP Verification"
            scopedMenu={0}
            scopedSubMenu={0}
            subTitle="HCP View"
          />
        );
      }
      return <CustomHeaderTitle title="HCP Verification" path="verification" />;
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
            scopedMenu={0}
            scopedSubMenu={0}
          />
        );
      }
      return <CustomHeaderTitle title="Settings" path="settings" />;
    default:
      return (
        <div>
          <Typography variant="h5" className={classes.text} gutterBottom>
            Welcome,
          </Typography>
          <Typography variant="h3" color="primary" className={classes.name}>
            Emmanuel Chukwu
          </Typography>
        </div>
      );
  }
};

HeaderText.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
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
  } = props;
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <HeaderText
        selectedMenu={selectedMenu}
        selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedHcpMenu={selectedHcpMenu}
        waitingListMenu={waitingListMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
        selectedScopedMenu={selectedScopedMenu}
      />
      <HeaderProfile />
    </Toolbar>
  );
};

HeaderContent.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  waitingListMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
};

export default HeaderContent;
