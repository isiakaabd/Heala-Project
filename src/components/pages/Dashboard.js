import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getProviders } from "components/graphQL/useQuery";
import { useQuery, useLazyQuery } from "@apollo/client";
import { dashboard } from "components/graphQL/useQuery";
import { NoData, AvailabilityTable, DashboardCharts } from "components/layouts";
import { Loader, FormSelect } from "components/Utilities";

const Dashboard = () => {
  const [form, setForm] = useState("61db6f8968b248001aec4fcb");
  const [dropDown, setDropDown] = useState([]);
  const [state, setState] = useState("");
  const { data: da } = useQuery(getProviders);

  const { data, error, loading } = useQuery(dashboard, {
    variables: {
      providerId: "61db6f8968b248001aec4fcb",
    },
  });
  const [provider, setProvider] = useState("61db6f8968b248001aec4fcb");
  const [fetchData, { data: newData, error: err, loading: load }] = useLazyQuery(dashboard);

  useEffect(() => {
    if (da) {
      const datas = da.getProviders.provider;
      const options = datas?.map((i) => {
        return {
          key: i.name,
          value: i._id,
        };
      });

      setDropDown(options);
    }
  }, [da]);
  useEffect(() => {
    if (data) {
      setState(data);
    }
    //eslint-disable-next-line
  }, []);
  const onChange = async (e) => {
    setProvider(e.target.value);
    setForm(e.target.value);
  };

  useEffect(() => {
    fetchData({
      variables: {
        providerId: provider,
      },
    });
    //eslint-disable-next-line
  }, [provider]);

  useEffect(() => {
    if (newData) {
      setState(newData);
    }
  }, [form, newData, provider]);

  if (loading || load) return <Loader />;

  if (error || err) return <NoData error={error} />;

  return (
    <Grid container direction="column" gap={3}>
      <Grid item container alignItems="center" flexWrap={"nowrap"}>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h1">Dashboard</Typography>
        </Grid>

        <Grid item>
          <FormSelect value={form} onChange={onChange} options={dropDown} name="finance" />
        </Grid>
      </Grid>
      {state ? (
        <>
          <DashboardCharts data={state?.getStats} />
          <AvailabilityTable />
        </>
      ) : (
        <NoData />
      )}
    </Grid>
  );
};

export default Dashboard;
