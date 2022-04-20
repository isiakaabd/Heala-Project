import React, { useLayoutEffect, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import DashboardCharts from "components/layouts/DashboardChart";
import FormSelect from "components/Utilities/FormSelect";
import AvailabilityTable from "components/layouts/AvailabilityTable";
import { getUsertypess } from "components/graphQL/useQuery";
import { useQuery } from "@apollo/client";
import { dashboard } from "components/graphQL/useQuery";
import NoData from "components/layouts/NoData";
import Loader from "components/Utilities/Loader";
const Dashboard = ({ chatMediaActive, setChatMediaActive }) => {
  const [form, setForm] = useState("");
  const [dropDown, setDropDown] = useState([]);
  const { data: da } = useQuery(getUsertypess, {
    variables: {
      userTypeId: "61ed2354e6091400135e3d94",
    },
  });

  const { data, error, loading, refetch } = useQuery(dashboard, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (da) {
      const datas = da.getUserTypeProviders.provider;
      setDropDown(
        datas &&
          datas.map((i) => {
            return { key: i.name, value: i._id };
          }),
      );
    }
  }, [da]);
  const onChange = async (e) => {
    setForm(e.target.value);
    await refetch({ providerId: e.target.value });
  };
  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  if (loading) return <Loader />;

  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column">
      <Grid item container alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h1">Dashboard</Typography>
        </Grid>

        <Grid item>
          <FormSelect
            placeholder="All Stats"
            value={form}
            onChange={onChange}
            options={dropDown}
            name="finance"
          />
        </Grid>
      </Grid>

      <Grid item>
        <DashboardCharts data={data} refetch={refetch} />
      </Grid>
      <AvailabilityTable data={data?.getStats.availabilityCalendar} />
    </Grid>
  );
};

Dashboard.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default Dashboard;
