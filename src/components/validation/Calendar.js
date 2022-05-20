import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FormLabel from "@mui/material/FormLabel";
const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
    width: "100%",
  },
  label: {
    fontSize: "1.4rem",
    color: theme.palette.common.dark,
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
      paddingBottom: "1rem",
    },
  },
}));

const Calendars = ({ label, name, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid item container>
      <FormLabel component="legend" className={classes.FormLabel}>
        {label}
      </FormLabel>
      <Grid container>
        <input
          type="date"
          name={name}
          id={name}
          className={classes.input}
          {...rest}
          autoComplete="off"
          style={{ minHeight: "5rem" }}
        />
      </Grid>
    </Grid>
  );
};

Calendars.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};
export default Calendars;
