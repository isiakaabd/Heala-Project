import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { rows } from "components/Utilities/DataHeader";
import FormControl from "@mui/material/FormControl";
import CheckboxesGroup from "components/Utilities/CheckBox";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
const useStyles = makeStyles((theme) => ({
  btn: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
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
export const RoleModal = ({ handleDialogClose, type }) => {
  const handleDialogCloses = () => {
    if (type === "edit") {
      console.log("hi from edit");
      console.log(manage);
    } else {
      console.log(manage);
    }
    handleDialogClose();
  };
  const [manage, setManage] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManage({ ...manage, [name]: value });
  };
  const classes = useStyles();
  const { name } = manage;
  return (
    <>
      <Grid item container direction="column">
        <Grid item container>
          <Grid item container marginBottom={4}>
            <Grid container direction="column" gap={1}>
              <FormLabel component="legend" className={classes.FormLabel}>
                Name of role
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

          <Grid item container xs={12}>
            <Grid item container direction="column" gap={1}>
              <FormLabel component="legend" className={classes.FormLabel}>
                Permission
              </FormLabel>
              <FormControl style={{ width: "100%" }}>
                <CheckboxesGroup row={rows[0].permission} />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} marginTop={10}>
        <Button
          variant="contained"
          type="submit"
          onClick={handleDialogCloses}
          className={classes.btn}
        >
          Add Role
        </Button>
      </Grid>
    </>
  );
};

RoleModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
