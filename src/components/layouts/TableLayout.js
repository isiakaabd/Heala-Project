import React from "react";
import PropTypes from "prop-types";
import { Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  cont: {
    "&#table_layout": {
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      padding: "30px 20px",
    },
  },
}));

const TableLayout = ({ children, filters, search }) => {
  const classes = useStyles();
  return (
    <Paper id="table_layout" className={`${classes.cont}`} elevation={0}>
      <Grid
        container
        justifyContent="space-between"
        flexWrap={"nowrap"}
        marginBottom="3rem"
        spacing={3}
      >
        <Grid item>{filters}</Grid>
        <Grid item>{search}</Grid>
      </Grid>
      {children}
    </Paper>
  );
};

TableLayout.propTypes = {
  children: PropTypes.node.isRequired,
  filters: PropTypes.node,
  search: PropTypes.node,
};

export default TableLayout;
