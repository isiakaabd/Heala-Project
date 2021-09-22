import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@mui/styles";

const DataTable = ({ rows, columns, rowHeight }) => {
  const useStyles = makeStyles({
    root: {
      "& .MuiDataGrid-root .MuiDataGrid-cell, .MuiDataGrid-root .MuiDataGrid-columnsContainer, .MuiDataGrid-root": {
        border: 0,
        fontSize: "1.6rem",
      },
      "& .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
        fontSize: "1.6rem",
        lineHeight: 1.5,
        fontWeight: "700 !important",
      },
      "& .MuiTypography-body2": {
        fontSize: "1.6rem",
      },
      // .MuiDataGrid-root {

      // "&": { fontSize: "1.6rem !important", borderBottom: 0 },
      "& .category": {
        color: "red",
        fontWeight: "400",
        fontSize: "1.6rem",
        lineHeight: 1.5,
        textAlign: "left !important",
      },
      "& .email": {
        color: "green",
        fontSize: "1.4rem",
        lineHeight: 1.31,
        fontWeight: "300",
        textAlign: "center !important",
      },

      "& .entryDate": {
        fontSize: "1.6rem",
        lineHeight: 1.5,
        fontWeight: "300",
        textAlign: "center !important",
      },
      "& .name": {
        lineHeight: 1.5,
        fontSize: "1.6rem",
        width: 110,
        textAlign: "center !important",
      },
    },
  });
  const classes = useStyles();

  return (
    <div style={{ height: "100%", width: "100%" }} className={classes.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={rowHeight}
        // pageSize={5}
        rowsPerPageOptions={[]}
        checkboxSelection
        // disableSelectionOnClick
        pagination="false"
        paginationMode="client"
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowHeight: PropTypes.string.isRequired,
};

export default DataTable;
