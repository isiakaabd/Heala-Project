import React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import EnhancedTableHeader from "components/Utilities/TableHeader";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& .css-b6jmxr-MuiTablePagination-selectLabel": {
      fontSize: "1.2rem",
    },

    "& .css-d9frgn-MuiInputBase-root-MuiTablePagination-select": {
      fontSize: "1.2rem",
    },

    "& .css-gikigr-MuiTablePagination-displayedRows": {
      fontSize: "1.2rem",
    },
  },

  tableToolbar: {
    "&.css-1x93y7r-MuiToolbar-root": {
      background: "#eee",
    },
  },

  delete: {
    color: theme.palette.common.red,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={classes.tableToolbar}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon className={classes.delete} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = (props) => {
  const classes = useStyles();
  const {
    rows,
    children,
    headCells,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    setSelected,
    selected,
  } = props;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((selected) => selected.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  //   const handleClick = (event, name) => {
  //     const selectedIndex = selected.indexOf(name);
  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, name);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1),
  //       );
  //     }

  //     setSelected(newSelected);
  //   };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {selected.length > 0 && <EnhancedTableToolbar numSelected={selected.length} />}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {children}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Patients per page"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
        />
      </Paper>
    </Box>
  );
};

EnhancedTable.propTypes = {
  children: PropTypes.node,
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default EnhancedTable;
