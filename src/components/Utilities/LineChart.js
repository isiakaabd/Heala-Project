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

const LineChart = ({ selectedTimeframe, setSelectedTimeframe, doctorStats, type }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [actives, setActives] = useState([]);
  // const [results, setResults] = useState([]);
  const [inActives, setInActives] = useState([]);
  // const [times, setTimes] = useState([]);

  useEffect(() => {
    const doc = doctorStats.oneYear;
    if (doc.inactiveCount) {
      const z = doc.inactiveCount.map((i) => i.count);
      setInActives(z);
    }
    const z = doc.activeCount.map((i) => i.count);
    setActives(z);
  }, [doctorStats, type]);
  const data = {
    labels: ["ONE DAY", "FIVE DAYS", "ONE MONTH", "THREE MONTHS", "ONE YEAR"],
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
    console.log(event);

    event.target.style.cursor = chartElement[0] ? "pointer" : "default";
  }
  function colorItem(tooltipItem) {
    const tooltipTitleColor = tooltipItem.tooltip.labelColors[0].backgroundColor;

    return tooltipTitleColor;
  }
  return (
    <Grid item container>
      <Grid item container sx={{ maxWidth: "100%" }}>
        <Line data={data} options={options} />;
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
                    className={`${classes.chip} ${
                      selectedTimeframe === timeFrame.id ? classes.active : undefined
                    }`}
                    onClick={() => setSelectedTimeframe(timeFrame.id)}
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
  selectedTimeframe: PropTypes.number,
  setSelectedTimeframe: PropTypes.func,
  type: PropTypes.string,
  doctorStats: PropTypes.array,
};

export default LineChart;
