import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "5rem",
    border: `1px solid ${theme.palette.common.lightGrey}`,
    borderRadius: ".5rem",
    padding: "1rem",
    fontSize: "1.6rem",
    color: theme.palette.common.dark,
    fontWeight: 600,

    "&:focus": {
      outline: "none",
    },

    "&::placeholder": {
      color: theme.palette.common.lightGrey,
      fontWeight: 500,
    },
  },
  label: {
    fontSize: "1.6rem",
    color: theme.palette.common.dark,
  },
}));

const FormInput = ({ label, labelId, id, ...rest }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "1rem" }}>
        <label htmlFor={labelId} className={classes.label}>
          {label}
        </label>
      </Grid>
      <input id={id} className={classes.input} {...rest} autoComplete="off" />
    </Grid>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default FormInput;
