import React, { useState, useEffect } from "react";
import { NoData, EmptyTable, EnhancedTable } from "components/layouts";
import {
  CustomButton,
  FilterList,
  Modals,
  PreviousButton,
  Loader,
} from "components/Utilities";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import PropTypes from "prop-types";
import {
  Grid,
  Alert,
  Typography,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Avatar,
} from "@mui/material";
import { deleteAppointment } from "components/graphQL/Mutation";
import { useMutation, useLazyQuery } from "@apollo/client";
import { getAppoint, getDOCAppoint } from "components/graphQL/useQuery";
import { DeleteOrDisable } from "components/modals";
import { consultationsHeadCells2 } from "components/Utilities/tableHeaders";
import { useSelector } from "react-redux";
import { useActions } from "components/hooks/useActions";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { isSelected } from "helpers/isSelected";
import { handleSelectedRows } from "helpers/selectedRows";
import displayPhoto from "assets/images/avatar.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useParams } from "react-router-dom";
import { timeConverter, timeMoment } from "components/Utilities/Time";
import * as Yup from "yup";
import { updateAppointment } from "components/graphQL/Mutation";
import { changeTableLimit, fetchMoreData } from "helpers/filterHelperFunctions";
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
  const [updateAppoint] = useMutation(updateAppointment);
  const {
    selectedMenu,
    setSelectedMenu,
    /*  selectedSubMenu,
    setSelectedSubMenu,
    selectedPatientMenu,
    setSelectedPatientMenu, */
  } = props;
  const [deleteAppointments] = useMutation(deleteAppointment);
  const [pageInfo, setPageInfo] = useState([]);
  const [alert, setAlert] = useState(null);
  const [editId, setEditid] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const handleDelete = (id) => {
    setId(id);
    setdeleteModal(true);
  };

  const handleSchedule = (id, doctor) => {
    setIsPatients(true);
    setEditid(id);
    setDoctorId(doctor);
  };
  const onConfirm = async () => {
    try {
      await deleteAppointments({
        variables: { id },
        refetchQueries: [
          {
            query: getAppoint,
            variables: {
              id: patientId,
              orderBy: "-createdAt",
            },
          },
        ],
      });
      setAlert({
        message: "appointment deleted successfully",
        type: "success",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } catch (error) {
      setAlert({
        message: "appointment  not successfully deleted",
        type: "danger",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      console.log(error);
    }
  };
  const [deleteModal, setdeleteModal] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [isPatient, setIsPatient] = useState(false);
  const [isPatients, setIsPatients] = useState(false);
  const [id, setId] = useState(null);
  const handlePatientOpen = () => setIsPatient(true);
  const handlePatientClose = () => setIsPatient(false);
  const handlePatientCloses = () => setIsPatients(false);
  const { patientId } = useParams();
  const [patientAppointment, setPatientAppointment] = useState([]);
  const initialValues = {
    status: "",
    gender: "",
    date: "",
    plan: "",
  };
  const initialValues1 = {
    date: "",
  };

  const validationSchema = Yup.object({
    date: Yup.string("Enter your affliate").required("Date is required"),
    plan: Yup.string("Select your plan").required("Plan is required"),
    gender: Yup.string("Select your gender").required("Gender is required"),
    status: Yup.string("Select your status").required("Status is required"),
  });
  const validationSchema1 = Yup.object({
    date: Yup.string("select date and time ").required(
      "Date  and time is required"
    ),
  });
  const onSubmit1 = async (values) => {
    const { date } = values;
    const timeValue = timeMoment(date);
    const dateValue = timeConverter(date);
    await updateAppoint({
      variables: {
        id: editId,
        date: dateValue,
        time: timeValue,
        doctor: doctorId,
      },
      refetchQueries: [
        {
          query: getAppoint,
          variables: {
            id: patientId,
            orderBy: "-createdAt",
          },
        },
        {
          query: getDOCAppoint,
          variables: {
            id: doctorId,
            orderBy: "-createdAt",
          },
        },
      ],
    });
    handlePatientCloses();
  };
  const onSubmit = (values) => {
    // const { date } = values;
    // let d = timeConverter(date);

    console.log(values);
  };

  const [getPatientsAppointment, { loading, data, error }] =
    useLazyQuery(getAppoint);

  useEffect(() => {
    getPatientsAppointment({
      variables: {
        id: patientId,
        orderBy: "-createdAt",
      },
      notifyOnNetworkStatusChange: true,
    });
  }, [getPatientsAppointment, patientId]);

  useEffect(() => {
    if (data) {
      setPatientAppointment(data.getAppointments.data);
      setPageInfo(data.getAppointments.pageInfo);
    }
  }, [data, patientId]);

  const { selectedRows } = useSelector((state) => state.tables);
  const { setSelectedRows } = useActions();

  useEffect(() => {
    setSelectedMenu(1);
    /* setSelectedSubMenu(2);
    setSelectedPatientMenu(2); */
    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu, selectedPatientMenu */]);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
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

  if (error) return <NoData error={error} />;
  if (loading) return <Loader />;
  return (
    <>
      {alert && Object.keys(alert).length > 0 && (
        <Alert
          variant="filled"
          severity={alert.type}
          sx={{ justifyContent: "center", width: "70%", margin: "0 auto" }}
        >
          {alert.message}
        </Alert>
      )}
      <Grid
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        <Grid item>
          <PreviousButton
            path={`/patients/${patientId}`}
            /* onClick={() => setSelectedPatientMenu(0)} */
          />
        </Grid>

        <>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
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
          {patientAppointment.length > 0 ? (
            <Grid item container height="100%" direction="column">
              <EnhancedTable
                headCells={consultationsHeadCells2}
                rows={patientAppointment}
                paginationLabel="Patients per page"
                handleChangePage={fetchMoreData}
                hasCheckbox={true}
                changeLimit={changeTableLimit}
                fetchData={getPatientsAppointment}
                dataPageInfo={pageInfo}
              >
                {patientAppointment
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            onClick={() =>
                              handleSelectedRows(
                                row.id,
                                selectedRows,
                                setSelectedRows
                              )
                            }
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
                                alt={`Display Photo of ${row.doctorData.firstName}`}
                                src={
                                  row.doctorData.picture
                                    ? row.doctorData.picture
                                    : displayPhoto
                                }
                                sx={{ width: 24, height: 24 }}
                              />
                            </span>
                            <span style={{ fontSize: "1.25rem" }}>
                              {`${row.doctorData.firstName} 
                             ${row.doctorData.lastName}`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          {row.date}
                        </TableCell>
                        <TableCell
                          align="left"
                          className={classes.tableCell}
                          style={{
                            color: theme.palette.common.grey,
                            maxWidth: "20rem",
                          }}
                        >
                          {/* {hours(}row.time) */} {row.time}
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          <Button
                            variant="contained"
                            disableRipple
                            className={`${classes.tableBtn} ${classes.greenBtn}`}
                            endIcon={<AssignmentIcon color="success" />}
                            onClick={() => handleSchedule(row._id, row.doctor)}
                          >
                            Reschedule
                          </Button>
                        </TableCell>
                        <TableCell align="left" className={classes.tableCell}>
                          <Button
                            variant="contained"
                            disableRipple
                            onClick={() => handleDelete(row._id)}
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
          ) : (
            <EmptyTable
              headCells={consultationsHeadCells2}
              paginationLabel="Appointments per page"
            />
          )}
        </>
      </Grid>

      <Modals
        isOpen={isPatients}
        title="Reschedule Appointment"
        rowSpacing={5}
        height="auto"
        handleClose={handlePatientCloses}
      >
        <Formik
          initialValues={initialValues1}
          onSubmit={onSubmit1}
          validationSchema={validationSchema1}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, dirty, isValid, setFieldValue }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid item container direction="column" gap={2}>
                  <Grid item container>
                    <Grid container spacing={2}>
                      <Grid item md>
                        <FormikControl
                          control="time"
                          name="date"
                          label="Date"
                          placeholder="Choose Date and Time"
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="flex-end"
                    marginTop={5}
                    xs={12}
                  >
                    <CustomButton
                      title="Reschedule Appointment"
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

      <Modals
        isOpen={isPatient}
        title="Filter"
        rowSpacing={5}
        height="auto"
        handleClose={handlePatientClose}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
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
                  <Grid
                    item
                    container
                    alignItems="flex-end"
                    marginTop={5}
                    xs={12}
                  >
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

      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Appointment"
        onConfirm={onConfirm}
        confirmationMsg="delete appointment"
        btnValue="Delete"
      />
    </>
  );
};

PatientAppointment.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  /* selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired, */
};

export default PatientAppointment;
