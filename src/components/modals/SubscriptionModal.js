import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { ReactComponent as Naira } from "assets/images/naira.svg";
import FormControl from "@mui/material/FormControl";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { TextError } from "components/Utilities/TextError";

const useStyles = makeStyles((theme) => ({
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },

  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "15rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .css-9tj150-MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },
}));

export const SubscriptionModal = ({ handleDialogClose, type }) => {
  const classes = useStyles();
  const theme = useTheme();
  const handleDialogCloses = () => {
    if (type === "edit") {
      console.log("hi from edit");
      console.log(sub);
    } else {
      console.log(sub);
    }
    handleDialogClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSub({ ...sub, [name]: value });
  };

  const [sub, setSub] = useState({
    plan: "",
    amount: "",
    description: "",
  });
  const { plan, amount, description } = sub;
  return (
    <>
      <Grid item container direction="column">
        <Grid item container spacing={2}>
          <Grid item xs={6} marginBottom={4}>
            <Grid container direction="column" gap={1}>
              <FormLabel component="legend" className={classes.FormLabel}>
                Name of plan
              </FormLabel>
              <FormControl fullWidth>
                <TextField
                  id="outlined-adornment-amount"
                  name="plan"
                  value={plan}
                  placeholder="Enter Plan Name"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column" gap={1}>
              <FormLabel component="legend" className={classes.FormLabel}>
                Category
              </FormLabel>
              <FormControl fullWidth>
                <TextField
                  id="outlined-adornment-amount"
                  placeholder="Enter Amount"
                  onChange={handleChange}
                  name="amount"
                  value={amount}
                  InputProps={{
                    startAdornment: (
                      <Naira
                        style={{
                          background: theme.palette.common.lightGreen,
                          marginRight: "1rem",
                          padding: ".6rem ",
                          borderRadius: "3px",
                        }}
                      />
                    ),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container direction="column" gap={1}>
            <FormLabel component="legend" className={classes.FormLabel}>
              Plan Description
            </FormLabel>
            <TextField
              id="outlined-multiline-static"
              multiline
              name="description"
              value={description}
              placeholder="Type Plan description"
              rows={4}
              style={{ width: "100%", height: "4%" }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item container marginTop={8}>
        <Button
          variant="contained"
          type="submit"
          className={classes.btn}
          onClick={handleDialogCloses}
        >
          Save Plan
        </Button>
      </Grid>
    </>
  );
};

SubscriptionModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
