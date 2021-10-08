import React from "react";
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
      //   background: "red",
      padding: "2rem 0",
      border: "1px solid #E0E0E0",
      borderRadius: ".4rem",
    },
  },
}));

const CheckboxesGroup = ({ row }) => {
  // const [state, setState] = useState([row]);

  const handleChange = (event) => {};

  const classes = useStyles();
  return (
    <Box sx={{ display: "flex" }} className={classes.checkboxContainer}>
      <FormControl required component="fieldset" sx={{ m: 3 }} variant="standard">
        <FormGroup>
          <Grid container>
            {row.map((per, index) => {
              return (
                <Grid item key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={true} onChange={handleChange} name={per} color="success" />
                    }
                    label={per}
                  />
                </Grid>
              );
            })}
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
