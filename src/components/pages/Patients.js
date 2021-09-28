import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
// import EnhancedTable from "components/Utilities/Table";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
}));

const Patients = () => {
  const classes = useStyles();
  const [patient, setPatient] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            placeholder="Type to search patients..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList
            onClick={handleClick}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />
        </Grid>
      </Grid>
      <Grid item container>
        {/* <EnhancedTable /> */}
      </Grid>
    </Grid>
  );
};

export default Patients;
