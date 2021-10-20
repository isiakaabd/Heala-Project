import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WaitingListTable from "components/layouts/WaitingListTable";
import PreviousButton from "components/Utilities/PreviousButton";

const WaitingList = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    selectedAppointmentMenu,
    setSelectedSubMenu,
    setWaitingListMenu,
    setSelectedAppointmentMenu,
  } = props;

  useEffect(() => {
    setSelectedMenu(4);
    setSelectedAppointmentMenu(1);
    setSelectedSubMenu(5);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedAppointmentMenu]);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton
          path="/appointments"
          onClick={() => {
            setSelectedSubMenu(0);
            setSelectedAppointmentMenu(0);
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="h2">Waiting List</Typography>
      </Grid>
      <Grid item style={{ marginTop: "5rem" }}>
        <WaitingListTable path="/appointments/waiting-list" onClick={() => setWaitingListMenu(1)} />
      </Grid>
    </Grid>
  );
};

WaitingList.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedAppointmentMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setWaitingListMenu: PropTypes.func.isRequired,
  setSelectedAppointmentMenu: PropTypes.func.isRequired,
};

export default WaitingList;
