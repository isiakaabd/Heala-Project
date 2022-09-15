import React, { Fragment, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import HeaderProfile from "./HeaderProfile";
import { useLazyQuery } from "@apollo/client";
import { useTheme } from "@mui/material/styles";

import {
  Typography,
  Toolbar,
  Grid,
  ClickAwayListener,
  Paper,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { findAccounts } from "components/graphQL/useQuery";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getPatients, DoctorCount } from "components/graphQL/useQuery";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { patterns, predicateBreadcrumbFromUrl } from "helpers/breadcrumb";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    alignItems: "center",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontSize: "clamp(2rem, 1.2vw, 1.6rem)",
    fontWeight: 500,
    lineHeight: "2.5rem",
    color: "#2D2F39",
    letterSpacing: "-0.01em",
  },
  name: {
    fontSize: "clamp(1.5rem, 1.5vw, 2rem)", //clamp(1.5rem, 1.5vw, 2.25rem)
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
    fontSize: "clamp(1.5rem, 2vw, 2.25rem)",
    color: theme.palette.common.black,
    "&.MuiTypography-root": {
      marginRight: ".5rem",
    },
  },
  history: {
    "&.MuiTypography-root": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      color: "#3E5EA9",
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "20px",
    },
  },

  options: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    position: "absolute",
    top: 28,
    right: 5,
    zIndex: 1,

    "&>:last-child": {
      borderBottom: "none",
    },
  },

  btn: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1rem 2rem",
    fontSize: "14px",
    fontWeight: 400,
    color: "#2D2F39",
    border: "none",
    borderBottom: "1px solid #E5E5E5",
    textAlign: "left",
    whiteSpace: "nowrap",

    "&:hover": {
      color: "#ffffff",
      backgroundColor: theme.palette.common.blue,
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

const CustomHeaderText = ({ title, total, path }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      flex={1}
      flexDirection="column"
      justifyContent="center"
      rowGap={1}
    >
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

const CustomHeaderTitle = ({ title }) => {
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      {
        <Grid>
          <Typography variant="h3" classes={{ root: classes.title }}>
            {title}
          </Typography>
        </Grid>
      }
    </div>
  );
};

CustomHeaderTitle.propTypes = {
  title: PropTypes.string,
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
const HeaderText = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const email = localStorage.getItem("email");
  const [, setProfileAcc] = useState([]);
  const [docCount, setDocCount] = useState([]);
  const [patientCount, setPatientCount] = useState([]);

  const breadcrumbs = useMemo(
    () => predicateBreadcrumbFromUrl(patterns, pathname.substring(1)),
    [pathname]
  );

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

  switch (pathname) {
    case "/dashboard":
      return (
        <Typography className={classes.text} gutterBottom>
          Dashboard
        </Typography>
      );
    case "/":
      return (
        <Typography className={classes.text} gutterBottom>
          Dashboard
        </Typography>
      );
    default:
      return <Breadcrumb breadcrumbs={breadcrumbs} counts={counts} />;
  }
};

HeaderText.propTypes = {
  selectedMenu: PropTypes.number,
};

const HeaderContent = () => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <HeaderText />

      <HeaderProfile />
    </Toolbar>
  );
};

HeaderContent.propTypes = {};

const Crumb = ({ breadcrumbs }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const previousText = breadcrumbs[breadcrumbs.length - 2].pageTitle;
  const previousIndex = breadcrumbs[breadcrumbs.length - 2].pageIndex;

  const handleClickAway = () => {
    setIsOpen(false);
  };

  return (
    <Grid container alignItems="center" sx={{ position: "relative" }}>
      <Grid item>
        <Grid
          container
          alignItems="center"
          onClick={() => history.go(previousIndex)}
          sx={{ cursor: "pointer" }}
        >
          <ArrowBackIcon
            fontSize="small"
            sx={{ marginRight: "0.5rem", color: "#3E5EA9" }}
          />{" "}
          <Typography variant="p" classes={{ root: classes.history }}>
            Back to {previousText}{" "}
          </Typography>
        </Grid>
      </Grid>
      {breadcrumbs.length > 2 ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Grid
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "0.5rem",
              cursor: "pointer",
            }}
          >
            <KeyboardArrowDownIcon
              fontSize="medium"
              sx={{ color: "#3E5EA9" }}
            />
          </Grid>
        </ClickAwayListener>
      ) : null}
      {isOpen && (
        <Paper className={classes.options}>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const borderRadius =
              index === breadcrumbs.length - 2
                ? "0px 0px 8px 8px"
                : index === 0
                  ? "8px 8px 0px 0px"
                  : "";
            if (isLast) {
              return null;
            } else {
              return (
                <button
                  key={index}
                  className={classes.btn}
                  style={{ borderRadius: borderRadius }}
                  onClick={() => history.go(crumb.pageIndex)}
                >
                  {crumb.pageTitle}
                </button>
              );
            }
          })}
        </Paper>
      )}
    </Grid>
  );
};

const Breadcrumb = ({ breadcrumbs = [], counts = {} }) => {
  const classes = useStyles();
  const text = breadcrumbs[breadcrumbs.length - 1]?.pageTitle || "";

  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      {breadcrumbs.length < 2 ? (
        <Grid container alignContent="center">
          <Grid item>
            <CustomHeaderTitle title={text} />
          </Grid>
          {counts[text] && (
            <Grid
              item
              sx={{ marginLeft: "0.5rem", display: "flex" }}
              alignContent="center"
            >
              <Grid container alignContent="center">
                <ArrowUpwardIcon color="success" />
                <Typography variant="h2" className={classes.subtitle}>
                  {counts[text]} total
                </Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <Grid>
          <Crumb breadcrumbs={breadcrumbs} />
          <CustomHeaderTitle title={text} />
        </Grid>
      )}
    </Grid>
  );
};

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array,
  counts: PropTypes.object,
};

export default HeaderContent;
