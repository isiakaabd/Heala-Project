import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import GroupIcon from "@mui/icons-material/Group";
import { CustomSelect } from "components/validation/Select";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownwardOutlined } from "@mui/icons-material";
import {
  consultationsOptions,
  returnpercent,
  financeOptions,
  partnerOptions,
  partnersOptions,
  roundUp,
  newOptions,
  formatNumber,
} from "components/Utilities/Time";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  FormSelect,
  CircularChart,
  CircularProgressBar,
} from "components/Utilities";
import { CardItem } from "components/layouts";
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
    width: 5,
    height: 5,
    borderRadius: "100%",
  },
  red: {
    background: theme.palette.common.red,
  },
  green: {
    background: theme.palette.common.green,
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
  const [totalConsultations, setTotalConsultations] = useState("");
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalPayouts, setTotalPayouts] = useState(0);
  const [partnersData, setPartnersData] = useState([]);
  const [activeSubsNumber, setActiveSubsNumber] = useState(0);
  const [inActiveSubsNumber, setInActiveSubsNumber] = useState(0);
  const [consultationState, setConsultationState] = useState({
    state: "all",
    data: {
      all: data?.consultationStats.chartData,
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
      all: data?.doctorStats?.chartData,
      active: data?.doctorStats.activeChartData,
      inactive: data?.doctorStats.inactiveChartData,
    },
  });
  const [subScriptionState, setSubScriptionState] = useState({
    state: "all",
    data: {
      all: data?.subscriptionStats?.chartData,
      active: data?.subscriptionStats.activeChartData,
      inactive: data?.subscriptionStats.inactiveChartData,
    },
  });
  const [patientGraphState, setPatientGraphState] = useState({
    state: "all",
    data: {
      all: data?.patientStats.chartData,
      active: data?.patientStats.activeChartData,
      inactive: data?.patientStats.inactiveChartData,
    },
  });
  const [financialState, setFinancialState] = useState({
    state: "all",
    data: {
      earning: data?.earningStats?.chartData,
      payout: data?.payoutStats?.chartData,
    },
  });
  const [partnerGraphState, setPartnerGraphState] = useState({
    state: "all",
    data: {
      all: data?.partnerStats.chartData,
      hospital: data?.partnerStats.hospitalChartData,
      diagnostic: data?.partnerStats.diagnosticsChartData,
      pharmacy: data?.partnerStats.pharmacyChartData,
    },
  });

  const consultationFunc = (e) => {
    const { value } = e.target;
    switch (value) {
      case "Cancelled":
        return setConsultationState({
          ...consultationState,
          state: "Cancelled",
        });

      case "Accepted":
        return setConsultationState({
          ...consultationState,
          state: "Accepted",
        });

      case "Ongoing":
        return setConsultationState({
          ...consultationState,
          state: "Ongoing",
        });

      case "Completed":
        return setConsultationState({
          ...consultationState,
          state: "Completed",
        });

      case "Declined":
        return setConsultationState({
          ...consultationState,
          state: "Declined",
        });
      case "all":
        return setConsultationState({
          ...consultationState,
          state: "all",
        });
      default:
        setConsultationState({
          ...consultationState,
          state: "all",
        });
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

  const financeFunc = async (e) => {
    const { value } = e.target;
    switch (value) {
      case "Earnings":
        return setFinancialState({
          ...financialState,
          state: "Earnings",
        });
      case "Payouts":
        return setFinancialState({
          ...financialState,
          state: "Payouts",
        });
      case "all":
        return setFinancialState({
          ...financialState,
          state: "all",
        });
    }
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
    setActiveSubsNumber(subscriptionStats?.totalActive);
    setInActiveSubsNumber(subscriptionStats?.totalInactive);
    setTotalSub(
      subscriptionStats?.totalActive + subscriptionStats?.totalInactive
    );

    //eslint-disable-next-line
  }, [data]);

  const {
    totalAccepted,
    totalCancelled,
    totalOngoing,
    totalDeclined,
    totalCompleted,
  } = totalConsultations;
  const total =
    totalAccepted +
    totalCancelled +
    totalOngoing +
    totalDeclined +
    totalCompleted;
  const { totalActive: activeDoctors, totalInactive: inactiveDoctors } =
    doctorStats;
  const { totalActive: activePatients, totalInactive: inactivePatients } =
    patients;
  const totalDoc = activeDoctors + inactiveDoctors;
  const totalPatient = activePatients + inactivePatients;
  const [partnersState, setPartnersState] = useState("Patients");
  const patientPercentage = returnpercent(activePatients, inactivePatients);
  const doctorPercentage = returnpercent(activeDoctors, inactiveDoctors);
  const [amount, setAmount] = useState([
    {
      name: "Total Earnings",
      value: 0,
    },
    {
      name: "Total Payouts",
      value: 0,
    },
  ]);
  const [cardState, setCardState] = useState([
    {
      id: 1,
      name: "Total Doctors",
      percentageValue: 0,
      value: 0,
    },
    {
      id: 2,
      name: "Total Patients",
      percentageValue: 0,
      value: 0,
    },
    {
      id: 4,
      name: "Total Consultations",
      percentageValue: 0,
      value: 0,
    },
    {
      id: 3,
      name: "Total Partners",
      percentageValue: 0,
      value: 0,
    },
  ]);
  const [state, setState] = useState(patientGraphState);
  const [options, setOptions] = useState("all");
  const handleStateChange = (e) => {
    const { value } = e.target;
    console.log(value);
    switch (value) {
      case "Patients":
        setState(patientGraphState);
        setPartnersState("Patients");
        break;
      case "Doctors":
        setState(graphState);
        setPartnersState("Doctors");
        break;
      case "Consultations":
        setState(consultationState);
        setPartnersState("Consultations");
        break;
      case "Partners":
        setState(partnerGraphState);
        setPartnersState("Partners");
        break;
      default:
        setState(patientGraphState);
        setPartnersState("Patients");
    }
  };
  useEffect(() => {
    setCardState([
      {
        id: 1,
        name: "Total Doctors",
        percentageValue: doctorPercentage,
        value: totalDoc,
      },
      {
        id: 2,
        name: "Total Patients",
        percentageValue: patientPercentage,
        value: totalPatient,
      },
      {
        id: 4,
        name: "Total Consultations",
        percentageValue: 0.5,
        value: total,
      },
      {
        id: 3,
        name: "Total Partners",
        percentageValue: 0.5,
        value: partnersData?.total,
      },
    ]);

    setAmount([
      {
        name: "Total Earnings",
        value: formatNumber(totalEarning),
        color: "green",
      },
      {
        name: "Total Payouts",
        value: formatNumber(totalPayouts),
        color: "red",
      },
    ]);
  }, [
    totalPatient,
    total,
    patientPercentage,
    doctorPercentage,
    partnersData?.total,
    totalDoc,
    totalEarning,
    totalPayouts,
  ]);
  const handleOptionChange = (e) => {
    const { value } = e.target;
    setOptions(value);
  };
  const percentageValue = 0.5;
  return (
    <Grid container gap={2}>
      {/* Top cards */}
      <Grid item container gap={2} flexWrap="nowrap">
        {cardState?.map((item) => {
          return (
            <Grid item xs={3}>
              <CardItem key={item.id} value={item} />
            </Grid>
          );
        })}
      </Grid>

      <Grid item container gap={2} flexWrap="nowrap">
        <Grid item xs={8}>
          <Card
            width="100%"
            variant="outlined"
            sx={{ p: 2, borderColor: "transparent", borderRadius: "15px" }}
          >
            <Grid
              item
              container
              justifyContent="space-between"
              flexWrap="nowrap"
              sx={{ mb: 2 }}
            >
              <Grid item xs={2}>
                <CustomSelect
                  variant="small"
                  value={partnersState}
                  onChange={handleStateChange}
                  options={partnersOptions}
                  name="partners"
                />
              </Grid>
              <Grid item xs={2}>
                <CustomSelect
                  variant="small"
                  value={options}
                  onChange={handleOptionChange}
                  options={
                    partnersState === "Partners"
                      ? partnerOptions
                      : partnersState === "Consultations"
                      ? consultationsOptions
                      : newOptions
                  }
                  name="graph"
                />
              </Grid>
            </Grid>
            <LineChart
              graphState={state}
              optionsValue={
                partnersState === "Partners"
                  ? partnerOptions
                  : partnersState === "Consultations"
                  ? consultationsOptions
                  : newOptions
              }
              type={
                partnersState === "Partners"
                  ? "partners"
                  : partnersState === "Consultations"
                  ? "consultation"
                  : ""
              }
              opt={options}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sx={{ height: "100%" }}>
          <Card
            variant="outlined"
            sx={{
              borderColor: "transparent",
              height: "100%",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* <Grid container> */}
            <Grid item container alignItems="center" sx={{ p: 2.5 }}>
              <Grid item flex={1}>
                <Typography
                  sx={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    lineHeight: "25px",
                    letterSpacing: "-0.01em",
                    color: "#010101",
                  }}
                >
                  Financial Stats
                </Typography>
              </Grid>
              <Grid item>
                <CustomSelect
                  variant="small"
                  value={partnersState}
                  onChange={handleStateChange}
                  options={partnersOptions}
                  name="partners"
                />
              </Grid>
            </Grid>
            <Divider sx={{ paddingBlock: 1 }} />
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              container
              sx={{ p: 3 }}
            >
              <CircularProgressBar
                height="15rem"
                width="15rem"
                color={theme.palette.common.green}
                trailColor={theme.palette.common.red}
                value={30}
              />
            </Grid>

            {amount.map((item) => {
              const { color, value, name } = item;
              return (
                <Grid item container sx={{ p: 2.5 }} flexWrap="nowrap">
                  <Grid flex={1}>
                    <Grid container alignItems="center" gap={1}>
                      <div
                        className={`${classes.dottedCircle}
                         ${classes.red}`}
                      />
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontSize: "1.4rem",
                          lineHeight: "20px",
                          color: "#606060",
                        }}
                      >
                        {name}
                      </Typography>
                      <Grid
                        item
                        sx={{
                          borderRadius: "100px",
                          color:
                            percentageValue < 1
                              ? "#ED3237"
                              : theme.palette.success.main,
                          backgroundColor:
                            percentageValue < 1
                              ? "rgba(237, 50, 55, 0.1)"
                              : "rgba(62, 165, 132, 0.1)",
                          padding: "3px 8px",
                        }}
                      >
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            variant="span"
                            sx={{ fontWeight: 500, fontSize: "1rem" }}
                          >
                            {"0.5"}
                          </Typography>
                          {percentageValue < 1 ? (
                            <ArrowDownwardOutlined sx={{ color: "inherit" }} />
                          ) : (
                            <ArrowUpwardIcon color="inherit" />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item justifySelf="center">
                    <Grid container>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "1.6rem",
                          lineHeight: "20px",
                          color: "#3F3F3F",
                        }}
                      >
                        NGN {value}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            {/* </Grid> */}
          </Card>
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
