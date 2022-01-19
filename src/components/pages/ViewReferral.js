import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Avatar, Chip, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import PreviousButton from "components/Utilities/PreviousButton";

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

  useEffect(() => {
    setSelectedMenu(9);
    setSelectedSubMenu(10);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
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
                <Typography variant="h5">Chisom Atunke</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item alignItems="center">
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Category:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Dentistry</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Reason:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Reason 1</Typography>
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
                  Referred to:
                </Typography>
              </Grid>
              <Grid item>
                <Avatar src={displayPhoto} alt="Display photo of the sender" />
              </Grid>
              <Grid item>
                <Typography variant="h5">Chisom Atunke</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item alignItems="center">
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Referral date:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">July 17, 2021</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid item container gap={2} alignItems="center">
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Status:
                </Typography>
              </Grid>
              <Grid item>
                <Chip variant="contained" label="active" className={classes.infoBadge} />
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
              Referral Notes:
            </Typography>
          </Grid>
          <Grid item>
            {/* <Typography variant="h5">
              This is based on appointment This is based on appointment This is based on appointment
              This is based on appointment This is based on appointment This is based on appointment
              This is based on appointmentThis is based on appointment
            </Typography> */}
            <Typography variant="body1" style={{ lineHeight: 1.85 }}>
              I want to use this medium to thank Heala team for their relentless services to the
              world and their provision of quality healthcare service. I want to use this medium to
              thank Heala team for their relentless services to the world and their provision of
              quality healthcare service. I want to use this medium to thank Heala team for their
              relentless services to the world and their provision of quality healthcare service. I
              want to use this medium to thank Heala team for their relentless services to the world
              and their provision of quality healthcare service. I want to use this medium to thank
              Heala team for their relentless services to the world and their provision of quality
              healthcare service.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ViewReferral.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ViewReferral;
