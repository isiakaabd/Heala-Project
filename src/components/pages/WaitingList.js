import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import WaitingListTable from "components/layouts/WaitingListTable";

const WaitingList = ({ selectedMenu, setSelectedMenu }) => {
  useEffect(() => {
    setSelectedMenu(4);
  }, [selectedMenu, setSelectedMenu]);
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h2">Waiting List</Typography>
      </Grid>
      <Grid item style={{ marginTop: "5rem" }}>
        <WaitingListTable />
      </Grid>
    </Grid>
  );
};

WaitingList.propTypes = {
  selectedMenu: PropTypes.string.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
};

export default WaitingList;
