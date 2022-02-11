import React, { useState } from "react";
// import EnhancedTableAction from "./EnhancedTableAction";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";

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
  const { setSelectedRows } = useActions();
  const { selectedRows } = useSelector((state) => state.tables);
  const {
    rows,
    children,
    totalDocs,
    headCells,
    paginationLabel,
    title,
    limit,
    totalPages,
    hasCheckbox,
    page,
    handleChangePage,
    hasNextPage,
    hasPrevPage,

    setRowsPerPage,
  } = props;
  const [pagnumber, setPageNumber] = useState(page - 1);
  console.log(pagnumber);
  console.log(+pagnumber);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((selected) => selected.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  // const handleChangePage = (event, page) => {
  //   setPage(page + 1);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPageNumber(0);
  };
  const EnhancedTableAction = () => {
    const theme = useTheme();

    const handleFirstPageButtonClick = async (event) => {
      await handleChangePage(event, 1);
      setPageNumber(0);
    };

    const handleBackButtonClick = async (event) => {
      await handleChangePage(event, page - 1);
      setPageNumber(pagnumber - 1);
    };

    const handleNextButtonClick = async (event) => {
      await handleChangePage(event, page + 1);
      setPageNumber(pagnumber + 1);
    };

    const handleLastPageButtonClick = async (event) => {
      await handleChangePage(event, totalPages);
      setPageNumber(totalPages - 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={!hasPrevPage || pagnumber === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={!hasPrevPage || pagnumber === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={!hasNextPage || pagnumber + 1 === totalPages}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={!hasNextPage || pagnumber + 1 === totalPages}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  };
  EnhancedTableAction.propTypes = {
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    hasPrevPage: PropTypes.bool,
    hasNextPage: PropTypes.bool,
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = totalPages === page ? limit * totalPages - totalDocs : 0;
  console.log(emptyRows);
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
                    width: "100%",
                  }}
                >
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalDocs}
          rowsPerPage={limit}
          page={pagnumber}
          labelRowsPerPage={paginationLabel}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className={classes.pagination}
          ActionsComponent={EnhancedTableAction}
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
  limit: PropTypes.number,
  hasPrevPage: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  totalDocs: PropTypes.number,
  pagnumber: PropTypes.number,
  handleChangePage: PropTypes.func,
  setPageNumber: PropTypes.func,
  setRowsPerPage: PropTypes.func,
  hasCheckbox: PropTypes.bool.isRequired,
};

export default EnhancedTable;
