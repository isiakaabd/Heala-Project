import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    "&.MuiTableHead-root": {
      background: "rgb(251, 251, 251)",
    },
  },
  tableHeaderCell: {
    "&.MuiTableCell-root, &.MuiTableCell-root": {
      fontSize: "1.65rem",
    },

    "&.MuiTableCell-root": {
      fontSize: "1.35rem",
    },
  },
}));

function EnhancedTableHead(props) {
  const classes = useStyles();

  const { onSelectAllClick, numSelected, rowCount, headCells, hasCheckbox } = props;

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            className={classes.tableHeaderCell}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number,
  onSelectAllClick: PropTypes.func,
  rowCount: PropTypes.number,
  headCells: PropTypes.array,
  hasCheckbox: PropTypes.bool,
};

export default EnhancedTableHead;
