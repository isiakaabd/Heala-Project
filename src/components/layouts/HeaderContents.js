import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Typography, Toolbar, Grid } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link, useLocation, useHistory } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import HeaderProfile from "./HeaderProfile";
import { findAccounts } from "components/graphQL/useQuery";
import { getPatients, DoctorCount } from "components/graphQL/useQuery";
import { patterns, predicateBreadcrumbFromUrl } from "helpers/breadcrumb";
import { propTypes } from "react-bootstrap/esm/Image";

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

const CustomHeaderText = ({ title, total, path, data }) => {
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
  title: PropTypes.string,
  total: PropTypes.number,
  path: PropTypes.string,
  data: PropTypes.object,
};

const CustomHeaderTitle = ({ title, path, onClick = null, variant }) => {
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      {!onClick ? (
        <Link to={`/${path}`} className={classes.link}>
          <Typography>{title}</Typography>
        </Link>
      ) : (
        <Typography
          sx={{
            cursor: "pointer",
          }}
          onClick={onClick}
          variant={variant}
        >
          {title}
        </Typography>
      )}
    </div>
  );
};

CustomHeaderTitle.propTypes = {
  onClick: propTypes.func,
  title: PropTypes.string,
  path: PropTypes.string,
  variant: PropTypes.string,
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
          <KeyboardArrowRightIcon
            style={{ fontSize: "2rem", color: theme.palette.common.grey }}
          />
          <Typography
            variant="h3"
            classes={{ root: classes.title }}
            style={{
              color:
                scopedSubMenu === 0
                  ? theme.palette.common.red
                  : theme.palette.common.grey,
            }}
          >
            {subSubTitle}
          </Typography>
        </Fragment>
      )}

      {scopedSubMenu !== 0 && (
        <Fragment>
          <KeyboardArrowRightIcon
            style={{ fontSize: "2rem", color: theme.palette.common.grey }}
          />
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
  const { selectedMenu } = props;

  const classes = useStyles();
  const { pathname } = useLocation();
  const email = localStorage.getItem("email");
  const [profileAcc, setProfileAcc] = useState([]);
  const [docCount, setDocCount] = useState([]);
  const [patientCount, setPatientCount] = useState([]);

  const breadcrumbs = React.useMemo(() => {
    return predicateBreadcrumbFromUrl(patterns, pathname.substring(1));
  }, [pathname]);

  const [profile, { data }] = useLazyQuery(findAccounts, {
    variables: { email },
  });

  const [patient, patientContent] = useLazyQuery(getPatients);
  const [doctor, doctorContent] = useLazyQuery(DoctorCount, {
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    (async () => {
      profile();
      if (data) {
        setProfileAcc(data.accounts.data[0]);
      }
    })();
  }, [profile, email, data]);

  useEffect(() => {
    (async () => {
      patient();
      doctor();
      if (patientContent.data)
        setPatientCount(patientContent.data.profiles.pageInfo.totalDocs);
      if (doctorContent.data) setDocCount(doctorContent.data.DoctorCount);
    })();
  }, [doctor, patient, patientContent.data, doctorContent.data]);

  const counts = {
    Doctors: docCount,
    Patients: patientCount,
  };

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
    default:
      return <Breadcrumb breadcrumbs={breadcrumbs} counts={counts} />;
  }
};

HeaderText.propTypes = {
  selectedMenu: PropTypes.number,
  /* selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  selectedManagementMenu: PropTypes.number,
  doctorView: PropTypes.number, */
};

const HeaderContent = (props) => {
  const {
    selectedMenu,
    /* selectedSubMenu,
    selectedPatientMenu,
    selectedHcpMenu,
    waitingListMenu,
    selectedAppointmentMenu,
    selectedScopedMenu,
    selectedManagementMenu, */
    data,
  } = props;
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <HeaderText
        selectedMenu={selectedMenu}
        /* selectedSubMenu={selectedSubMenu}
        selectedPatientMenu={selectedPatientMenu}
        selectedHcpMenu={selectedHcpMenu}
        waitingListMenu={waitingListMenu}
        selectedAppointmentMenu={selectedAppointmentMenu}
        selectedScopedMenu={selectedScopedMenu}
        selectedManagementMenu={selectedManagementMenu} */
      />
      <HeaderProfile data={data} />
    </Toolbar>
  );
};

HeaderContent.propTypes = {
  selectedMenu: PropTypes.number,
  data: PropTypes.object,
  /* selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  selectedManagementMenu: PropTypes.number,
  waitingListMenu: PropTypes.number,
  selectedAppointmentMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number, */
};

const Breadcrumb = ({ breadcrumbs = [], counts = {} }) => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  // Patients Doctors

  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      {breadcrumbs.map((text, index) => {
        return (
          <>
            {breadcrumbs.length < 2 ? (
              <Grid container alignContent="center">
                <Grid item>
                  <CustomHeaderTitle
                    title={text}
                    variant="h2"
                    onClick={() => {
                      const page = index - (breadcrumbs.length - 1);
                      history.go(page);
                    }}
                  />
                </Grid>
                {counts[text] && (
                  <Grid
                    item
                    sx={{ marginLeft: "0.5rem", display: "flex" }}
                    alignContent="center"
                  >
                    <Grid container alignContent="center">
                      <ArrowUpwardIcon color="success" />
                      <Typography variant="h5" className={classes.subtitle}>
                        {counts[text]} total
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            ) : (
              <CustomHeaderTitle
                title={text}
                onClick={() => {
                  const page = index - (breadcrumbs.length - 1);
                  history.go(page);
                }}
              />
            )}
            ;
            {breadcrumbs.length > 0 && breadcrumbs.length - 1 > index ? (
              <KeyboardArrowRightIcon
                size={10}
                style={{
                  color: theme.palette.common.grey,
                }}
              />
            ) : null}
          </>
        );
      })}
    </Grid>
  );
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array,
  counts: PropTypes.object,
};

export default HeaderContent;
