import React from "react";

import {
  Box,
  Table,
  Grid,
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
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { NoData } from ".";

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

const EmptyCell = (props) => {
  const classes = useStyles();

  const { headCells, paginationLabel, title } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar title={title} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHeader rowCount={10} headCells={headCells} hasCheckbox />
            <TableBody>
              <TableRow
                style={{
                  height: 53 * 5,
                  width: "100%",
                }}
              >
                <TableCell colSpan={10}>
                  <Grid container justifyContent="center">
                    <NoData />
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={0}
          rowsPerPage={0}
          page={0}
          labelRowsPerPage={paginationLabel}
          className={classes.pagination}
        />
      </Paper>
    </Box>
  );
};

EmptyCell.propTypes = {
  headCells: PropTypes.array,
  paginationLabel: PropTypes.string,
  title: PropTypes.string,
};

export default EmptyCell;
