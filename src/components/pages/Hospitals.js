import React from "react";
import { Grid } from "@mui/material";
import HospitalsTable from "components/Tables/HospitalsTable";

const Hospitals = () => {
  return (
    <Grid>
      <Grid
        container
        spacing={3}
        justifyContent="end"
        marginBottom="2rem"
        marginTop="2rem"
      ></Grid>
      <Grid>
        <HospitalsTable />
      </Grid>
    </Grid>
  );
};

export default Hospitals;
