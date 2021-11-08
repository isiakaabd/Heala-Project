import React, { useLayoutEffect, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import DashboardCharts from "components/layouts/DashboardChart";
import AvailabilityTable from "components/layouts/AvailabilityTable";
import { setAccessToken } from "./accessToken";

const Dashboard = ({ chatMediaActive, setChatMediaActive }) => {
  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  useEffect(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    setAccessToken(refresh_token);
  }, []);

  return (
    <Grid container direction="column">
      <Grid item>
        <DashboardCharts />
      </Grid>
      {/* <WaitingListTable
        path="/dashboard/waiting-list/listId"
        onClick={() => console.log("Clicked")}
      /> */}
      <AvailabilityTable />
    </Grid>
  );
};

Dashboard.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default Dashboard;
