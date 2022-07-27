import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { Line } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  intervalButtonsGrid: {
    background: theme.palette.common.lightGreen,
    borderRadius: "20rem",
    padding: ".5rem 0",
  },

  chip: {
    "&.MuiChip-root": {
      background: "#fff",
      fontSize: "1.05rem",
    },
  },

  active: {
    "&.MuiChip-root": {
      background: theme.palette.common.green,
      color: "#fff",
    },
  },
}));

const LineChart = ({
  activeChartData,
  inactiveChartData,
  hospitalChartData,
  doctorStats,
  type,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [actives, setActives] = useState([]);
  const [hospital, setHospital] = useState([]);
  // const [results, setResults] = useState([])
  const [inActives, setInActives] = useState([]);
  // const [times, setTimes] = useState([])

  useEffect(() => {
    if (inactiveChartData) {
      const z = inactiveChartData.map((i) => i?.sum);
      setInActives(z);
    }
    if (activeChartData) {
      const z = activeChartData.map((i) => i?.sum);
      setActives(z);
    }
    if (hospitalChartData) {
      const z = hospitalChartData.map((i) => i?.sum);
      setHospital(z);
    }
  }, [activeChartData, hospitalChartData, inactiveChartData, type]);
  const details = {
    fill: false,
    pointBorderColor: "#fff",
    cursor: "pointer",
    pointRadius: 5,
    pointHoverRadius: 7,
    pointBorderWidth: 2,
    tension: 0.5,
  };
  const partner = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Pharmacy",
        data: actives,
        borderColor: theme.palette.common.green,
        pointBackgroundColor: theme.palette.common.green,
        ...details,
      },
      {
        label: "Diagnostics",
        data: inActives,
        borderColor: theme.palette.common.red,
        pointBackgroundColor: theme.palette.common.red,
        pointBorderColor: "#fff",
        ...details,
      },
      {
        label: "Hospital",
        data: hospital,
        borderColor: theme.palette.common.gold,
        pointBackgroundColor: theme.palette.common.gold,
        ...details,
      },
    ],
  };
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Active",
        data: actives,
        fill: false,
        cursor: "pointer",
        borderColor: theme.palette.common.green,
        pointBackgroundColor: theme.palette.common.green,
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        tension: 0.5,
      },
      {
        label: "Inactive",
        data: inActives,
        fill: false,
        borderColor: theme.palette.common.red,
        pointBackgroundColor: theme.palette.common.red,
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        tension: 0.5,
      },
    ],
  };

  const options = {
    locale: "fr",
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.12)",
          borderDash: [5, 8],
          display: true,
        },
      },
      x: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: colorItem,
        onHover: hover,
        bodyColor: theme.palette.common.lightGrey,
        titleAlign: "left",
        bodyAlign: "left",
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 2,
        displayColors: true,
        boxHeight: 0,
        boxWidth: 0,
        yAlign: "bottom",
        usePointStyle: true,
        callbacks: {
          labelPointStyle: (context) => {
            return {
              pointStyle: "triangle",
              rotation: 0,
              cursor: "pointer",
            };
          },
        },
      },
    },
  };

  function hover(event, chartElement) {
    event.target.style.cursor = chartElement[0] ? "pointer" : "default";
  }
  function colorItem(tooltipItem) {
    const tooltipTitleColor = tooltipItem.tooltip.labelColors[0].backgroundColor;

    return tooltipTitleColor;
  }
  return (
    <Grid item container justifyContent="center">
      <Grid item container>
        <Line data={type === "partner" ? partner : data} options={options} />
      </Grid>
      <Grid item container>
        <Grid container justifyContent="space-evenly" className={classes.intervalButtonsGrid}>
          {doctorStats &&
            Object.keys(doctorStats)
              .filter((timeFrame) => timeFrame != "activeDoctors" && timeFrame != "inactiveDoctors")
              .filter(
                (timeFrame) => timeFrame != "activePatients" && timeFrame != "inactivePatients",
              )
              .filter(
                (timeFrame) =>
                  timeFrame != "totalActiveSubscribers" && timeFrame != "totalInactiveSubscribers",
              )
              .map((timeFrame, index) => (
                <Grid item key={index}>
                  <Chip
                    label={timeFrame}
                    color={timeFrame === timeFrame.id ? "success" : undefined}
                    clickable
                    //   className={`${classes.chip} ${
                    //     selectedTimeframe === timeFrame.id ? classes.active : undefined
                    //   }`}
                    //   onClick={() => setSelectedTimeframe(timeFrame.id)}
                    //
                  />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

LineChart.propTypes = {
  timeFrames: PropTypes.array,
  activeChartData: PropTypes.array,
  hospitalChartData: PropTypes.array,
  inactiveChartData: PropTypes.array,
  selectedTimeframe: PropTypes.number,
  setSelectedTimeframe: PropTypes.func,
  type: PropTypes.string,
  doctorStats: PropTypes.array,
};

export default LineChart;
