import React, { useState, useEffect } from "react";
import { dateMoment } from "components/Utilities/Time";
import { NoData } from "components/layouts";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CustomButton,
  Loader,
  DisplayProfile,
  ProfileCard,
} from "components/Utilities";
import displayPhoto from "assets/images/avatar.svg";
import { useTheme } from "@mui/material/styles";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { DeleteOrDisable } from "components/modals";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { deleteProfile } from "components/graphQL/Mutation";
import {
  getPatients,
  getProfile,
  verifiedEmail,
} from "components/graphQL/useQuery";

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

  linkIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
      marginLeft: "1.2rem",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.green,
    cursor: "pointer",
  },

  buttonsGridWrapper: {
    height: "16.1rem",
  },
}));

const PatientProfile = () => {
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

  const history = useHistory();
  const onConfirm = async () => {
    try {
      await disableUser({
        variables: { id: patientId },
        refetchQueries: [{ query: getPatients }],
      });
      history.push("/patients");
    } catch (error) {
      console.log(error);
    }
  };

  const [openDisablePatient, setOpenDisablePatient] = useState(false);

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

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
    <Grid container direction="column" gap={4}>
      <Grid item>
        <DisplayProfile
          fullName={`${firstName} ${lastName}`}
          displayPhoto={image ? image : displayPhoto}
          medicalTitle="User ID"
          statusId={dociId?.split("-")[1]}
          status={status ? status : "No Value"}
          chatPath={`/patients/${patientId}/profile/chat`}
        />
      </Grid>
      {/* <Grid item container> */}
      <Grid item container spacing={4} justifyContent="space-between">
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard text="Gender" value={gender} />
        </Grid>
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard text="Created At" value={dateMoment(createdAt)} />
        </Grid>
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard
            text="Provider"
            value={provider ? provider : "No Provider"}
          />
        </Grid>
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard
            text="Verified"
            value={emailStat == "false" ? "Not Verified" : "Verified"}
          />
        </Grid>
        <Grid item container md={6} sm={6} xs={12} mx="auto">
          <ProfileCard
            text="Email Address"
            value={
              email ? (
                <a href={`mailto:${email}`} className={classes.link}>
                  {email}
                </a>
              ) : (
                "No Email Provided"
              )
            }
          />
        </Grid>
        <Grid item container md={6} sm={6} xs={12}>
          <ProfileCard
            text="Phone Number"
            value={
              phoneNumber ? (
                <a href={`tel:+234${phoneNumber}`} className={classes.link}>
                  {phoneNumber}
                </a>
              ) : (
                "No Phone Number"
              )
            }
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={`${classes.gridsWrapper} ${classes.buttonsGridWrapper}`}
      >
        <Grid item>
          <CustomButton
            endIcon={<PersonRemoveIcon />}
            title="Disable Patient"
            type={trasparentButton}
            textColor={theme.palette.common.red}
            onClick={() => setOpenDisablePatient(true)}
          />
        </Grid>

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

export default PatientProfile;
