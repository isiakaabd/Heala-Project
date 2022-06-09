import React, { useEffect, useState } from "react";
import { Typography, Grid, Avatar, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import { Loader } from "components/Utilities";
import { useQuery } from "@apollo/client";
import { getRefferal } from "components/graphQL/useQuery";
import { NoData } from "components/layouts/";
import { useParams } from "react-router-dom";
import { dateMoment, timeMoment } from "components/Utilities/Time";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.5rem",
      borderRadius: "1.5rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
    },
  },
  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      // marginRight: "2rem",
    },
  },
}));

const ViewReferral = () => {
  const classes = useStyles();
  const { referralId } = useParams();
  const { loading, data, error } = useQuery(getRefferal, {
    variables: { id: referralId },
  });

  const [referral, setReferral] = useState([]);

  useEffect(() => {
    if (data) {
      setReferral(data.getReferral);
    }
  }, [data]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  const {
    specialization,
    type,
    reason,
    note,
    testType,
    createdAt,
    patientData,
    doctorData,
    _id,
    // eslint-disable-next-line
  } = referral;

  return (
    <Grid container direction="column" gap={2} padding="0 2rem">
      <Grid
        item
        container
        direction="column"
        margin="auto"
        className={classes.parentGrid}
      >
        <Grid
          item
          container
          direction={{ sm: "row", md: "row", xs: "column" }}
          alignItems="center"
          justifyContent="space-between"
          padding="2rem"
        >
          <Grid item direction="column" container gap={2} xs={4}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Patient
              </Typography>
            </Grid>
            <Grid item container alignItems="center" gap={2}>
              <Grid item>
                <Avatar
                  src={
                    patientData && patientData.picture
                      ? patientData.picture
                      : displayPhoto
                  }
                  alt={`Display photo of the  ${
                    patientData ? patientData.firstName : "placeholder"
                  }`}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  {patientData
                    ? `${patientData.firstName} ${patientData.lastName}`
                    : "No Patient"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item container xs={4} direction="column" gap={2}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Referred By
              </Typography>
            </Grid>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={
                    doctorData && doctorData.picture
                      ? doctorData.picture
                      : displayPhoto
                  }
                  alt={`Display photo of the doctor ${
                    doctorData ? doctorData.firstName : ""
                  }`}
                />
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  {doctorData
                    ? `${doctorData.firstName} ${doctorData.lastName}`
                    : "No Doctor"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* referral ID */}
          <Grid item xs={4} container gap={4} direction="column">
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Time
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{timeMoment(createdAt)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          container
          direction={{ sm: "row", md: "row", xs: "column" }}
          alignItems="center"
          justifyContent="space-between"
          padding="2rem"
        >
          <Grid item xs={4} container direction="column" gap={2}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Type
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{type}</Typography>
            </Grid>
          </Grid>

          <Grid item container xs={4} direction="column" gap={2}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Test Type:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {testType ? testType : "No Value"}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container xs={4} direction="column" gap={2}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Date
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{dateMoment(createdAt)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          container
          // rowSpacing={2}
          padding="2rem"
          direction={{ sm: "row", md: "row", xs: "column" }}
        >
          <Grid item container xs={4} direction="column" gap={2}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Reasons
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                {reason}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={4} direction="column" gap={2}>
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Specialization
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{specialization}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={4}
            gap={2}
            direction={{ sm: "column", xs: "column" }}
          >
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Referral ID
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{_id ? _id : "No Value"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          container
          gap={2}
          padding="2rem"
          flexDirection="column"
          margin="auto"
        >
          <Grid item>
            <Typography variant="body1" className={classes.title}>
              Referral Notes
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" style={{ lineHeight: 1.85 }}>
              {note}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewReferral;
