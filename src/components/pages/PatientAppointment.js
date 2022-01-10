import React, { useState, useEffect } from "react";
import Modals from "components/Utilities/Modal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomButton from "components/Utilities/CustomButton";
import FormikControl from "components/validation/FormikControl";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FilterList from "components/Utilities/FilterList";
import EnhancedTable from "components/layouts/EnhancedTable";
import { useQuery } from "@apollo/client";
import { getAllAppointment } from "components/graphQL/useQuery";
import Avatar from "@mui/material/Avatar";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { consultationsHeadCells as appointmentsHeadCells } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import displayPhoto from "assets/images/avatar.png";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import Loader from "components/Utilities/Loader";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.css-1jilxo7-MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
  btn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      width: "100%",
    },
  },

  tableBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      height: "3rem",
      fontSize: "1.25rem",
      borderRadius: "2rem",
      boxShadow: "none",

      "&:hover": {
        "& .MuiButton-endIcon>*:nth-of-type(1)": {
          color: "#fff",
        },
      },

      "&:active": {
        boxShadow: "none",
      },

      "& .MuiButton-endIcon>*:nth-of-type(1)": {
        fontSize: "1.5rem",
      },
    },
  },

  redBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightRed,
      color: theme.palette.common.red,

      "&:hover": {
        background: theme.palette.error.light,
        color: "#fff",
      },
    },
  },

  greenBtn: {
    "&.MuiButton-root": {
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
        color: "#fff",
      },
    },
  },
}));

const filterOptions = [
  { id: 0, value: "Name" },
  { id: 1, value: "Date" },
  { id: 2, value: "Description" },
];

const PatientAppointment = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    selectedPatientMenu,
    setSelectedPatientMenu,
  } = props;
  const [deleteModal, setdeleteModal] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [isPatient, setIsPatient] = useState(false);
  const handlePatientOpen = () => setIsPatient(true);
  const handlePatientClose = () => setIsPatient(false);
  const { patientId } = useParams();
  const [patientAppointment, setPatientAppointment] = useState([]);
  const initialValues = {
    status: "",
    gender: "",
    date: "",
    plan: "",
  };

  const validationSchema = Yup.object({
    date: Yup.string("Enter your affliate").required("Date is required"),
    plan: Yup.string("Select your plan").required("Plan is required"),
    gender: Yup.string("Select your gender").required("Gender is required"),
    status: Yup.string("Select your status").required("Status is required"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const { loading, data } = useQuery(getAllAppointment);
  useEffect(() => {
    if (data) {
      setPatientAppointment(data.getAppointments.data.filter((i) => i.patient == patientId));
    }
  }, [data, patientId]);

  const { page, rowsPerPage, selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();
  const handleDeleteOpenDialog = () => {
    setdeleteModal(true);
  };
  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(2);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: "#F7F7FF",
  };

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
  const plans1 = [
    { key: "Plan 1", value: "Plan 1" },
    { key: "Plan 2", value: "Plan 2" },
    { key: "Plan 3", value: "Plan 3" },
    { key: "Plan 4", value: "Plan 4" },
  ];
  const statusType = [
    { key: "Active", value: "Active" },
    { key: "Blocked", value: "Blocked" },
  ];

  if (loading) return <Loader />;
  return (
    <>
      <Grid container direction="column">
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton
            path={`/patients/${patientId}`}
            onClick={() => setSelectedPatientMenu(0)}
          />
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ paddingBottom: "5rem" }}
        >
          <Grid item>
            <Typography variant="h2">Appointments</Typography>
          </Grid>
          <Grid item>
            <FilterList
              onClick={handlePatientOpen}
              options={filterOptions}
              title="Filter Appointments"
              width="18.7rem"
            />
          </Grid>
        </Grid>
        <Grid item container>
          <EnhancedTable
            headCells={appointmentsHeadCells}
            rows={patientAppointment}
            page={page}
            paginationLabel="Patients per page"
            hasCheckbox={true}
          >
            {patientAppointment
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
                        onClick={() => handleSelectedRows(row.id, selectedRows, setSelectedRows)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.tableCell}
                      style={{ maxWidth: "20rem" }}
                    >
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <Avatar
                            alt={`Display Photo of ${row.name}`}
                            src={displayPhoto}
                            sx={{ width: 24, height: 24 }}
                          />
                        </span>
                        <span style={{ fontSize: "1.25rem" }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      {row.date}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableCell}
                      style={{ color: theme.palette.common.grey, maxWidth: "20rem" }}
                    >
                      {row.time}
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <Button
                        variant="contained"
                        disableRipple
                        className={`${classes.tableBtn} ${classes.greenBtn}`}
                        endIcon={<AssignmentIcon color="success" />}
                      >
                        Reschedule
                      </Button>
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                      <Button
                        variant="contained"
                        disableRipple
                        onClick={handleDeleteOpenDialog}
                        className={`${classes.tableBtn} ${classes.redBtn}`}
                        endIcon={<DeleteIcon color="error" />}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </EnhancedTable>
        </Grid>
      </Grid>

      <Modals
        isOpen={isPatient}
        title="Filter"
        rowSpacing={5}
        height="90vh"
        handleClose={handlePatientClose}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount
        >
          {({ isSubmitting, dirty, isValid }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column" gap={2}>
                  <Grid item container>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={plans}
                          name="date"
                          label="Date"
                          placeholder="Choose Date"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={plans1}
                          name="plan"
                          label="Plan"
                          placeholder="Select Plan"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container gap={3}>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={genderType}
                          name="gender"
                          label="Gender"
                          placeholder="Choose Gender"
                        />
                      </Grid>
                      <Grid item md>
                        <FormikControl
                          control="select"
                          options={statusType}
                          name="status"
                          label="Status"
                          placeholder="Select status"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container alignItems="flex-end" marginTop={5} xs={12}>
                    <CustomButton
                      title=" Apply Filter"
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
      {/* delete modal */}
      <DeleteOrDisable
        open={deleteModal}
        onConfirm={() => console.log("confrimed")}
        setOpen={setdeleteModal}
        title="Cancel Consultation"
        confirmationMsg="cancel appointment"
        btnValue="cancel"
      />
    </>
  );
};

PatientAppointment.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default PatientAppointment;
