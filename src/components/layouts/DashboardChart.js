import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import GroupIcon from "@mui/icons-material/Group";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  financialPercent,
  returnpercent,
  selectOptions,
  formatNumber,
} from "components/Utilities/Time";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import chart1 from "assets/images/chart1.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { LineChart, CircularProgressBar, FormSelect } from "components/Utilities";
import "chartjs-plugin-style";

const useStyles = makeStyles((theme) => ({
  chartCard: {
    background: "#fff",
    borderRadius: "1rem",
  },
  chartImg: {
    maxWidth: "100%",
  },
  headerGrid: {
    background: "rgb(253, 253, 253)",
    width: "100%",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    padding: "1.5rem 2rem",
  },
  overviewGrid: {
    padding: "4rem 2rem 3rem",
  },
  groupIconGrid: {
    width: "5rem",
    height: "5rem",
    background: theme.palette.common.lightGreen,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  groupIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
  bottomChartGrid: {
    padding: "3rem 2rem",
  },

  dottedCircle: {
    width: 12,
    height: 12,
    border: "4px solid",
    borderRadius: "50%",
  },
  red: {
    borderColor: theme.palette.common.red,
  },
  green: {
    borderColor: theme.palette.common.green,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  greenIconBg: {
    background: theme.palette.common.lightGreen,
  },
  redIconBg: {
    background: theme.palette.common.lightRed,
  },

  greenNotificationBg: {
    background: theme.palette.common.green,
  },

  notificationIcon: {
    "&.MuiSvgIcon-root": {
      color: "#fff",
    },
  },
}));

const DashboardCharts = ({ data, refetch }) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log(data);

  const timeFrames = [
    { id: 0, time: "Jan" },
    { id: 1, time: "Mar" },
    { id: 2, time: "May" },
    { id: 3, time: "Jul" },
    { id: 4, time: "Sept" },
    { id: 5, time: "Nov" },
    { id: 6, time: "Jan" },
  ];
  const [patients, setPatients] = useState([]);
  const [doctorStats, setDoctorStats] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState([]);
  const [subscribers, setsubscribers] = useState([]);
  const [totalEarning, setTotalEarning] = useState([]);
  const [totalPayouts, setTotalPayouts] = useState([]);

  useEffect(() => {
    const {
      // eslint-disable-next-line
      patientStats,
      doctorStats,
      appointmentStats,
      subscribers,
      totalEarnings,
      totalPayout,
    } = data?.getStats;
    setPatients(patientStats);
    setDoctorStats(doctorStats);
    setAppointmentStats(appointmentStats);
    setsubscribers(subscribers);
    setTotalEarning(totalEarnings);
    setTotalPayouts(totalPayout);
    const value = financialPercent(totalEarnings, totalPayout);
    setFinances(value);
  }, [data]);

  const financialValue = financialPercent(totalEarning, totalPayouts);
  const [selectedTimeframe, setSelectedTimeframe] = useState(0);
  const [finances, setFinances] = useState(financialValue);
  const { activeDoctors, inactiveDoctors } = doctorStats;
  const { activePatients, inactivePatients } = patients;
  const totalDoc = activeDoctors + inactiveDoctors;
  const totalPatient = activePatients + inactivePatients;
  const patientPercentage = returnpercent(activePatients, inactivePatients);
  const doctorPercentage = returnpercent(activeDoctors, inactiveDoctors);
  const [forms, setForms] = useState("");
  const onChange = async (e) => {
    setForms(e.target.value);
    await refetch({ q: e.target.value });
  };

  // useEffect(() => {
  //   if (earningData) {

  //   }
  // }, [earningData, refetch]);

  return (
    <Grid container justifyContent="space-between" spacing={3}>
      <Grid item container lg>
        <Grid container direction="column">
          <Grid item className={classes.chartCard} sx={{ marginBottom: "3em" }}>
            <Grid container direction="column">
              <Grid item className={classes.headerGrid}>
                <Typography variant="h5">Doctor Stats</Typography>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item>
                <Grid container className={classes.overviewGrid} justifyContent="space-between">
                  <Grid item>
                    <Grid container>
                      <Grid item className={classes.groupIconGrid}>
                        <GroupIcon color="success" className={classes.groupIcon} />
                      </Grid>
                      <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                        <Typography variant="h1">{data && totalDoc}</Typography>
                      </Grid>
                      <Grid item style={{ marginRight: "0.5rem" }}>
                        <ArrowUpwardIcon color="success" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{ color: theme.palette.success.main }}>
                          {doctorPercentage ? `${doctorPercentage.toFixed(0)} %` : 0}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      style={{
                        marginLeft: "38%",
                        marginTop: "-8%",
                      }}
                    >
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                        Total Doctors
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <img src={chart1} alt="Arc chart" />
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item container md={4} direction="column" className={classes.bottomChartGrid}>
                <LineChart
                  timeFrames={timeFrames}
                  selectedTimeframe={selectedTimeframe}
                  setSelectedTimeframe={setSelectedTimeframe}
                  doctorStats={doctorStats}
                />
                <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h3" gutterBottom>
                          {doctorStats && doctorStats.activeDoctors}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item style={{ marginRight: "1rem" }}>
                            <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.lightGrey }}
                            >
                              Total active Doctors
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" justifyContent="center">
                      <Grid item>
                        <Typography variant="h3" gutterBottom>
                          {doctorStats && doctorStats.inactiveDoctors}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item style={{ marginRight: "1rem" }}>
                            <div className={`${classes.dottedCircle} ${classes.red}`}></div>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.lightGrey }}
                            >
                              Total inactive Doctors
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.chartCard} style={{ marginBottom: "3em" }}>
            <Grid container direction="column">
              <>
                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.headerGrid}
                  >
                    <Grid item>
                      <Typography variant="h5">Financial Stats</Typography>
                    </Grid>
                    <Grid item>
                      <FormSelect
                        placeholder="Select Months"
                        value={forms}
                        onChange={onChange}
                        options={selectOptions}
                        name="finance"
                      />
                    </Grid>
                  </Grid>
                  <Divider color={theme.palette.common.lighterGrey} />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.overviewGrid}
                  >
                    <Grid item>
                      <CircularProgressBar
                        height="8rem"
                        width="8rem"
                        color={theme.palette.common.green}
                        trailColor={theme.palette.common.red}
                        value={finances}
                        strokeWidth={8}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item className={`${classes.iconWrapper} ${classes.greenIconBg}`}>
                          <TrendingDownIcon color="success" />
                        </Grid>
                        <Grid item style={{ marginLeft: "1rem" }}>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variat="h3">
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    textDecorationStyle: "double",
                                  }}
                                >
                                  N
                                </span>
                                {formatNumber(totalEarning)}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body2"
                                style={{
                                  color: theme.palette.common.lightGrey,
                                }}
                              >
                                Total earnings
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container>
                        <Grid item className={`${classes.iconWrapper} ${classes.redIconBg}`}>
                          <TrendingUpIcon color="error" />
                        </Grid>
                        <Grid item style={{ marginLeft: "1rem" }}>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variat="h3">
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    textDecorationStyle: "double",
                                  }}
                                >
                                  N
                                </span>
                                {formatNumber(totalPayouts)}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="body2"
                                style={{
                                  color: theme.palette.common.lightGrey,
                                }}
                              >
                                Total payouts
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" className={classes.chartCard}>
              <Grid item className={classes.headerGrid}>
                <Typography variant="h5">Appointment Stats</Typography>
              </Grid>
              <Divider color={theme.palette.common.lightGrey} />
              <Grid item className={classes.overviewGrid}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Grid container>
                      <Grid
                        item
                        className={`${classes.iconWrapper} ${classes.greenNotificationBg}`}
                      >
                        <NotificationsActiveIcon className={classes.notificationIcon} />
                      </Grid>
                      <Grid item style={{ marginLeft: "1em" }}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="h4">
                              {data && appointmentStats.totalUpcoming}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.lightGrey }}
                            >
                              Total Upcoming
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <Grid
                        item
                        className={`${classes.iconWrapper} ${classes.greenNotificationBg}`}
                      >
                        <NotificationsActiveIcon className={classes.notificationIcon} />
                      </Grid>
                      <Grid item style={{ marginLeft: "1em" }}>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography variant="h4">
                              {appointmentStats && appointmentStats.totalPast}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.lightGrey }}
                            >
                              Total Past
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md>
        <Grid container direction="column" className={classes.chartCard}>
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Patient Stats</Typography>
          </Grid>
          <Divider color={theme.palette.common.lightGrey} />
          <Grid item>
            <Grid container className={classes.overviewGrid} justifyContent="space-between">
              <Grid item>
                <Grid container>
                  <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                    <Grid container>
                      <Grid item className={classes.groupIconGrid}>
                        <GroupIcon color="success" className={classes.groupIcon} />
                      </Grid>
                      <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                        <Typography variant="h1">{totalPatient}</Typography>
                      </Grid>
                      <Grid item style={{ marginRight: "0.5rem" }}>
                        <ArrowUpwardIcon color="success" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{ color: theme.palette.success.main }}>
                          {patientPercentage ? `${patientPercentage.toFixed(0)} %` : 0}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{
                          marginLeft: "24%",
                          marginTop: "-5%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total Patients
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <img src={chart1} alt="Arc chart" />
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item lg={5} className={classes.bottomChartGrid}>
            <LineChart
              timeFrames={timeFrames}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              doctorStats={patients}
            />

            <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3" gutterBottom>
                      {data && patients.activePatients}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item style={{ marginRight: "1rem" }}>
                        <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total active Patients
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" justifyContent="center">
                  <Grid item>
                    <Typography variant="h3" gutterBottom>
                      {data && subscribers.totalActiveSubscribers}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item style={{ marginRight: "1rem" }}>
                        <div className={`${classes.dottedCircle} ${classes.red}`}></div>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total inactive Patients
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item className={classes.headerGrid}>
            <Typography variant="h5">Subscribers</Typography>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item container direction="column" className={classes.bottomChartGrid}>
            <LineChart
              timeFrames={timeFrames}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              doctorStats={subscribers}
              type="subscriber"
            />
            <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3" gutterBottom>
                      {data && subscribers.totalActiveSubscribers}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item style={{ marginRight: "1rem" }}>
                        <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total active Subscribers
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" justifyContent="center">
                  <Grid item>
                    <Typography variant="h3" gutterBottom>
                      {data && subscribers.totalInactiveSubscribers}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item style={{ marginRight: "1rem" }}>
                        <div className={`${classes.dottedCircle} ${classes.red}`}></div>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total inactive Subscribers
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

DashboardCharts.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
};

export default DashboardCharts;
