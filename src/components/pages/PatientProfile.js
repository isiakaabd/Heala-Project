import React, { useState, useEffect, useLayoutEffect } from "react";
import Loader from "components/Utilities/Loader";
import Modals from "components/Utilities/Modal";
import PropTypes from "prop-types";
import NoData from "components/layouts/NoData";
import { Typography, Grid, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import DisplayProfile from "components/Utilities/DisplayProfile";
import displayPhoto from "assets/images/avatar.svg";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IoCopy } from "react-icons/io5";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReferPatient from "components/modals/ReferPatient";
import DisablePatient from "components/modals/DeleteOrDisable";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation /*useLazyQuery*/ } from "@apollo/client";
import { deleteProfile } from "components/graphQL/Mutation";
import { getProfile, getPatients } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem",
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
    height: "16.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
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
}));

const PatientProfile = ({ chatMediaActive, setChatMediaActive }) => {
  // const client = useApolloClient();
  const { patientId } = useParams();
  const profile = useQuery(getProfile, {
    variables: {
      profileId: patientId,
    },
  });
  const [disableUser] = useMutation(deleteProfile);

  const classes = useStyles();
  const theme = useTheme();
  const [patientProfile, setPatientProfile] = useState("");
  useEffect(() => {
    if (profile.data && profile.data.profile) {
      setPatientProfile(profile.data.profile);
    }
  }, [profile.data, patientId]);
  const handleDialogOpen = () => setIsOpen(true);
  const initialValues = {
    referral: "",
    category: "",
    textarea: "",
  };

  const handleDialogClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const onConfirm = async () => {
    try {
      await disableUser({ variables: { id: patientId }, refetchQueries: [{ query: getPatients }] });
      history.push("/patients");
    } catch (error) {
      console.log(error);
    }
  };

  const [openDisablePatient, setOpenDisablePatient] = useState(false);
  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };
  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);
  if (profile.loading) return <Loader />;
  if (profile.error) return <NoData error={profile.error.message} />;

  return (
    <Grid container direction="column" style={{ paddingBottom: "10rem" }}>
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/patients/${patientId}`} />
      </Grid>
      {/* Display photo and profile name grid */}
      <Grid item>
        <DisplayProfile
          fullName={`${patientProfile.firstName} ${patientProfile.lastName}`}
          displayPhoto={patientProfile.image ? patientProfile.image : displayPhoto}
          medicalTitle="User ID"
          statusId={patientProfile._id}
          status={patientProfile.status ? patientProfile.status : "No Value"}
          chatPath={`/patients/${patientId}/profile/chat`}
          callPath={`/patients/${patientId}/profile/call`}
          videoPath={`/patients/${patientId}/profile/video`}
          setChatMediaActive={setChatMediaActive}
        />
      </Grid>
      {/* PERSONAL INFO SECTION */}
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* GENDER GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Gender</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={
                  patientProfile.gender == 0
                    ? "Male"
                    : patientProfile.gender == 1
                    ? "Female"
                    : "Prefer not to say"
                }
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* DATE OF BIRTH GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">GenoType</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={patientProfile.genotype}
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        {/* EMAIL ADDRESS GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Email Address</Typography>
            </Grid>
            <Grid item>
              {patientProfile.email ? (
                <a href={`mailto:${patientProfile.email}`} className={classes.link}>
                  <span>{patientProfile.email}</span>
                  <ArrowForwardIosIcon className={classes.linkIcon} />
                </a>
              ) : (
                <p className={classes.link}> No Email Provided</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* DATE OF BIRTH GRID */}
        <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
          <Grid
            container
            direction="column"
            style={{ height: "100%" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4">Phone Number</Typography>
            </Grid>
            <Grid item>
              <a href={`tel:+234${patientProfile.phoneNumber}`} className={classes.link}>
                <span>{patientProfile.phoneNumber}</span>
                <IoCopy className={classes.linkIcon} size={12.5} style={{ marginLeft: "1.2rem" }} />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={`${classes.gridsWrapper} ${classes.buttonsGridWrapper}`}
      >
        <Grid item style={{ marginRight: "2rem" }}>
          <CustomButton
            endIcon={<PersonRemoveIcon />}
            title="Disable Patient"
            type={trasparentButton}
            textColor={theme.palette.common.red}
            onClick={() => setOpenDisablePatient(true)}
          />
        </Grid>
        <Grid item style={{ marginLeft: "2rem" }}>
          <CustomButton
            endIcon={<TrendingUpIcon />}
            title="Refer Patient"
            type={greenButton}
            onClick={handleDialogOpen}
          />
        </Grid>

        <Modals isOpen={isOpen} title="Add Admin" handleClose={handleDialogClose}>
          <ReferPatient handleDialogClose={handleDialogClose} initialValues={initialValues} />
        </Modals>

        <DisablePatient
          open={openDisablePatient}
          setOpen={setOpenDisablePatient}
          title="Delete Partner"
          btnValue="disable"
          confirmationMsg="disable Patient"
          onConfirm={onConfirm}
        />
      </Grid>
    </Grid>
  );
};

PatientProfile.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default PatientProfile;
