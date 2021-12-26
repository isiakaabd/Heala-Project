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
import { CREATE_PLAN, UPDATE_PLAN } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";

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

export const SubscriptionModal = ({ handleDialogClose, type, setAlert, editId }) => {
  const [createPlan] = useMutation(CREATE_PLAN);
  const [updatePlan] = useMutation(UPDATE_PLAN);

  const classes = useStyles();
  const theme = useTheme();
  const handleDialogCloses = async () => {
    const { name, amount, description } = sub;
    if (type === "edit") {
      console.log(editId);
      try {
        await updatePlan({
          variables: {
            id: editId,
            name,
            amount: Number(amount),
            description,
          },
        });
        setAlert({
          message: "Plan successfully updated",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await createPlan({
          variables: {
            name,
            amount: Number(amount),
            description,
          },
        });
        setAlert({
          message: "Plan successfully created",
          type: "success",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } catch (errors) {
        setAlert({
          message: errors.message,
          type: "danger",
        });
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        console.log(errors);
      }
    }
    handleDialogClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSub({ ...sub, [name]: value });
  };

  const [sub, setSub] = useState({
    name: "",
    amount: "",
    description: "",
  });
  const { name, amount, description } = sub;
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
                  name="name"
                  value={name}
                  placeholder="Enter Plan Name"
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="column" gap={1}>
              <FormLabel component="legend" className={classes.FormLabel}>
                Amount
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
  setAlert: PropTypes.func,
  editId: PropTypes.string,
  type: PropTypes.string.isRequired,
};
