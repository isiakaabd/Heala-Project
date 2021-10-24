import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import chart1 from "assets/images/chart1.png";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import FormSelect from "components/Utilities/FormSelect";
import { CircularProgressBar } from "components/Utilities/CircularProgress";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LineChart from "components/Utilities/LineChart";
import "chartjs-plugin-style";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    "&.MuiGrid-root": {
      // maxWidth: "42rem",
    },
  },
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

const selectOptions = ["One day", "Five Days", "One Month", "Three Months", "One Year"];

const DashboardCharts = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [selectedTimeframe, setSelectedTimeframe] = useState(0);
  const [timeframeOption, setTimeframeOption] = useState("");

  const timeFrames = [
    { id: 0, time: "One Day" },
    { id: 1, time: "Five Days" },
    { id: 2, time: "One Month" },
    { id: 3, time: "Three Months" },
    { id: 4, time: "One Year" },
  ];

  return (
    <Grid container style={{ marginBottom: "5rem" }} justifyContent="space-between" spacing={5}>
      <Grid item md>
        <Grid container direction="column">
          <Grid item className={classes.chartCard} style={{ marginBottom: "3em" }}>
            <Grid container direction="column">
              <Grid item className={classes.headerGrid}>
                <Typography variant="h5">HCP Stats</Typography>
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
                        <Typography variant="h1">3000</Typography>
                      </Grid>
                      <Grid item style={{ marginRight: "0.5rem" }}>
                        <ArrowUpwardIcon color="success" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" style={{ color: theme.palette.success.main }}>
                          2.76%
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <img src={chart1} alt="Arc chart" />
                  </Grid>
                </Grid>
              </Grid>
              <Divider color={theme.palette.common.lighterGrey} />
              <Grid item container direction="column" className={classes.bottomChartGrid}>
                <LineChart
                  timeFrames={timeFrames}
                  selectedTimeframe={selectedTimeframe}
                  setSelectedTimeframe={setSelectedTimeframe}
                  tooltipTitle="1800 HCPs"
                />
                <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h3" gutterBottom>
                          1800
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
                              Total active HCPs
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
                          1200
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
                              Total inactive HCPs
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
                      placeholderText="Select days"
                      options={selectOptions}
                      value={timeframeOption}
                      onChange={(event) => setTimeframeOption(event.target.value)}
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
                      value={65}
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
                              700,000
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.lightGrey }}
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
                              600,000
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.lightGrey }}
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
                            <Typography variant="h4">12</Typography>
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
                            <Typography variant="h4">24</Typography>
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
                  <Grid item className={classes.groupIconGrid}>
                    <GroupIcon color="success" className={classes.groupIcon} />
                  </Grid>
                  <Grid item style={{ margin: "0 0.5rem 0 1rem" }}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h1">3000</Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total Patients
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: "0.5rem" }}>
                    <ArrowUpwardIcon color="success" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.success.main }}>
                      2.76%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <img src={chart1} alt="Arc chart" />
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item className={classes.headerGrid}></Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item container direction="column" className={classes.bottomChartGrid}>
            <LineChart
              timeFrames={timeFrames}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
              tooltipTitle="1800 Patients"
            />

            <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3" gutterBottom>
                      1700
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
                      700
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
              tooltipTitle="900 Subscribers"
            />
            <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3" gutterBottom>
                      900
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
                      800
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
export default DashboardCharts;
