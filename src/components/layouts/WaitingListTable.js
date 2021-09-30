import React from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EnhancedTable from "./EnhancedTable";
import { waitingHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { isSelected } from "helpers/isSelected";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import displayPhoto from "assets/images/avatar.png";
import { handleSelectedRows } from "helpers/selectedRows";
import { waitingListRows } from "components/Utilities/tableData";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    paddingBottom: "10em",
  },

  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      background: "#fff",
      color: theme.palette.common.grey,
      textTransform: "none",
      borderRadius: "2rem",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "10rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },
    },
  },
}));

const WaitingListTable = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { setSelectedRows } = useActions();
  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);

  return (
    <Grid item container className={classes.parentGrid}>
      <EnhancedTable
        headCells={waitingHeadCells}
        rows={waitingListRows}
        page={page}
        paginationLabel="List per page"
        title="Waiting List"
        hasCheckbox={true}
      >
        {waitingListRows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row.id, selectedRows);

            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={() => handleSelectedRows(row.id, selectedRows, setSelectedRows)}
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>
                <TableCell
                  id={labelId}
                  scope="row"
                  align="center"
                  className={classes.tableCell}
                  style={{ color: theme.palette.common.grey }}
                >
                  {row.id}
                </TableCell>
                <TableCell align="left" className={classes.tableCell}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ marginRight: "1rem" }}>
                      <Avatar alt="Remy Sharp" src={displayPhoto} sx={{ width: 24, height: 24 }} />
                    </span>
                    <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
                  </div>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.time}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link}
                    to="/waiting-list/userId"
                    endIcon={<ArrowForwardIosIcon />}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
      </EnhancedTable>
    </Grid>
  );
};

export default WaitingListTable;
