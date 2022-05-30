import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import GroupIcon from "@mui/icons-material/Group";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownwardOutlined } from "@mui/icons-material";
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
    // padding: "4rem 2rem 3rem",
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
    // padding: "3rem 2rem",
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
    if (data) {
      setPatients(patientStats);
      setDoctorStats(doctorStats);
      setAppointmentStats(appointmentStats);
      setsubscribers(subscribers);
      setTotalEarning(totalEarnings);
      setTotalPayouts(totalPayout);
      const value = financialPercent(totalEarnings, totalPayout);
      setFinances(value);
    }
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

  return (
    <Grid
      container
      justifyContent="space-between"
      display="grid"
      padding=".2rem" //repeat(auto-fit, minmax(250px, 1fr));
      gridTemplateColumns={{ sm: "repeat(2,1fr)", md: "repeat(2,1fr)", xs: "repeat(1,1fr)" }}
      rowSpacing={3}
    >
      {/* doctor */}
      <Grid item container className={classes.chartCard}>
        <Grid item className={classes.headerGrid}>
          <Typography variant="h5">Doctor Stats</Typography>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />

        <Grid
          item
          container
          flexWrap="nowrap"
          paddingY={{ md: 2, sm: 2, xs: 2 }}
          justifyContent="space-between"
        >
          <Grid
            item
            gap={{ sm: 3, xs: 2, md: 3 }}
            alignItems="center"
            flexWrap={"nowrap"}
            container
            flex={3}
          >
            <Grid item className={classes.groupIconGrid}>
              <GroupIcon color="success" className={classes.groupIcon} />
            </Grid>
            <Grid item alignItems="center" container flex={1}>
              <Grid item container direction="column">
                <Grid item container gap={1}>
                  <Typography variant="h1">{data && totalDoc}</Typography>
                  <Grid item>
                    {doctorPercentage < 1 ? (
                      <ArrowDownwardOutlined sx={{ color: "#f2190a" }} />
                    ) : (
                      <ArrowUpwardIcon color="success" />
                    )}
                  </Grid>
                  <Typography
                    style={{
                      color: doctorPercentage < 1 ? "#f2190a" : theme.palette.success.main,
                    }}
                    variant="body2"
                  >
                    {doctorPercentage ? `${Math.abs(doctorPercentage.toFixed(0))} %` : 0}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey, whiteSpace: "nowrap" }}
              >
                Total Doctors
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <img src={chart1} sx={{ objectFit: "contain" }} alt="Arc chart" />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart
            timeFrames={timeFrames}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
            doctorStats={doctorStats}
          />

          {/* Line */}
          <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
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
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
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
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
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
      {/* patients */}
      <Grid item container className={classes.chartCard}>
        <Grid item className={classes.headerGrid}>
          <Typography variant="h5">Patients Stats</Typography>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />

        <Grid
          item
          container
          flexWrap="nowrap"
          paddingY={{ md: 2, sm: 2, xs: 2 }}
          justifyContent="space-between"
        >
          <Grid
            item
            gap={{ sm: 3, xs: 2, md: 3 }}
            alignItems="center"
            flexWrap={"nowrap"}
            container
            flex={3}
          >
            <Grid item className={classes.groupIconGrid}>
              <GroupIcon color="success" className={classes.groupIcon} />
            </Grid>
            <Grid item alignItems="center" container flex={1}>
              <Grid item container direction="column">
                <Grid item container gap={1}>
                  <Typography variant="h1">{data && totalPatient}</Typography>
                  <Grid item>
                    {patientPercentage < 1 ? (
                      <ArrowDownwardOutlined sx={{ color: "#f2190a" }} />
                    ) : (
                      <ArrowUpwardIcon color="success" />
                    )}
                  </Grid>
                  <Typography
                    style={{
                      color: patientPercentage < 1 ? "#f2190a" : theme.palette.success.main,
                    }}
                    variant="body2"
                  >
                    {patientPercentage ? `${Math.abs(patientPercentage.toFixed(0))} %` : 0}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey, whiteSpace: "nowrap" }}
              >
                Total Patients
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <img src={chart1} sx={{ objectFit: "contain" }} alt="Arc chart" />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart
            timeFrames={timeFrames}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
            doctorStats={patients}
          />

          {/* Line */}
          <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
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
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
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
                    {patients && patients.inactivePatients}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: "1rem" }}>
                      <div className={`${classes.dottedCircle} ${classes.red}`}></div>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                        Total inactive Patients
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* active subscriber */}
      <Grid item container className={classes.chartCard}>
        <Grid item className={classes.headerGrid}>
          <Typography variant="h5">Subscribers Stats</Typography>
        </Grid>
        <Divider color={theme.palette.common.lighterGrey} />

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart
            timeFrames={timeFrames}
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
            doctorStats={subscribers}
            type="subscriber"
          />

          {/* Line */}
          <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h3" gutterBottom>
                    {data && subscribers.totalActiveSubscribers}
                  </Typography>{" "}
                </Grid>
                <Grid item>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: "1rem" }}>
                      <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
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
                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
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

      {/* financial */}
      <Grid item direction="column" className={classes.chartCard}>
        <Grid item container rowGap={{ sm: 6, xs: 0 }} flexDirection={{ xs: "column" }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            flex={{ sm: 1 }}
            flexWrap={"nowrap"}
          >
            <Grid item flex={1}>
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

          <Grid
            item
            container
            justifySelf={{ xs: "center", md: "space-between" }}
            justifyContent="space-between"
            flexWrap={{ sm: "nowrap" }}
            flexDirection={{ xs: "column", sm: "column", md: "row" }}
            alignItems="center"
            rowGap={{ xs: "2rem" }}
            paddingY={{ xs: "1rem" }}
            className={classes.overviewGrid}
          >
            <Grid item marginRight={{ sm: "2rem", md: "2rem" }}>
              <CircularProgressBar
                height="8rem"
                width="8rem"
                color={theme.palette.common.green}
                trailColor={theme.palette.common.red}
                value={finances}
                strokeWidth={8}
              />
            </Grid>
            <Grid item container flexWrap="nowrap" flexDirection={{ xs: "row" }}>
              <Grid item container gap={{ sm: 2, xs: 1 }} alignItems="center">
                <Grid item className={`${classes.iconWrapper} ${classes.greenIconBg}`}>
                  <TrendingDownIcon color="success" />
                </Grid>
                <Grid item>
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

              <Grid item container gap={{ sm: 2, xs: 1 }} alignItems="center">
                <Grid item className={`${classes.iconWrapper} ${classes.redIconBg}`}>
                  <TrendingUpIcon color="error" />
                </Grid>
                <Grid item>
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

          <Grid container flex={{ sm: 1 }} direction="column" className={classes.chartCard}>
            <Grid item>
              <Typography variant="h5">Appointment Stats</Typography>
            </Grid>

            <Grid item container paddingY={{ sm: 3, md: 3, xs: 2 }}>
              <Grid item container justifyContent="space-between">
                <Grid item>
                  <Grid container gap={2}>
                    <Grid item className={`${classes.iconWrapper} ${classes.greenNotificationBg}`}>
                      <NotificationsActiveIcon className={classes.notificationIcon} />
                    </Grid>

                    <Grid item direction="column">
                      <Typography variant="h5">{data && appointmentStats.totalUpcoming}</Typography>

                      <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                        Total Upcoming
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Grid item className={`${classes.iconWrapper} ${classes.greenNotificationBg}`}>
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
  );
};

DashboardCharts.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
};

export default DashboardCharts;
