import React from "react";
import t from "prop-types";
import { TableCell, TableRow } from "@mui/material";

import { useStyles } from "../../styles/patientsPageStyles";

export const TestListRow = ({
  isItemSelected,
  _id,
  handleSelectedRows,
  selectedRows,
  setSelectedRows,
  labelId,
  testName,
  price,
  tat,
}) => {
  const classes = useStyles();
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell align="left" className={classes.tableCell}>
        {testName && testName}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {price ? price : "No Plan"}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {tat && tat}
      </TableCell>
    </TableRow>
  );
};

TestListRow.propTypes = {
  isItemSelected: t.bool,
  _id: t.string,
  handleSelectedRows: t.func,
  selectedRows: t.any,
  setSelectedRows: t.func,
  labelId: t.string,
  testName: t.string,
  price: t.string,
  tat: t.string,
};
