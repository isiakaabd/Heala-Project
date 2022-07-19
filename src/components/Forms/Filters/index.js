import React from "react";
import t from "prop-types";
import { Grid } from "@mui/material";
import { CustomSelect } from "components/validation/Select";

const Filter = ({
  onHandleChange,
  options,
  name,
  placeholder,
  value,
  disable,
  onClickClearBtn,
  hasClearBtn,
  label,
}) => {
  return (
    <div>
      <Grid item container direction="column" sx={{ position: "relative" }}>
        <Grid item>
          <CustomSelect
            Control
            disable={disable}
            value={value}
            options={options}
            name={name}
            placeholder={placeholder}
            onChange={(e) => onHandleChange(e)}
            label={label}
            onClickClearBtn={onClickClearBtn}
            hasClearBtn={hasClearBtn}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Filter.propTypes = {
  onHandleChange: t.func,
  onClickClearBtn: t.func,
  options: t.array,
  name: t.string,
  placeholder: t.string,
  value: t.string,
  disable: t.bool,
  hasClearBtn: t.bool,
  label: t.string,
};

export default Filter;
