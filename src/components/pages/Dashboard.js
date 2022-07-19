import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getProviders } from "components/graphQL/useQuery";
import { useQuery } from "@apollo/client";
import { dashboard } from "components/graphQL/useQuery";
import { NoData, AvailabilityTable, DashboardCharts, EmptyTable } from "components/layouts";
import { Loader, FormSelect } from "components/Utilities";

const Dashboard = () => {
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

          <AvailabilityTable data={data?.getStats.availabilityCalendar} />
        </>
      ) : (
        <EmptyTable />
      )}
    </Grid>
  );
};

export default Dashboard;
