import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import { Grid, Typography } from "@mui/material";
import { TextError } from "components/Utilities/TextError";

const useStyles = makeStyles((theme) => ({
  input: {
    border: "none",
    backgroundColor: "transparent",
    flex: "1 1 0%",
    fontSize: "14px",
    color: theme.palette.common.dark,
    fontWeight: 400,
    fontFamily: "\"Euclid Circular\",\"Circular Std Medium\",Roboto,sans-serif",
    "&::placeholder": {
      color: "#afafaf",
      fontWeight: 400,
    },

    "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
      {
        "-webkit-box-shadow": "0 0 0 30px white inset !important",
      },

    "&:focus-visible": {
      border: "transparent",
      outline: "none",
    },
    "&:focus": {
      border: "transparent",
      outline: "none",
    },
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "50px",
    padding: "14px",
    border: "1px solid #D8D8D8",
    borderRadius: "10px",
    "&:hover": {
      borderColor: "#000",
    },
    "&:focus-within": {
      borderColor: "transparent",
      outline: "1px solid #000000",
    },
  },

  formLabel: {
    "&.MuiTypography-root": {
      color: "#00000",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      marginBottom: "7px !important",
    },
  },
}));

const CustomInput = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={`inputContainer ${classes.inputContainer}`}>
      <input {...props} className={classes.input} />
      {props.endIcon && (
        <div style={{ marginLeft: "1rem" }}>{props.endIcon}</div>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  endIcon: PropTypes.node,
};

const LoginInput = (props) => {
  const { label, name, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography className={classes.formLabel}>{label}</Typography>
      </Grid>
      <Grid item>
        <Field as={CustomInput} id={name} name={name} {...rest} />
        <ErrorMessage name={name} component={TextError} />
      </Grid>
    </Grid>
  );
};

LoginInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

export default LoginInput;
