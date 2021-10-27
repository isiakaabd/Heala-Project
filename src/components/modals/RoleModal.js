import React, { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const useStyles = makeStyles((theme) => ({
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
  checkboxContainer: {
    "&.MuiBox-root": {
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
      "&:active": {
        border: "2px solid black",
      },
    },
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
    "&.Mui-checked": {
      color: "green !important",
    },
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

export const RoleModal = ({ handleDialogClose, type, checkbox }) => {
  const handleDialogCloses = () => {
    if (type === "edit") {
      console.log("hi from edit");
      console.log(manage);
    } else {
      console.log("hi from add");
      console.log(manage);
    }
    handleDialogClose();
  };
  const [manage, setManage] = useState({
    name: "",
    ...checkbox,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManage({ ...manage, [name]: value });
  };
  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    setManage({ ...manage, [name]: checked });
  };

  const classes = useStyles();
  const { name, create, update, Delete, read } = manage;

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
                <Box sx={{ display: "flex" }} className={classes.checkboxContainer}>
                  <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
                    <FormGroup>
                      <Grid container>
                        <FormControlLabel
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              checked={create}
                              onChange={handleCheckBoxChange}
                              name="permission 1"
                            />
                          }
                          label="permission 1"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              checked={Delete}
                              onChange={handleCheckBoxChange}
                              name="permission 2"
                            />
                          }
                          label="permission 2"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              checked={update}
                              onChange={handleCheckBoxChange}
                              name="permission 3"
                            />
                          }
                          label="permission 3"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              checked={read}
                              onChange={handleCheckBoxChange}
                              name="permission 4"
                            />
                          }
                          label="permission 4"
                        />
                      </Grid>
                    </FormGroup>
                  </FormControl>
                </Box>
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
          {type === "edit" ? "Save changes" : "Add Role"}
        </Button>
      </Grid>
    </>
  );
};

RoleModal.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  checkbox: PropTypes.object.isRequired,
};
