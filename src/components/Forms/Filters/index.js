import React from "react";
import t from "prop-types";
import { Grid } from "@mui/material";

import { CustomSelect } from "components/validation/Select";

const Filter = ({ onHandleChange, options, name, placeholder, value, disable }) => {
  return (
    <div>
      <Grid item container direction="column">
        <Grid item>
          <CustomSelect
            Control
            disable={disable}
            value={value}
            options={options}
            name={name}
            placeholder={placeholder}
            onChange={(e) => onHandleChange(e)}
          />
        </Grid>
        <br></br>
        <br></br>
        <br></br>
      </Grid>
    </div>
  );
};

Filter.propTypes = {
  onHandleChange: t.func,
  options: t.array,
  name: t.string,
  placeholder: t.string,
  value: t.string,
  disable: t.bool,
};

export default Filter;
