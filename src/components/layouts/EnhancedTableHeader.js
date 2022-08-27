import React from "react";
import PropTypes from "prop-types";
import { TableHead, TableRow, TableCell, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    "&.MuiTableHead-root": {},
  },
  tableHeaderCell: {
    "&.MuiTableCell-root, &.MuiTableCell-root": {
      background: theme.palette.common.gray300,
      fontSize: "12px",
      color: theme.palette.common.grey,
      borderBottom: "0px",
      whiteSpace: "nowrap",
    },

    "&.MuiTableCell-root": {
      fontSize: "1.35rem",
    },
  },
}));

function EnhancedTableHead(props) {
  const classes = useStyles();

  const { onSelectAllClick, numSelected, rowCount, headCells, hasCheckbox } =
    props;

  return (
    <TableHead className={classes.tableHeader}>
      <TableRow>
        {hasCheckbox && (
          <TableCell
            padding="checkbox"
            sx={{
              borderBottom: "0px",
              backgroundColor: "#F8F8F8",
              borderRadius: "8px 0px 0px 8px",
            }}
          >
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
        {headCells.map((headCell, idx) => {
          const isFirst = hasCheckbox ? false : idx === 0;
          const isLast = idx === headCells.length - 1;
          const firstBorder = { borderRadius: "8px 0px 0px 8px" };
          const lastBorder = { borderRadius: "0px 8px 8px 0px" };
          return (
            <TableCell
              key={headCell.id}
              className={classes.tableHeaderCell}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sx={isFirst ? firstBorder : isLast && lastBorder}
            >
              {headCell.label}
            </TableCell>
          );
        })}
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
