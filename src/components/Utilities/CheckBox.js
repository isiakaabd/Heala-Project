import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    "&.MuiBox-root": {
      //   background: "red",
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
    },
  },
}));

const CheckboxesGroup = ({ row }) => {
  const [state, setState] = useState([row]);

  const handleChange = (event) => {};
  // setState({
  //   ...state,
  //   [event.target.name]: event.target.checked,
  // });
  //   const error = props.filter((v) => v).length !== 2;

  const classes = useStyles();
  return (
    <Box sx={{ display: "flex" }} className={classes.checkboxContainer}>
      <FormControl
        required
        //    error={error}

        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormGroup>
          <Grid container>
            {row.map((per) => {
              return (
                <>
                  <Grid item>
                    <FormControlLabel
                      key={per}
                      control={<Checkbox checked={per} onChange={handleChange} name={per} />}
                      label={per}
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </FormGroup>
      </FormControl>
    </Box>
  );
};
CheckboxesGroup.propTypes = {
  row: PropTypes.object.isRequired,
  filter: PropTypes.func.isRequired,
  map: PropTypes.func.isRequired,
  //   props.permission: PropTypes.arr.isRequired,
};
export default CheckboxesGroup;
