import React, { useState, useEffect } from "react";
import { Grid, Alert, Divider, Avatar, Typography } from "@mui/material";
import { Modals, CustomButton, Loader } from "components/Utilities";
import { timeConverter, timeMoment } from "components/Utilities/Time";
import * as Yup from "yup";
import { updateAppointment } from "components/graphQL/Mutation";
import { DeleteOrDisable } from "components/modals";
import { Formik, Form } from "formik";
import FormikControl from "components/validation/FormikControl";
import { useQuery, useMutation } from "@apollo/client";
import { getAppoint, getDOCAppoint } from "components/graphQL/useQuery";
import { deleteAppointment } from "components/graphQL/Mutation";
import displayPhoto from "assets/images/avatar.svg";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as TimerIcon } from "assets/images/timer.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useParams } from "react-router-dom";
import { NoData } from "components/layouts";

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",

    "&:not(:last-of-type)": {
      marginBottom: "5rem",
    },
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.5rem",
      borderRadius: "1.5rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
    },
  },

  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      // marginRight: "2rem",
    },
  },
}));

const HcpAppointments = () => {
  const { hcpId } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const [appointment, setAppointment] = useState([]);
  const [updateAppoint] = useMutation(updateAppointment);
  const { loading, data, error } = useQuery(getDOCAppoint, {
    variables: {
      id: hcpId,
      orderBy: "-createdAt",
    },
  });
  const [deleteAppointments] = useMutation(deleteAppointment);
  useEffect(() => {
    if (data) {
      setAppointment(data.getAppointments.data);
    }
  }, [data, hcpId]);
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };

  const greenButton = {
    background: theme.palette.common.lightGreen,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };
  const [patientId, setPatientId] = useState(null);
  const handleSchedule = (id, patient) => {
    setIsPatients(true);
    setEditid(id);
    setPatientId(patient);
  };
  const [id, setId] = useState(null);
  const [isPatients, setIsPatients] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const onConfirm = async () => {
    try {
      await deleteAppointments({
        variables: { id },

        refetchQueries: [
          {
            query: getDOCAppoint,
            variables: {
              id: hcpId,
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
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const handlePatientCloses = () => setIsPatients(false);
  const redButton = {
    background: theme.palette.common.lightRed,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };

  const [editId, setEditid] = useState(null);
  const initialValues1 = {
    date: "",
  };
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
        doctor: hcpId,
        patient: patientId,
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
            id: hcpId,
            orderBy: "-createdAt",
          },
        },
      ],
    });
    handlePatientCloses();
  };

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <>
      <Grid
        container
        gap={2}
        flexWrap="nowrap"
        direction="column"
        height="100%"
      >
        {alert && Object.keys(alert).length > 0 && (
          <Alert
            variant="filled"
            severity={alert.type}
            sx={{ justifyContent: "center", width: "70%", margin: "0 auto" }}
          >
            {alert.message}
          </Alert>
        )}

        <Grid item style={{ marginBottom: "3rem", padding: "2rem" }}>
          <Typography variant="h2">Doctor Appointments</Typography>
        </Grid>
        {appointment.length > 0 ? (
          appointment.map((appoint) => (
            <Grid
              item
              container
              direction="column"
              key={appoint._id}
              className={classes.parentGridWrapper}
            >
              <Grid
                item
                container
                style={{ maxWidth: "60rem", padding: "4rem 5rem" }}
              >
                <Grid
                  item
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Consultation Date:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item style={{ marginRight: "1.5rem" }}>
                        <CalendarIcon
                          fill={theme.palette.common.lightGrey}
                          height={14}
                          width={10}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{appoint.date}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item style={{ marginRight: "1.5rem" }}>
                        <TimerIcon fill={theme.palette.common.red} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{appoint.time}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item style={{ padding: "2rem 5rem" }}>
                <Grid container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Patient:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      src={
                        appoint.patientData.picture
                          ? appoint.patientData.picture
                          : displayPhoto
                      }
                      alt="Display Photo of the patient"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{`${appoint.patientData.firstName} ${appoint.patientData.lastName}`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item style={{ padding: "3rem 5rem" }}>
                <Grid container direction="column">
                  <Grid item style={{ marginBottom: "1rem" }}>
                    <Typography variant="body1" className={classes.title}>
                      Meeting Details
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      {appoint.details ? appoint.details : "No Value"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item>
                <Grid
                  container
                  justifyContent="flex-end"
                  style={{ padding: "2rem 5rem" }}
                >
                  <Grid item style={{ marginRight: "3rem" }}>
                    <CustomButton
                      title="Reschedule"
                      type={greenButton}
                      height="3.5rem"
                      textColorOnHover="#fff"
                      onClick={() =>
                        handleSchedule(appoint._id, appoint.patient)
                      }
                      textColor={theme.palette.common.green}
                      endIcon={<AssignmentIcon color="success" />}
                      borderRadius="3rem"
                    />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      title="Cancel"
                      type={redButton}
                      height="3.5rem"
                      textColorOnHover="#fff"
                      onClick={() => handleDeleteOpenDialog(appoint._id)}
                      textColor={theme.palette.common.red}
                      endIcon={<AssignmentIcon color="error" />}
                      borderRadius="3rem"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <NoData />
        )}
      </Grid>

      <DeleteOrDisable
        open={deleteModal}
        setOpen={setdeleteModal}
        title="Delete Appointment"
        onConfirm={onConfirm}
        confirmationMsg="delete Appointment"
        btnValue="Delete"
      />

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
    </>
  );
};

export default HcpAppointments;
