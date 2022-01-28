import React, { useState, useEffect } from "react";
import Loader from "components/Utilities/Loader";
import CustomButton from "components/Utilities/CustomButton";
import FormikControl from "components/validation/FormikControl";
import PropTypes from "prop-types";
import NoData from "components/layouts/NoData";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Avatar, Chip, Checkbox, TableCell, TableRow, Grid } from "@mui/material";
import Modals from "components/Utilities/Modal";
import Search from "components/Utilities/Search";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { patientsHeadCells } from "components/Utilities/tableHeaders";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import displayPhoto from "assets/images/avatar.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { handleSelectedRows } from "helpers/selectedRows";
import { isSelected } from "helpers/isSelected";
import { useQuery } from "@apollo/client";
import { getPatients } from "components/graphQL/useQuery";

const genderType = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
  { key: "Prefer not to say", value: "Prefer not to say" },
];
const plans = [
  { key: "Plan 1", value: "Plan 1" },
  { key: "Plan 2", value: "Plan 2" },
  { key: "Plan 3", value: "Plan 3" },
  { key: "Plan 4", value: "Plan 4" },
];
const statusType = [
  { key: "Active", value: "Active" },
  { key: "Blocked", value: "Blocked" },
];

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
      textAlign: "left",
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

  const initialValues = {
    hospital: "",
    plan: "",
    specialization: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    hospital: Yup.string("Enter your hospital").required("Hospital is required"),
    status: Yup.string("Select your status").required("Status is required"),
    gender: Yup.string("Select your gender").required("Gender is required"),
    specialization: Yup.string("Enter your specialization").required("Specialization is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const patient = useQuery(getPatients);
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (patient.data && patient.data.profiles.data) {
      setProfiles(patient.data.profiles.data);
    }
  }, [patient.data]);

  const { rowsPerPage, selectedRows, page } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  const [searchPatient, setSearchPatient] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  if (patient.loading) return <Loader />;
  if (patient.error) return <NoData error={patient.error.message} />;

  return (
    <>
      <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
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

        <Grid item container height="100%" direction="column">
          {profiles.length > 0 ? (
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
                  console.log(row);

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
                        align="left"
                        className={classes.tableCell}
                        style={{ color: theme.palette.common.grey, textAlign: "left" }}
                      >
                        {row.dociId && row.dociId.split("-")[1]}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <div
                          style={{
                            height: "100%",
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          <span style={{ marginRight: "1rem" }}>
                            <Avatar
                              alt={`Display Photo of ${row.firstName}`}
                              src={row.image ? row.image : displayPhoto}
                              sx={{ width: 24, height: 24 }}
                            />
                          </span>
                          <span style={{ fontSize: "1.25rem" }}>
                            {`${row.firstName} ${row.lastName}`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {row.plan ? row.plan : "No Value"}
                      </TableCell>
                      <TableCell align="left" textAlign="left" className={classes.tableCell}>
                        {row.provider ? row.provider : "No Value"}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        {row.consultations ? row.consultations : "No Value"}
                      </TableCell>
                      <TableCell align="left" className={classes.tableCell}>
                        <Chip
                          label={row.status ? row.status : "No value"}
                          className={classes.badge}
                          style={{
                            background:
                              row.status == "Active"
                                ? theme.palette.common.lightGreen
                                : theme.palette.common.lightRed,
                            color:
                              row.status == "Active"
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
          ) : (
            <NoData />
          )}
        </Grid>
      </Grid>
      <Modals isOpen={isOpen} title="Filter" rowSpacing={5} handleClose={handleDialogClose}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount
          validateOnBlur
        >
          {({ isSubmitting, isValid, dirty }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column">
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="input"
                          name="hospital"
                          label="Hospital"
                          placeholder="Enter hospital"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={plans}
                          name="plan"
                          label="Plan"
                          placeholder="Select plan"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginBottom: "18rem", marginTop: "3rem" }}>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={genderType}
                          name="gender"
                          label="Gender"
                          placeholder="Choose gender"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={statusType}
                          name="specialization"
                          label="Specialization"
                          placeholder="Select Specialization"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <CustomButton
                      title="Apply Filter"
                      width="100%"
                      type={buttonType}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};

Patients.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default Patients;
