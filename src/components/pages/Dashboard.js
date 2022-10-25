import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Loader } from "components/Utilities";
import { useQuery, useLazyQuery } from "@apollo/client";
import { NoData, AvailabilityTable, DashboardCharts } from "components/layouts";
import {
  dashboard,
  dashboard1,
  getProviders,
} from "components/graphQL/useQuery";

const Dashboard = () => {
  const [form] = useState("");
  const [, setDropDown] = useState([]);
  const [state, setState] = useState("");
  const { data: da } = useQuery(getProviders);

  const [provider] = useState("");
  const [fetchData, { data: newData, error: err, loading: load }] =
    useLazyQuery(dashboard);
  const [fetchData2, { data: newData2, error, loading }] =
    useLazyQuery(dashboard1);

  useEffect(() => {
    const all = {
      key: "All Stats",
      value: "",
    };
    if (da) {
      const datas = da.getProviders.provider;
      const options = datas?.map((i) => {
        return {
          key: i.name,
          value: i._id,
        };
      });

      setDropDown([all, ...options]);
    }
  }, [da]);

  useEffect(() => {
    if (newData2) {
      setState(newData2);
    }
    //eslint-disable-next-line
  }, []);
  /*   const onChange = async (e) => {
    setProvider(e.target.value);
    setForm(e.target.value);
  }; */

  useEffect(() => {
    if (provider === "") {
      fetchData2();
    } else {
      fetchData({
        variables: {
          providerId: provider,
        },
      });
    }
    //eslint-disable-next-line
  }, [provider]);

  useEffect(() => {
    if (newData) {
      setState(newData);
    }
  }, [form, newData, provider]);
  useEffect(() => {
    if (newData2) {
      setState(newData2);
    }
  }, [form, newData2, provider]);

  if (loading || load) return <Loader />;

  if (error || err) return <NoData error={error} />;

  return (
    <Grid container direction="column" gap={2}>
      {state ? (
        <>
          <DashboardCharts data={state?.getStats} />
          <AvailabilityTable />
        </>
      ) : (
        <Loader />
      )}
    </Grid>
  );
};

export default Dashboard;
