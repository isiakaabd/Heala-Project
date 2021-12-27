import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import EnhancedTableHeader from "./EnhancedTableHeader";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& .MuiTablePagination-selectLabel": {
      fontSize: "1.2rem",
    },

    "& .MuiTablePagination-select": {
      fontSize: "1.2rem",
    },

    "& .MuiTablePagination-displayedRows": {
      fontSize: "1.2rem",
    },
  },

  tableToolbar: {
    "&.MuiToolbar-root": {
      background: "#eee",
    },
  },
}));

const EnhancedTable = (props) => {
  const classes = useStyles();
  const { setPage, setRowsPerPage, setSelectedRows } = useActions();
  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { rows, children, headCells, paginationLabel, title, hasCheckbox } = props;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((selected) => selected.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

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
        <EnhancedTableToolbar numSelected={selectedRows.length} title={title} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHeader
              numSelected={selectedRows.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              headCells={headCells}
              hasCheckbox={hasCheckbox}
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
          labelRowsPerPage={paginationLabel}
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
  paginationLabel: PropTypes.string,
  title: PropTypes.string,
  hasCheckbox: PropTypes.bool.isRequired,
};

export default EnhancedTable;
