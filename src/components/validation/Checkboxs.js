import React from "react";
import { useField } from "formik";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import PropTypes from "prop-types";

const Form = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Checkbox />} label={label} />;
};
Form.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
};
const Checkboxes = (props) => {
  const { name, label, value } = props;

  return (
    <Grid container gap={1}>
      <Form type="checkbox" label={label} name={name} value={value} />
    </Grid>
  );
};
export default Checkboxes;
Checkboxes.propTypes = {
  name: PropTypes.string,
  formlabel: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
};
