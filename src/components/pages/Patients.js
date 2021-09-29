import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/Utilities/Table";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import { patientsRows } from "components/Utilities/tableData";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.css-13i4rnv-MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
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
      maxWidth: "12rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },

  badge: {
    "&.css-1eelh6y-MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",
      borderRadius: "1.3rem",
    },
  },

  arrow: {
    "&.css-1jxdcj3-MuiSvgIcon-root": {
      fontSize: "1.2rem",
      marginTop: "-.2rem",
      marginLeft: "1rem",
    },
  },
}));

const Patients = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [patient, setPatient] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const open = Boolean(anchorEl);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  return (
    <Grid container direction="column">
      <Grid item container style={{ paddingBottom: "5rem" }}>
        <Grid item className={classes.searchGrid}>
          <Search
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            placeholder="Type to search patients..."
            height="5rem"
          />
        </Grid>
        <Grid item className={classes.filterBtnGrid}>
          <FilterList
            onClick={(event) => setAnchorEl(event.currentTarget)}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            title="Filter Patients"
          />
        </Grid>
      </Grid>
      <Grid item container>
        <EnhancedTable
          headCells={patientsHeadCells}
          rows={patientsRows}
          page={page}
          rowsPerPage={rowsPerPage}
          selected={selected}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setSelected={setSelected}
        >
          {patientsRows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.id);
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
                      onClick={(event) => handleClick(event, row.id)}
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
                      }}
                    >
                      <span style={{ marginRight: "1rem" }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={displayPhoto}
                          sx={{ width: 24, height: 24 }}
                        />
                      </span>
                      <span style={{ fontSize: "1.25rem" }}>{row.patientName}</span>
                    </div>
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {row.plan}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {row.consultations}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    <Chip
                      label={row.status}
                      className={classes.badge}
                      style={{
                        background:
                          row.status === "active"
                            ? theme.palette.common.lightGreen
                            : theme.palette.common.lightRed,
                        color:
                          row.status === "active"
                            ? theme.palette.common.green
                            : theme.palette.common.red,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/patients/userId"
                      className={classes.button}
                    >
                      <span>View Profile</span>
                      <ArrowForwardIosIcon className={classes.arrow} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </EnhancedTable>
      </Grid>
    </Grid>
  );
};

export default Patients;
