import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Modals from "components/Utilities/Modal";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import FormSelect from "components/Utilities/FormSelect";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import { patientsRows } from "components/Utilities/tableData";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import useFormInput from "components/hooks/useFormInput";

const referralOptions = ["Hello", "World", "Goodbye", "World"];

const plans = ["Plan 1", "Plan 2", "Plan 3", "Plan 4"];
const genderType = ["Male", "Female", "Prefer not to say"];
const statusType = ["Active", "Blocked"];

const useStyles = makeStyles((theme) => ({
  searchGrid: {
    "&.MuiGrid-root": {
      flex: 1,
      marginRight: "5rem",
    },
  },
  button: {
    "&.MuiButton-root": {
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

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.2rem",
      },

      "& .MuiButton-endIcon": {
        marginLeft: ".3rem",
        marginTop: "-.2rem",
      },
    },
  },

  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
      textAlign: "center",
    },
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem !important",
      height: "2.7rem",

      borderRadius: "1.3rem",
    },
  },
  searchFilterBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: theme.palette.common.black,
      width: "100%",
    },
  },
}));

const Patients = ({ setSelectedSubMenu, setSelectedPatientMenu }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [inputValue, handleInputValue] = useFormInput({
    date: "",
    plan: "",
    gender: "",
    status: "",
  });

  const { date, plan, gender, status } = inputValue;

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchPatient, setSearchPatient] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => setIsOpen(true);

  const handleDialogClose = () => setIsOpen(false);

  return (
    <>
      <Grid container direction="column">
        <Grid item container style={{ paddingBottom: "5rem" }}>
          <Grid item className={classes.searchGrid}>
            <Search
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
              placeholder="Type to search patients..."
              height="5rem"
            />
          </Grid>
          <Grid item>
            <FilterList title="Filter Patients" width="15.2rem" onClick={handleDialogOpen} />
          </Grid>
        </Grid>
        {/* The Search and Filter ends here */}
        <Grid item container>
          <EnhancedTable
            headCells={patientsHeadCells}
            rows={patientsRows}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {patientsRows
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
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${row.patientName}`}
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
                        className={classes.button}
                        component={Link}
                        to={`patients/${row.id}`}
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={() => {
                          setSelectedSubMenu(2);
                          setSelectedPatientMenu(0);
                        }}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      </Grid>
      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <>
          {/* <Grid item component="div"  container spacing={3} xs={12}> */}
          <Grid item container xs={12} spacing={2} component="div">
            <Grid item xs={6}>
              <Grid container direction="column" gap={1}>
                <FormLabel component="legend" className={classes.FormLabel}>
                  Date
                </FormLabel>
                <FormControl fullWidth>
                  <FormSelect
                    name="date"
                    options={referralOptions}
                    value={date}
                    onChange={handleInputValue}
                    placeholderText="Choose Date"
                  />
                </FormControl>
              </Grid>
            </Grid>
            {/* second grid */}
            <Grid item xs={6}>
              <Grid container gap={1} direction="column">
                <FormLabel component="legend" className={classes.FormLabel}>
                  Plan
                </FormLabel>
                <FormControl fullWidth>
                  <FormSelect
                    name="plan"
                    options={plans}
                    value={plan}
                    onChange={handleInputValue}
                    placeholderText="Select plan"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={2} marginBottom={8}>
            <Grid item xs={6}>
              <Grid container gap={1} direction="column">
                <FormLabel component="legend" className={classes.FormLabel}>
                  Gender
                </FormLabel>
                <FormControl fullWidth style={{ height: "3rem" }}>
                  <FormSelect
                    name="gender"
                    options={genderType}
                    value={gender}
                    onChange={handleInputValue}
                    placeholderText="Choose gender"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container gap={1} direction="column">
                <FormLabel component="legend" className={classes.FormLabel}>
                  Status
                </FormLabel>
                <FormControl fullWidth style={{ height: "3rem" }}>
                  <FormSelect
                    name="status"
                    options={statusType}
                    value={status}
                    onChange={handleInputValue}
                    placeholderText="Select Status"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={12} style={{ marginTop: "5rem" }}>
            <Button
              variant="contained"
              onClick={handleDialogClose}
              to="/view"
              type="submit"
              className={classes.searchFilterBtn}
            >
              Apply Filter
            </Button>
          </Grid>
        </>
      </Modals>
    </>
  );
};

Patients.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Patients;
