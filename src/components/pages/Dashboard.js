import React, { useLayoutEffect } from "react";
import PropTypes from "prop-types";
import FormikControl from "components/validation/FormikControl";
import { Grid, Typography } from "@mui/material";
import DashboardCharts from "components/layouts/DashboardChart";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import AvailabilityTable from "components/layouts/AvailabilityTable";

const Dashboard = ({ chatMediaActive, setChatMediaActive }) => {
  const initialValues = {
    stats: "",
  };

  const validationSchema = Yup.object({
    stats: Yup.string("Select your stats").required("stats is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  useLayoutEffect(() => {
    setChatMediaActive(false);

    // eslint-disable-next-line
  }, [chatMediaActive]);
  const specializations = [
    { key: "Heala stats", value: "Heala stats" },
    { key: "Evergreen Stats", value: "Evergreen Stats" },
  ];
  return (
    <Grid container direction="column">
      <Grid item container alignItems="center">
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography variant="h1">Dashboard</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnMount
          >
            {({ isSubmitting, isValid, dirty }) => {
              return (
                <Form>
                  <Grid item container>
                    <FormikControl
                      control="select"
                      options={specializations}
                      name="stats"
                      placeholder="All Stats"
                    />
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
      <Grid item>
        <DashboardCharts />
      </Grid>
      <AvailabilityTable />
    </Grid>
  );
};

Dashboard.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default Dashboard;
