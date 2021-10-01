import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import CustomButton from "components/Utilities/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  filterBtnGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      marginRight: "3rem",
    },
  },
}));

const options = [
  { id: 0, value: "Name" },
  { id: 1, value: "consultations" },
];

const Hcps = () => {
  const classes = useStyles();
  const theme = useTheme();

  const buttonType = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };

  const [searchHcp, setSearchHcp] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item className={classes.searchGrid}>
          <Search
            value={searchHcp}
            onChange={(e) => setSearchHcp(e.target.value)}
            placeholder="Type to search HCPs..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList
            onClick={(event) => setAnchorEl(event.currentTarget)}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            title="Filter HCPs"
            options={options}
          />
        </Grid>
        <Grid item>
          <CustomButton endIcon={<AddIcon />} title="Add HCP" type={buttonType} />
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default Hcps;
