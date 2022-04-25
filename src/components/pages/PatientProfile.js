import React, { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { dateMoment } from "components/Utilities/Time";
import { NoData } from "components/layouts";
import { Typography, Grid, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CustomButton, Loader, PreviousButton, DisplayProfile } from "components/Utilities";
import displayPhoto from "assets/images/avatar.svg";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IoCopy } from "react-icons/io5";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { DeleteOrDisable } from "components/modals";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { deleteProfile } from "components/graphQL/Mutation";
import { getPatients, getProfile, verifiedEmail } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
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

const PatientProfile = ({
  chatMediaActive,
  setChatMediaActive,
  setSelectedSubMenu,
  selectedMenu,
}) => {
  const { patientId } = useParams();
  const doci = localStorage.getItem("userDociId");
  const { loading, data, error } = useQuery(getProfile, {
    variables: {
      profileId: patientId,
    },
  });
  const { data: emailStatus, loading: emailLoading } = useQuery(verifiedEmail, {
    variables: {
      dociId: doci,
    },
  });

  const [disableUser] = useMutation(deleteProfile);

  const classes = useStyles();
  const theme = useTheme();
  const [patientProfile, setPatientProfile] = useState("");
  const [emailStat, setEmailStat] = useState(false);

  useEffect(() => {
    if (emailStatus) {
      setEmailStat(emailStatus.accounts.data[0].isEmailVerified);
    }
  }, [emailStatus]);
  useEffect(() => {
    if (data) {
      setPatientProfile(data.profile);
    }
  }, [data, patientId]);

  // const handleDialogOpen = () => setIsOpen(true);
  // const initialValues = {
  //   referral: "",
  //   category: "",
  //   textarea: "",
  // };

  // const handleDialogClose = () => setIsOpen(false);
  // const [isOpen, setIsOpen] = useState(false);
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
  // const greenButton = {
  //   background: theme.palette.success.main,
  //   hover: theme.palette.success.light,
  //   active: theme.palette.success.dark,
  // };

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };
  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  if (loading || emailLoading) return <Loader />;
  if (error) return <NoData error={error} />;
  const {
    firstName,
    lastName,
    dociId,
    status,
    gender,
    image,
    createdAt,
    provider,
    phoneNumber,
    email,
  } = patientProfile;
  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <PreviousButton path={`/patients/${patientId}`} />
      </Grid>
      {/* Display photo and profile name grid */}
      <Grid item>
        <DisplayProfile
          fullName={`${firstName} ${lastName}`}
          displayPhoto={image ? image : displayPhoto}
          medicalTitle="User ID"
          statusId={dociId && dociId.split("-")[1]}
          status={status ? status : "No Value"}
          chatPath={`/patients/${patientId}/profile/chat`}
          callPath={`/patients/${patientId}/profile/call`}
          videoPath={`/patients/${patientId}/profile/video`}
          setChatMediaActive={setChatMediaActive}
          setSelectedSubMenu={setSelectedSubMenu}
          selectedMenu={selectedMenu}
        />
      </Grid>
      {/* PERSONAL INFO SECTION */}
      <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
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
                label={gender == 0 ? "Male" : gender == 1 ? "Female" : "Prefer not to say"}
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
              <Typography variant="h4">Provider</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={provider ? provider : "No Provider"}
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
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
              <Typography variant="h4">Created At</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={dateMoment(createdAt)}
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
              <Typography variant="h4">Verified</Typography>
            </Grid>
            <Grid item>
              <Chip
                variant="outlined"
                label={emailStat == "false" ? "Not Verified" : "Verified"}
                className={classes.infoBadge}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
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
              {email ? (
                <a href={`mailto:${email}`} className={classes.link}>
                  <span>{email}</span>
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
              <a href={`tel:+234${phoneNumber}`} className={classes.link}>
                <span>{phoneNumber}</span>
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
        {/* <Grid item style={{ marginLeft: "2rem" }}>
          <CustomButton
            endIcon={<TrendingUpIcon />}
            title="Refer Patient"
            type={greenButton}
            onClick={handleDialogOpen}
          />
        </Grid> */}

        {/* <Modals isOpen={isOpen} title="Add Admin" handleClose={handleDialogClose}>
          <ReferPatient handleDialogClose={handleDialogClose} initialValues={initialValues} />
        </Modals> */}

        <DeleteOrDisable
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
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  selectedMenu: PropTypes.func,
  setSelectedPatientMenu: PropTypes.func,
  setSelectedScopedMenu: PropTypes.func,
};

export default PatientProfile;
