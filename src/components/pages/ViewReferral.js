import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Avatar, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import PreviousButton from "components/Utilities/PreviousButton";
import { useQuery } from "@apollo/client";
import { getRefferal } from "components/graphQL/useQuery";
import NoData from "components/layouts/NoData";
import Loader from "components/Utilities/Loader";
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
      marginRight: "2rem",
    },
  },
}));

const ViewReferral = ({ selectedMenu, setSelectedMenu, selectedSubMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const { referralId } = useParams();
  const { loading, data, error } = useQuery(getRefferal, { variables: { id: referralId } });
  useEffect(() => {
    setSelectedMenu(9);
    setSelectedSubMenu(10);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [referral, setReferral] = useState([]);

  useEffect(() => {
    if (data) {
      setReferral(data.getReferral);
    }
  }, [referral, data]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  const {
    specialization,
    doctor,
    patient,
    referrals,
    type,
    reason,
    note,
    testType,
    createdAt,
    // eslint-disable-next-line
  } = referral;
  console.log(referral);

  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <PreviousButton path={`/referrals`} />
      </Grid>
      <Grid
        item
        container
        direction="column"
        width="90%"
        margin="auto"
        className={classes.parentGrid}
      >
        <Grid
          item
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="no-wrap"
          padding=" 2rem 0"
          width="90%"
          margin="auto"
        >
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Patient:
                </Typography>
              </Grid>
              <Grid item>
                <Avatar src={displayPhoto} alt="Display photo of the sender" />
              </Grid>
              <Grid item>
                <Typography variant="h5">{patient}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Referred By:
                </Typography>
              </Grid>
              <Grid item>
                <Avatar src={displayPhoto} alt="Display photo of the sender" />
              </Grid>
              <Grid item>
                <Typography variant="h5">{doctor}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item alignItems="center">
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Referral ID:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{referrals ? referrals : "No Value"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="no-wrap"
          padding=" 2rem 0"
          width="90%"
          margin="auto"
        >
          <Grid item>
            <Grid item container alignItems="center" gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Type:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{type}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container alignItems="center" gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Specialization:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{specialization}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container alignItems="center" gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Test Type:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{testType ? testType : "No Value"}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item alignItems="center">
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Date:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{dateMoment(createdAt)}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Time:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">{timeMoment(createdAt)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          container
          rowSpacing={2}
          flexDirection="column"
          padding=" 2rem 0"
          width="90%"
          margin="auto"
        >
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
        <Divider />
        <Grid
          item
          container
          rowSpacing={2}
          flexDirection="column"
          padding=" 2rem 0"
          width="90%"
          margin="auto"
        >
          <Grid item>
            <Typography variant="body1" className={classes.title}>
              Referral Notes:
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

ViewReferral.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
};

export default ViewReferral;
