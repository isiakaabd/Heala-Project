import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Alert, Typography } from "@mui/material";
import DeleteOrDisable from "components/modals/DeleteOrDisable";
import { useQuery, useMutation } from "@apollo/client";
import { getAllAppointment } from "components/graphQL/useQuery";
import { deleteAppointment } from "components/graphQL/Mutation";
import Divider from "@mui/material/Divider";
import CustomButton from "components/Utilities/CustomButton";
import Avatar from "@mui/material/Avatar";
import displayPhoto from "assets/images/avatar.png";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { ReactComponent as TimerIcon } from "assets/images/timer.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";

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
      marginRight: "2rem",
    },
  },
}));

const HcpAppointments = (props) => {
  const { hcpId } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const [appointment, setAppointment] = useState([]);
  const { loading, data } = useQuery(getAllAppointment);
  const [deleteAppointments] = useMutation(deleteAppointment);
  useEffect(() => {
    if (data) {
      setAppointment(data.getAppointments.data.filter((i) => i.doctor == hcpId));
    }
  }, [data, hcpId]);
  const handleDeleteOpenDialog = (id) => {
    setId(id);
    setdeleteModal(true);
  };
  const {
    selectedMenu,
    selectedSubMenu,
    selectedHcpMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu,
  } = props;

  const greenButton = {
    background: theme.palette.common.lightGreen,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };
  const [id, setId] = useState(null);
  const [deleteModal, setdeleteModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const onConfirm = async () => {
    try {
      await deleteAppointments({
        variables: { id },
        refetchQueries: [{ query: getAllAppointment }],
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
  const redButton = {
    background: theme.palette.common.lightRed,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(2);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu]);
  if (loading) return <Loader />;

  return (
    <>
      <Grid container direction="column" height="100%">
        {alert && Object.keys(alert).length > 0 && (
          <Alert
            variant="filled"
            severity={alert.type}
            sx={{ justifyContent: "center", width: "70%", margin: "0 auto" }}
          >
            {alert.message}
          </Alert>
        )}
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
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
              <Grid item style={{ marginBottom: "3rem" }}>
                <Typography variant="h2">HCP Appointments</Typography>
              </Grid>
              <Grid item style={{ maxWidth: "40rem", padding: "4rem 5rem" }}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Date:{" "}
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
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Patient:
                    </Typography>
                  </Grid>
                  <Grid item style={{ marginRight: "2rem" }}>
                    <Avatar src={displayPhoto} alt="Display Photo of the patient" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{appoint.patientName}</Typography>
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
                    <Typography variant="body2">{appoint.details}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item>
                <Grid container justifyContent="flex-end" style={{ padding: "2rem 5rem" }}>
                  <Grid item style={{ marginRight: "3rem" }}>
                    <CustomButton
                      title="Reschedule"
                      type={greenButton}
                      height="3.5rem"
                      textColorOnHover="#fff"
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
        title="Delete Plan"
        onConfirm={onConfirm}
        confirmationMsg="delete plan"
        btnValue="Delete"
      />
    </>
  );
};

HcpAppointments.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default HcpAppointments;
