import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    "&.MuiBox-root": {
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
    },
  },
}));

const CheckboxesGroup = ({ row }) => {
  const [state, setState] = useState(row);

  const { create, update, Delete, read } = state;

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setState({
      ...state,
      [name]: checked,
    });
  };

  const classes = useStyles();
  return (
    <Box sx={{ display: "flex" }} className={classes.checkboxContainer}>
      <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
        <FormGroup>
          <Grid container>
            <FormControlLabel
              control={<Checkbox checked={create} onChange={handleChange} name="create" />}
              label="create"
            />
            <FormControlLabel
              control={<Checkbox checked={Delete} onChange={handleChange} name="Delete" />}
              label="Delete"
            />
            <FormControlLabel
              control={<Checkbox checked={update} onChange={handleChange} name="update" />}
              label="update"
            />
            <FormControlLabel
              control={<Checkbox checked={read} onChange={handleChange} name="read" />}
              label="read"
            />
          </Grid>
        </FormGroup>
      </FormControl>
    </Box>
  );
};
CheckboxesGroup.propTypes = {
  row: PropTypes.array.isRequired,
};
export default CheckboxesGroup;
