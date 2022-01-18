import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
// import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import PreviousButton from "components/Utilities/PreviousButton";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
  gridWrapper: {
    padding: "3rem 5rem",
  },
  badge: {
    "&.MuiChip-root": {
      border: `1px solid ${theme.palette.common.lighterGrey} !important`,
    },
    "& .MuiChip-label": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
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
      <Grid item container direction="column" className={classes.parentGrid}>
        <Grid item className={classes.gridWrapper}>
          <Typography variant="h3">Appreciate message to Heala team</Typography>
        </Grid>
        <Divider />
        {/*  sx={{ background: "red" }} */}
        <Grid
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="no-wrap"
        >
          <Grid item sx={{ background: "blue" }}>
            <Grid item container>
              <Grid item>
                <Typography variant="h5">Patient:</Typography>
              </Grid>
              <Grid item>
                <Avatar src={displayPhoto} alt="Display photo of the sender" />
              </Grid>
              <Grid item>
                <Typography variant="h5">Chisom Atunke</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ background: "yellow" }} alignItems="center">
            <Grid item container gap={2} align>
              <Grid item>
                <Typography variant="h5">Category</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">Dentistry</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ background: "red" }}>
            ssss
          </Grid>
          {/* <Grid item container alignItems="center">
            <Grid item>
              <Typography variant="h5">Patient:</Typography>
            </Grid>
            <Grid item>
              <Avatar src={displayPhoto} alt="Display photo of the sender" />
            </Grid>
            <Grid item>
              <Typography variant="h5">Chisom Atunke</Typography>
            </Grid>
          </Grid> */}
          {/* <Grid item container alignItems="center">
           
          </Grid> */}
        </Grid>
        <Divider />
        <Grid item className={classes.gridWrapper}>
          <Typography variant="body1" style={{ lineHeight: 1.85 }}>
            I want to use this medium to thank Heala team for their relentless services to the world
            and their provision of quality healthcare service. I want to use this medium to thank
            Heala team for their relentless services to the world and their provision of quality
            healthcare service. I want to use this medium to thank Heala team for their relentless
            services to the world and their provision of quality healthcare service. I want to use
            this medium to thank Heala team for their relentless services to the world and their
            provision of quality healthcare service. I want to use this medium to thank Heala team
            for their relentless services to the world and their provision of quality healthcare
            service.
          </Typography>
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
