import React, { useLayoutEffect, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { getProviders } from "components/graphQL/useQuery";
import { useQuery } from "@apollo/client";
import { dashboard } from "components/graphQL/useQuery";
import { NoData, AvailabilityTable, DashboardCharts, EmptyTable } from "components/layouts";
import { Loader, FormSelect } from "components/Utilities";
const Dashboard = ({ chatMediaActive, setChatMediaActive }) => {
  const [form, setForm] = useState("");
  const [dropDown, setDropDown] = useState([]);
  const { data: da } = useQuery(getProviders);

  const { data, error, loading, refetch } = useQuery(dashboard, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (da) {
      const datas = da.getProviders.provider;
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
    <Grid container direction="column" gap={3}>
      <Grid item container alignItems="center" flexWrap={"nowrap"}>
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
      {data ? (
        <>
          {/* <Grid item container sx={{ overflow: "hidden" }}> */}
          <DashboardCharts data={data} refetch={refetch} />
          {/* </Grid> */}
          <Grid item>{/* <AvailabilityTable data={data?.getStats.availabilityCalendar} /> */}</Grid>
        </>
      ) : (
        <EmptyTable />
      )}
    </Grid>
  );
};

Dashboard.propTypes = {
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
};

export default Dashboard;
