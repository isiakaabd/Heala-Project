import React, { useEffect, useState } from "react";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";
import PropTypes from "prop-types";
import { Grid, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import PreviousButton from "components/Utilities/PreviousButton";
import { dateMoment } from "components/Utilities/Time";
import { useQuery } from "@apollo/client";
import { verification } from "components/graphQL/useQuery";
import displayPhoto from "assets/images/avatar.svg";

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
    "&:not(:last-of-type)": {
      marginBottom: "5rem",
    },
  },
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.3rem !important",
      //   height: "2.7rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: "1.5rem",
    },
  },

  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem 5rem",
    height: "14.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
  firstContainer: {
    width: "100%",
    height: "100%",
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },

  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: ".75rem",
    borderRadius: "1.5rem",
    textDecoration: "none",
  },

  linkIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
      marginLeft: "1.2rem",
    },
  },

  buttonsGridWrapper: {
    marginTop: "5rem !important",
    height: "16.1rem",
  },

  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      // marginRight: "2rem",
    },
  },
}));

const ViewHCP = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const { viewId } = useParams();
  const { loading, data, error } = useQuery(verification, { variables: { id: viewId } });
  const [respondData, setRespondData] = useState([]);

  useEffect(() => {
    if (data) {
      setRespondData(data.getVerification);
    }
  }, [data]);

  const classes = useStyles();
  useEffect(() => {
    setSelectedMenu(7);
    setSelectedSubMenu(8);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  // eslint-disable-next-line
  const {
    createdAt,
    qualification,
    license,
    alumni_association,
    reference,
    doctorData,
    // eslint-disable-next-line
  } = respondData;
  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <PreviousButton path="/verification" />
      </Grid>
      <Grid
        item
        flexWrap="nowrap"
        width="100%"
        justifyContent="space-between"
        container
        alignItems="center"
        className={`${classes.cardGrid} ${classes.firstContainer}`}
      >
        <Grid item container justifyContent="center" width="30%">
          <Grid item>
            <Avatar
              src={doctorData ? doctorData.picture : displayPhoto}
              sx={{ minWidth: "150px", minHeight: "150px" }}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" alignItems="center" gap={3} sx={{ height: "100%" }}>
          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <Grid container direction="column" gap={1}>
                <Grid item>
                  <Typography variant="body1">Doctor Name</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    {doctorData ? `${doctorData.firstName} ${doctorData.lastName}` : "No Doctor"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" gap={1}>
                <Grid item>
                  <Typography variant="body1">Hospital</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    {doctorData ? `${doctorData.hospital}` : "No Hospital "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" gap={1}>
                <Grid item>
                  <Typography variant="body1">Gender:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    {doctorData ? `${doctorData.gender} ` : "Not Specified"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-around">
            <Grid item>
              <Grid container direction="column" gap={1}>
                <Grid item>
                  <Typography variant="body1">Medical ID:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    {doctorData ? `${doctorData.dociId.split("-")[1]}` : "No ID "}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" gap={1}>
                <Grid item>
                  <Typography variant="body1">Specialization:</Typography>
                </Grid>
                <Grid item width="100%">
                  <Typography variant="h4">
                    {doctorData ? `${doctorData.specialization}` : "No specialization "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" gap={1} width="100%">
                <Grid item>
                  <Typography variant="body1">DOB:</Typography>
                </Grid>
                <Grid item width="100%">
                  <Typography variant="h4">
                    {doctorData ? `${dateMoment(doctorData.dob)}` : "No DOB "}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h4">Qualification</Typography>
            </Grid>
            <Grid item container gap={2}>
              <Grid className={classes.link}>
                {qualification ? qualification.degree : "No Value"}
              </Grid>
              <Grid className={classes.link}>
                {qualification
                  ? qualification.year && dateMoment(qualification.year).slice(-4)
                  : "No Value"}
              </Grid>
              {qualification ? (
                <a
                  href={qualification.image}
                  rel="noreferrer"
                  target="_blank"
                  className={classes.link}
                >
                  <span>Qualification PNG</span>
                </a>
              ) : (
                <p className={classes.link}> No QUalification</p>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h4">License</Typography>
            </Grid>
            {license ? (
              <Grid item container gap={2}>
                <Grid item>
                  <Typography className={classes.link} variant="h4">
                    {license ? license.number : "No Value"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.link} variant="h4">
                    {license ? license.type : "No Value"}
                  </Typography>
                </Grid>
                <Grid item>
                  <a href={license.image} rel="noreferrer" target="_blank" className={classes.link}>
                    <span>IMG</span>
                  </a>
                </Grid>
              </Grid>
            ) : (
              <Grid item>
                <Typography className={classes.link} variant="h4">
                  No License
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h4">Year Book</Typography>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="h4" className={classes.link}>
                  {createdAt && dateMoment(createdAt).slice(-4)}
                </Typography>
              </Grid>
              <Grid item>
                {qualification ? (
                  <a
                    href={qualification.image}
                    rel="noreferrer"
                    target="_blank"
                    className={classes.link}
                  >
                    <span>Qualification PNG</span>
                  </a>
                ) : (
                  <p className={classes.link}> No QUalification</p>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h4">Alumni</Typography>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                {alumni_association ? (
                  <a
                    href={alumni_association.image}
                    rel="noreferrer"
                    target="_blank"
                    className={classes.link}
                  >
                    <span>{alumni_association.facebook_group_name}</span>
                  </a>
                ) : (
                  <p className={classes.link}> No alumni association</p>
                )}
              </Grid>
              <Grid item>
                {alumni_association ? (
                  <a
                    href={alumni_association.image}
                    rel="noreferrer"
                    target="_blank"
                    className={classes.link}
                  >
                    <span>{alumni_association.instagram_handle}</span>
                  </a>
                ) : (
                  <p className={classes.link}> No alumni association</p>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
        <Grid item md style={{ marginRight: " 2rem" }} className={classes.cardGrid}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="h4">Reference ID</Typography>
            </Grid>
            <Grid item container gap={2}>
              <Grid item>
                <Typography variant="h4" className={classes.link}>
                  {reference ? reference.reference_code : "No Reference"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          md
          style={{ marginLeft: "2rem", display: "hidden" }}
          className={classes.cardGrid}
        ></Grid>
      </Grid>
    </Grid>
  );
};

ViewHCP.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ViewHCP;
