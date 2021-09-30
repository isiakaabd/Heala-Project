import React from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import EnhancedTable from "./EnhancedTable";
import { availabilityHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import displayPhoto from "assets/images/avatar.png";
import { availabilityRows } from "components/Utilities/tableData";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
  button: {
    "&.css-1zf5oc-MuiButtonBase-root-MuiButton-root": {
      ...theme.typography.rowBtn,
      paddingTop: ".5rem",
      paddingBottom: ".5rem",
      background: theme.palette.common.lightGrey,
      color: theme.palette.primary.dark,

      "&:hover": {
        background: "#ccc",
      },

      "&:active": {
        background: theme.palette.primary.light,
        color: "#fff",
      },

      "& .css-9tj150-MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },
    },
  },

  badge: {
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.2rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },
}));

const AvailabilityTable = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { page, rowsPerPage } = useSelector((state) => state.tables);

  return (
    <Grid container>
      <EnhancedTable
        headCells={availabilityHeadCells}
        rows={availabilityRows}
        page={page}
        paginationLabel="List per page"
        title="Availability Calendar"
      >
        {availabilityRows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow hover tabIndex={-1} key={row.id}>
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
                  {row.specialization}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Chip
                    label={row.time}
                    className={classes.badge}
                    style={{
                      background: theme.palette.common.lightGreen,
                      color: theme.palette.common.green,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.button}
                    component={Link}
                    to="/availability/userId"
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

export default AvailabilityTable;
