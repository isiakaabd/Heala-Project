import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AvailabilityCard from "components/Utilities/AvailabilityCard";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";

const HcpAvailability = (props) => {
  const { hcpId } = useParams();

  const {
    selectedMenu,
    selectedSubMenu,
    selectedHcpMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu,
  } = props;

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(3);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu]);
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      <Grid item style={{ marginBottom: "3rem" }}>
        <Typography variant="h2">HCP Appointments</Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ marginBottom: "5rem" }}>
          <Grid item md style={{ marginRight: "2rem" }}>
            <AvailabilityCard day="Monday" time="9:00AM - 3:00PM" />
          </Grid>
          <Grid item md style={{ marginLeft: "2rem" }}>
            <AvailabilityCard day="Tuesday" time="9:00AM - 3:00PM" />
          </Grid>
        </Grid>
        <Grid container style={{ marginBottom: "5rem" }}>
          <Grid item md style={{ marginRight: "2rem" }}>
            <AvailabilityCard day="Wednesday" time="9:00AM - 3:00PM" />
          </Grid>
          <Grid item md style={{ marginLeft: "2rem" }}>
            <AvailabilityCard day="Thursday" time="9:00AM - 3:00PM" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md style={{ marginRight: "2rem" }}>
            <AvailabilityCard day="Friday" time="9:00AM - 3:00PM" />
          </Grid>
          <Grid item md style={{ marginLeft: "2rem" }}>
            <AvailabilityCard day="Saturday" time="9:00AM - 3:00PM" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

HcpAvailability.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default HcpAvailability;
