import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import HeaderProfile from "./HeaderProfile";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Link } from "react-router-dom";

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
    "&.css-le8o0m-MuiTypography-root": {
      marginRight: ".5rem",
    },
  },
  subtitle: {
    color: theme.palette.common.green,
    "&.css-10ulodw-MuiTypography-root": {
      fontSize: "1.25rem",
      marginLeft: ".5rem",
      alignSelf: "flex-end",
    },
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

const HeaderText = ({ selectedMenu }) => {
  const classes = useStyles();

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
      return <CustomHeaderText title="Patients" total={24} path="patients" />;
    case 2:
      return <CustomHeaderText title="HCPs" total={352} path="hcps" />;
    case 3:
      return <CustomHeaderText title="Partners" total={24} path="partners" />;

    case 4:
      return <CustomHeaderTitle title="Appointments" path="appointments" />;
    case 5:
      return <CustomHeaderTitle title="Messages" path="messages" />;
    case 6:
      return <CustomHeaderTitle title="Email" path="email" />;
    case 7:
      return <CustomHeaderTitle title="HCP Verification" path="verification" />;
    case 8:
      return <CustomHeaderTitle title="Finance" path="finance" />;
    case 9:
      return <CustomHeaderTitle title="Referrals" path="referrals" />;
    case 10:
      return <CustomHeaderTitle title="Subscription Plans" path="plans" />;
    case 11:
      return <CustomHeaderTitle title="Settings" path="settings" />;
    // case 12:
    //   return <CustomHeaderTitle title="HCP Verification/ HCP View" />;
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
};

const HeaderContent = ({ selectedMenu }) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbar}>
      <HeaderText selectedMenu={selectedMenu} />
      <HeaderProfile />
    </Toolbar>
  );
};

HeaderContent.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
};

export default HeaderContent;
