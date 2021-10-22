import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import DashboardCharts from "components/layouts/DashboardChart";
import WaitingListTable from "components/layouts/WaitingListTable";
import AvailabilityTable from "components/layouts/AvailabilityTable";

const Dashboard = ({ chatMediaActive, setChatMediaActive }) => {
  useLayoutEffect(() => {
    setChatMediaActive(false);
  }, [chatMediaActive]);
  return (
    <Grid container direction="column">
      <Grid item>
        <DashboardCharts />
      </Grid>
      <WaitingListTable
        path="/dashboard/waiting-list/listId"
        onClick={() => console.log("Clicked")}
      />
      <AvailabilityTable />
    </Grid>
  );
};

Dashboard.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default Dashboard;
