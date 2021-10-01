import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

const DataTable = ({ rows, columns, rowHeight, headerHeight }) => {
  const useStyles = makeStyles({
    root: {
      "& .MuiDataGrid-root .MuiDataGrid-cell, .MuiDataGrid-root": {
        border: "none",
        borderBottom: ".3px solid #F8F8F8",
        fontSize: "1.6rem",
        background: "#FFFFFF",
        // solving the hover effect
        "& .MuiDataGrid-row:hover": {
          background: "green",
        },
      },
      "& .MuiDataGrid-root .MuiDataGrid-columnsContainer": {
        borderBottom: ".5px solid #F8F8F8",
        justifyContent: "center !important",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        justifyContent: "center !important",
      },
      "& .MuiDataGrid-root .MuiDataGrid-cell--textRight": {
        textAlign: "center",
      },
      "& .MuiDataGrid-root .MuiDataGrid-iconSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
        fontSize: "1.6rem",
        lineHeight: 1.5,
        fontWeight: "700 !important",
      },
      "& .MuiTypography-body2": {
        fontSize: "1.6rem",
      },
      "& .MuiDataGrid-root .MuiDataGrid-row": {
        height: "7rem",
      },

      "& .category": {
        color: "red",
        fontWeight: "400",
        fontSize: "1.6rem",
        lineHeight: 1.5,
        textAlign: "center !important",
      },
      "& .cellAmount": {
        color: "#ED3237",
      },
      "& .email": {
        fontSize: "1.4rem",
        lineHeight: 2.1,
        fontWeight: "500",
        color: "#3EA584",
        textAlign: "center !important",
        display: "flex",
        justifyContent: "center",
        // fontFamily: "Circular Std",
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
      "& .refferalHeader": {
        lineHeight: 1.5,
        fontSize: "1.6rem",
        width: 110,
        textAlign: "center !important",
      },
      "& .CellSpecialization": {
        lineHeight: 1.5,
        fontSize: "1.6rem",
        padding: "0 0  0 1rem",
        textAlign: "left !important",
      },

      "& .MuiDataGrid-cell.email.MuiDataGrid-cell--withRenderer.MuiDataGrid-cell--textLeft,.MuiDataGrid-cell.cellStatus.MuiDataGrid-cell--withRenderer.MuiDataGrid-cell--textLeft":
        {
          justifyContent: "center !important",
        },

      "& .MuiDataGrid-root.MuiDataGrid-columnHeader--alignCenter.MuiDataGrid-menuIcon, .MuiDataGrid-iconButtonContainer,.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall":
        {
          display: "none",
        },

      "& .MuiDataGrid-cell.CellSpecialization.MuiDataGrid-cell--textRight": {
        textAlign: "center !important",
      },

      "& .MuiDataGrid-cell.referralTime.MuiDataGrid-cell--textRight": {
        textAlign: "center !important",
        minWidth: "11rem !important",
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
        headerHeight={headerHeight}
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
  headerHeight: PropTypes.string,
};

export default DataTable;
