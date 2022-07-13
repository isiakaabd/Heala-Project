import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import EnhancedTableHeader from "./EnhancedTableHeader";
import { paginationActionTypes } from "helpers/mockData";
import { useActions } from "components/hooks/useActions";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
//import { handlePageChange } from "helpers/filterHelperFunctions";

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

const EnhancedTable = ({
  rows,
  children,
  headCells,
  paginationLabel,
  title,
  type,
  hasCheckbox,
  changeLimit,
  dataPageInfo,
  hasPagination = true,
  handlePagination,
}) => {
  const classes = useStyles();
  const { setSelectedRows } = useActions();
  const { selectedRows } = useSelector((state) => state.tables);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((selected) => selected.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

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
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
        {hasPagination &&
          (type !== "editRole" ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={dataPageInfo?.totalDocs || 0}
              rowsPerPage={dataPageInfo?.limit || 5}
              page={dataPageInfo?.page - 1}
              labelRowsPerPage={paginationLabel}
              onPageChange={(e) => e}
              onRowsPerPageChange={(e) => {
                changeLimit(parseInt(e.target.value, 10));
              }}
              className={classes.pagination}
              ActionsComponent={() => (
                <EnhancedTableAction
                  {...{
                    dataPageInfo,
                    handlePagination,
                  }}
                />
              )}
            />
          ) : null)}
      </Paper>
    </Box>
  );
};

EnhancedTable.propTypes = {
  rows: PropTypes.array,
  children: PropTypes.node,
  headCells: PropTypes.array,
  paginationLabel: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  hasCheckbox: PropTypes.bool,
  changeLimit: PropTypes.func,
  dataPageInfo: PropTypes.object,
  hasPagination: PropTypes.bool,
  handlePagination: PropTypes.func,
};

const EnhancedTableAction = ({ dataPageInfo, handlePagination }) => {
  const theme = useTheme();
  const { FIRSTPAGE, NEXTPAGE, PREVPAGE, LASTPAGE } = paginationActionTypes;

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={() => handlePagination(FIRSTPAGE)}
        disabled={!dataPageInfo?.hasPrevPage}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={() => handlePagination(PREVPAGE)}
        disabled={!dataPageInfo?.hasPrevPage}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={() => {
          handlePagination(NEXTPAGE);
        }}
        disabled={!dataPageInfo?.hasNextPage}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={() => handlePagination(LASTPAGE)}
        disabled={!dataPageInfo?.hasNextPage}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

EnhancedTableAction.propTypes = {
  dataPageInfo: PropTypes.object,
  handlePagination: PropTypes.func,
};

export default EnhancedTable;
