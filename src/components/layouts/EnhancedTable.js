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
import { handlePageChange } from "helpers/filterHelperFunctions";

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
  handleChangePage,
  changeLimit,
  fetchData,
  dataPageInfo,
  hasPagination = true,
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
      <Paper sx={{ maxWidth: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selectedRows.length} title={title} />

        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            // marginRight: "auto",
            // marginLeft: "auto",
            // marginTop: "50px",
            // padding: "10px",
            // margin: "10px",
          }}
        >
          <Table aria-labelledby="tableTitle">
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
              rowsPerPage={dataPageInfo?.limit || 10}
              page={dataPageInfo?.page - 1}
              labelRowsPerPage={paginationLabel}
              onPageChange={(e, pageNum) => {
                handleChangePage(e, pageNum);
              }}
              onRowsPerPageChange={(e) => {
                changeLimit(parseInt(e.target.value, 10), fetchData);
              }}
              className={classes.pagination}
              ActionsComponent={() => (
                <EnhancedTableAction
                  {...{
                    fetchData,
                    dataPageInfo,
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
  children: PropTypes.node,
  rows: PropTypes.array.isRequired,
  headCells: PropTypes.array.isRequired,
  paginationLabel: PropTypes.string,
  title: PropTypes.string,
  handleChangePage: PropTypes.func,
  hasCheckbox: PropTypes.bool,
  type: PropTypes.string,
  changeLimit: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  dataPageInfo: PropTypes.object.isRequired,
  hasPagination: PropTypes.bool,
};

const EnhancedTableAction = ({ fetchData, dataPageInfo }) => {
  const theme = useTheme();
  const { FIRSTPAGE, NEXTPAGE, PREVPAGE, LASTPAGE } = paginationActionTypes;

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={() => handlePageChange(fetchData, FIRSTPAGE, dataPageInfo)}
        disabled={!dataPageInfo?.hasPrevPage}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={() => handlePageChange(fetchData, PREVPAGE, dataPageInfo)}
        disabled={!dataPageInfo?.hasPrevPage}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={() => handlePageChange(fetchData, NEXTPAGE, dataPageInfo)}
        disabled={!dataPageInfo?.hasNextPage}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={() => handlePageChange(fetchData, LASTPAGE, dataPageInfo)}
        disabled={!dataPageInfo?.hasNextPage}
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
  pagnumber: PropTypes.number,
  totalPages: PropTypes.number,
  dataPageInfo: PropTypes.object,
  rowsPerPage: PropTypes.number.isRequired,
  hasPrevPage: PropTypes.bool,
  setPageNumber: PropTypes.func,
  handleChangePage: PropTypes.func,
  hasNextPage: PropTypes.bool,
  fetchData: PropTypes.func,
};

export default EnhancedTable;
