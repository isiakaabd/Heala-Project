import React, { useState, useEffect } from "react";
import Loader from "components/Utilities/Loader";
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
import { useQuery } from "@apollo/client";
import { getPatients } from "components/graphQL/useQuery";

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
  const patient = useQuery(getPatients);

  const [inputValue, handleInputValue] = useFormInput({
    date: "",
    plan: "",
    gender: "",
    status: "",
  });
  const [profiles, setProfiles] = useState(undefined);
  useEffect(() => {
    if (patient.data && patient.data.profiles.data) {
      setProfiles(patient.data.profiles.data);
    }
  }, [patient.data]);

  const { date, plan, gender, status } = inputValue;

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchPatient, setSearchPatient] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  if (patient.loading) return <Loader />;
  if (profiles) {
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
              rows={profiles}
              page={page}
              paginationLabel="Patients per page"
              hasCheckbox={true}
            >
              {profiles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id, selectedRows);

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={() => handleSelectedRows(row._id, selectedRows, setSelectedRows)}
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
                        {row._id}
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
                              alt={`Display Photo of ${row.firstName}`}
                              src={displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {row.firstName} {row.lastName}
                          </span>
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
                          to={`patients/${row._id}`}
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
          <Grid item container direction="column">
            <Grid item>
              <Grid container spacing={2}>
                <Grid item md>
                  <Grid container direction="column">
                    <Grid item>
                      <FormLabel component="legend" className={classes.FormLabel}>
                        Date
                      </FormLabel>
                    </Grid>
                    <Grid item>
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
                </Grid>
                <Grid item md>
                  <Grid container direction="column">
                    <Grid item>
                      <FormLabel component="legend" className={classes.FormLabel}>
                        Specialization
                      </FormLabel>
                    </Grid>
                    <Grid item>
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
              </Grid>
            </Grid>
            <Grid item style={{ marginBottom: "18rem", marginTop: "3rem" }}>
              <Grid container spacing={2}>
                <Grid item md>
                  <Grid container direction="column">
                    <Grid item>
                      <FormLabel component="legend" className={classes.FormLabel}>
                        Hospital
                      </FormLabel>
                    </Grid>
                    <Grid item>
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
                </Grid>
                <Grid item md>
                  <Grid container direction="column">
                    <Grid item>
                      <FormLabel component="legend" className={classes.FormLabel}>
                        Status
                      </FormLabel>
                    </Grid>
                    <Grid item>
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
              </Grid>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleDialogClose}
                type="submit"
                className={classes.searchFilterBtn}
              >
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Modals>
      </>
    );
  } else return null;
};

Patients.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Patients;
