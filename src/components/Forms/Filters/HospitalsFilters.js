import React, { useState } from "react";
import { Grid } from "@mui/material";

import Filter from ".";
import {
  genderType,
  patientsProfileDefaultFilterByValues,
} from "helpers/mockData";

const HospitalsFilters = () => {
  const [profileFilterValues] = useState(patientsProfileDefaultFilterByValues);

  return (
    <Grid item container flexWrap="wrap" spacing={2} alignItems="flex-end">
      {/* FILTER BY GENDER */}
      <Grid item>
        <Filter
          onHandleChange={(e) => null}
          onClickClearBtn={() => null}
          options={[{ key: "Gender", value: "" }, ...genderType]}
          name="gender"
          placeholder="Gender"
          value={profileFilterValues.gender}
          hasClearBtn={true}
          disable={true}
          variant="small"
        />
      </Grid>
      <Grid item>
        <Filter
          onHandleChange={(e) => null}
          onClickClearBtn={() => null}
          options={[{ key: "Gender", value: "" }, ...genderType]}
          name="gender"
          placeholder="Gender"
          value={profileFilterValues.gender}
          hasClearBtn={true}
          disable={true}
          variant="small"
        />
      </Grid>
    </Grid>
  );
};

export default HospitalsFilters;
