import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import GroupIcon from "@mui/icons-material/Group";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownwardOutlined } from "@mui/icons-material";
import {
  financialPercent,
  consultationsOptions,
  returnpercent,
  selectOptions,
  partnerOptions,
  newOptions,
  formatNumber,
} from "components/Utilities/Time";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
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
  gold: {
    borderColor: theme.palette.common.gold,
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

const DashboardCharts = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [patients, setPatients] = useState([]);
  const [doctorStats, setDoctorStats] = useState([]);
  const [totalSubs, setTotalSub] = useState(0);
  const [payoutArray, setPayoutArray] = useState([]);
  const [earningArray, setEarningArray] = useState([]);
  const [totalConsultations, setTotalConsultations] = useState("");
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalPayouts, setTotalPayouts] = useState(0);
  const [partnersData, setPartnersData] = useState([]);
  const [activeSubsNumber, setActiveSubsNumber] = useState(0);
  const [inActiveSubsNumber, setInActiveSubsNumber] = useState(0);
  const [consultationState, setConsultationState] = useState({
    state: "all",
    data: {
      complete: data?.consultationStats.completedChartData,
      ongoing: data?.consultationStats.ongoingChartData,
      accept: data?.consultationStats.acceptedChartData,
      decline: data?.consultationStats.declinedChartData,
      cancel: data?.consultationStats.cancelledChartData,
    },
  });

  const [graphState, setGraphState] = useState({
    state: "all",
    data: {
      active: data?.doctorStats.activeChartData,
      inactive: data?.doctorStats.inactiveChartData,
    },
  });
  const [subScriptionState, setSubScriptionState] = useState({
    state: "all",
    data: {
      active: data?.subscriptionStats.activeChartData,
      inactive: data?.subscriptionStats.inactiveChartData,
    },
  });
  const [patientGraphState, setPatientGraphState] = useState({
    state: "all",
    data: {
      active: data?.patientStats.activeChartData,
      inactive: data?.patientStats.inactiveChartData,
    },
  });
  const [partnerGraphState, setPartnerGraphState] = useState({
    state: "all",
    data: {
      hospital: data?.partnerStats.hospitalChartData,
      diagnostic: data?.partnerStats.diagnosticsChartData,
      pharmacy: data?.partnerStats.pharmacyChartData,
    },
  });

  const consultationFunc = (e) => {
    const { value } = e.target;
    switch (value) {
      case "Cancelled":
        setConsultationState({
          ...consultationState,
          state: "Cancelled",
        });
        break;
      case "Accepted":
        setConsultationState({
          ...consultationState,
          state: "Accepted",
        });
        break;
      case "Ongoing":
        setConsultationState({
          ...consultationState,
          state: "Ongoing",
        });
        break;
      case "Completed":
        setConsultationState({
          ...consultationState,
          state: "Completed",
        });
        break;
      case "Declined":
        setConsultationState({
          ...consultationState,
          state: "Declined",
        });
        break;
      default:
    }
  };
  const graphFunc = (e) => {
    const { value } = e.target;
    switch (value) {
      case "active":
        return setGraphState({
          ...graphState,
          state: "active",
        });

      case "inactive":
        return setGraphState({
          ...graphState,
          state: "inactive",
        });

      case "all":
        return setGraphState({
          ...graphState,
          state: "all",
        });
    }
  };
  const patientGraphFunc = (e) => {
    const { value } = e.target;

    switch (value) {
      case "active":
        return setPatientGraphState({
          ...patientGraphState,
          state: "active",
        });
      case "inactive":
        return setPatientGraphState({
          ...patientGraphState,
          state: "inactive",
        });
      case "all":
        return setPatientGraphState({
          ...patientGraphState,
          state: "all",
        });
    }
  };
  const subGraphFunc = (e) => {
    const { value } = e.target;
    switch (value) {
      case "active":
        return setSubScriptionState({
          ...subScriptionState,
          state: "active",
        });
      case "inactive":
        return setSubScriptionState({
          ...subScriptionState,
          state: "inactive",
        });
      case "all":
        return setSubScriptionState({
          ...subScriptionState,
          state: "all",
        });
      default:
        setSubScriptionState({
          ...subScriptionState,
          state: "all",
        });
    }
  };

  const onChange = async (e) => {
    const { value } = e.target;
    setForms(value);
    //eslint-disable-next-line
    earningArray?.map((item) => {
      if (item?.month === value) {
        setTotalEarning(item?.sum);
      }
    });
    //eslint-disable-next-line
    payoutArray?.map((item) => {
      if (item?.month === value) {
        setTotalPayouts(item?.sum);
      }
    });
  };

  const partnerFunc = (e) => {
    const { value } = e.target;

    switch (value) {
      case "hospital":
        return setPartnerGraphState({
          ...partnerGraphState,
          state: "hospital",
        });
      case "diagnostic":
        return setPartnerGraphState({
          ...partnerGraphState,
          state: "diagnostic",
        });
      case "pharmacy":
        return setPartnerGraphState({
          ...partnerGraphState,
          state: "pharmacy",
        });

      case "all":
        return setPartnerGraphState({
          ...partnerGraphState,
          state: "all",
        });
      default:
        setPartnerGraphState({
          ...partnerGraphState,
          state: "all",
        });
    }
  };
  // const consultationFunc = (e) => {
  //   const { value } = e.target;

  //   switch (value) {
  //     case "Cancelled":
  //       setConsultationState({
  //         state: "Cancelled",
  //         data: cancelled,
  //       });
  //       break;
  //     case "Accepted":
  //       setConsultationState({
  //         state: "Accepted",
  //         data: accepted,
  //       });
  //       break;
  //     case "Ongoing":
  //       setConsultationState({
  //         state: "Ongoing",
  //         data: ongoing,
  //       });
  //       break;
  //     case "Completed":
  //       setConsultationState({
  //         state: "Completed",
  //         data: completed,
  //       });
  //       break;
  //     case "Declined":
  //       setConsultationState({
  //         state: "Declined",
  //         data: declined,
  //       });
  //       break;
  //     default:
  //   }
  // };

  useEffect(() => {
    setPayoutArray(data?.payoutStats?.chartData);
    setEarningArray(data?.earningStats?.chartData);
  }, [data]);
  useEffect(() => {
    const {
      patientStats,
      doctorStats,
      consultationStats,
      partnerStats,
      earningStats,
      subscriptionStats,
      payoutStats,
    } = data;
    setPatients(patientStats);
    setDoctorStats(doctorStats);
    setTotalConsultations(consultationStats);
    setPartnersData(partnerStats);
    setTotalEarning(earningStats?.total);
    setTotalPayouts(payoutStats?.total);
    setPayoutArray(payoutStats?.chartData);
    setEarningArray(earningStats?.chartData);
    setActiveSubsNumber(subscriptionStats?.totalActive);
    setInActiveSubsNumber(subscriptionStats?.totalInactive);
    setTotalSub(subscriptionStats?.totalActive + subscriptionStats?.totalInactive);
    const value = financialPercent(totalEarning, totalPayouts);

    setFinances(value);
    //eslint-disable-next-line
  }, [data]);

  const { totalAccepted, totalCancelled, totalOngoing, totalDeclined, totalCompleted } =
    totalConsultations;
  const financialValue = financialPercent(totalEarning, totalPayouts);
  const total = totalAccepted + totalCancelled + totalOngoing + totalDeclined + totalCompleted;
  const [finances, setFinances] = useState(financialValue);
  const { totalActive: activeDoctors, totalInactive: inactiveDoctors } = doctorStats;
  const { totalActive: activePatients, totalInactive: inactivePatients } = patients;
  const totalDoc = activeDoctors + inactiveDoctors;
  const totalPatient = activePatients + inactivePatients;
  const patientPercentage = returnpercent(activePatients, inactivePatients);
  const doctorPercentage = returnpercent(activeDoctors, inactiveDoctors);
  const [forms, setForms] = useState("");

  return (
    <Grid
      container
      justifyContent="space-between"
      display="grid"
      padding=".5rem" //repeat(auto-fit, minmax(250px, 1fr));
      gridTemplateColumns={{ sm: "repeat(2,1fr)", xs: "1fr" }}
      gap={2}
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
            <FormSelect
              value={graphState?.state}
              onChange={graphFunc}
              options={newOptions}
              name="graph"
            />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart graphState={graphState} optionsValue={newOptions} />

          {/* Line */}
          <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h3" gutterBottom>
                    {doctorStats?.totalActive}
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
                    {doctorStats?.totalInactive}
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

          <Grid item display={{ sm: "block", xs: "none" }}>
            <FormSelect
              value={patientGraphState?.state}
              onChange={patientGraphFunc}
              options={newOptions}
              name="graph"
            />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart graphState={patientGraphState} optionsValue={newOptions} />

          {/* Line */}
          <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="h3" gutterBottom>
                    {data && patients.totalActive}
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
                    {patients?.totalInactive}
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
      {/* partners */}
      <Grid item container className={classes.chartCard}>
        <Grid item className={classes.headerGrid}>
          <Typography variant="h5">Partners Stats</Typography>
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
                  <Typography variant="h1">{data && partnersData.total}</Typography>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey, whiteSpace: "nowrap" }}
              >
                Total Partners
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <FormSelect
              value={partnerGraphState?.state}
              onChange={partnerFunc}
              options={partnerOptions}
              name="partner-select"
            />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart graphState={partnerGraphState} optionsValue={partnerOptions} type="partners" />
        </Grid>
        <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  {data?.partnerStats?.totalHospitals}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Hospitals
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
                  {data?.partnerStats?.totalPharmacies}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.red}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Pharmacies
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
                  {data?.partnerStats?.totalDiagnostics}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.gold}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Diagnostics
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.chartCard}>
        <Grid item className={classes.headerGrid}>
          <Typography variant="h5">Consultations Stats</Typography>
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
                  <Typography variant="h1">{data && total}</Typography>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey, whiteSpace: "nowrap" }}
              >
                Total Consultations
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <FormSelect
              value={consultationState?.state}
              onChange={consultationFunc}
              options={consultationsOptions}
              name="consulation-select"
            />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart
            graphState={consultationState}
            optionsValue={consultationsOptions}
            type="consultation"
          />
        </Grid>
        <Grid item container justifyContent="space-between" paddingTop={{ sm: 3, xs: 2 }}>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  {data?.consultationStats?.totalAccepted}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Accepted
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
                  {data?.consultationStats?.totalCompleted}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.green}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Completed
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
                  {data?.consultationStats?.totalCancelled}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.gold}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Cancelled
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
                  {data?.consultationStats?.totalDeclined}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.gold}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Declined
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
                  {data?.consultationStats?.totalOngoing}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item style={{ marginRight: "1rem" }}>
                    <div className={`${classes.dottedCircle} ${classes.red}`}></div>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ color: theme.palette.common.lightGrey }}>
                      Ongoing
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container className={classes.chartCard}>
        <Grid item className={classes.headerGrid}>
          <Typography variant="h5">Subscribers Stats</Typography>
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
                  <Typography variant="h1"> {totalSubs}</Typography>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                style={{ color: theme.palette.common.lightGrey, whiteSpace: "nowrap" }}
              >
                Total Subscribers
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <FormSelect
              value={subScriptionState?.state}
              onChange={subGraphFunc}
              options={newOptions}
              name="partner-select"
            />
          </Grid>
        </Grid>

        <Divider color={theme.palette.common.lighterGrey} />
        <Grid item container marginY={{ sm: 3, md: 3, xs: 2 }} direction="column">
          <LineChart graphState={subScriptionState} optionsValue={newOptions} />

          {/* Line */}
        </Grid>
        <Grid
          item
          container
          flexWrap="nowrap"
          justifyContent="space-between"
          paddingTop={{ sm: 3, xs: 2 }}
        >
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h3" gutterBottom>
                  {data && activeSubsNumber}
                </Typography>
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
                  {data && inActiveSubsNumber}
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
      {/* financial */}
      <Grid item direction="column" className={classes.chartCard}>
        <Grid
          item
          container
          rowGap={{ sm: 10, xs: 0 }}
          justifyContent="space-between"
          flexDirection={{ xs: "column" }}
        >
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
            justifySelf={{ xs: "center", sm: "space-between" }}
            alignSelf="center"
            sx={{ height: "100%", marginTop: "2rem" }}
            justifyContent="space-between"
            flexWrap={{ sm: "nowrap" }}
            flexDirection={{ xs: "column", sm: "column", md: "column" }}
            alignItems="center"
            rowGap={{ xs: "2rem" }}
            paddingY={{ xs: "1rem" }}
            className={classes.overviewGrid}
          >
            <Grid item marginRight={{ sm: "2rem", md: "2rem" }}>
              <CircularProgressBar
                height="20rem"
                width="20rem"
                color={theme.palette.common.green}
                trailColor={theme.palette.common.red}
                value={finances}
                strokeWidth={8}
              />
            </Grid>
            <Grid
              item
              container
              flexWrap="nowrap"
              alignItems="center"
              flexDirection={{ xs: "row" }}
            >
              <Grid
                item
                container
                gap={{ sm: 2, xs: 1 }}
                alignItems="center"
                justifyContent={{ xs: "center", sm: "center" }}
              >
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
