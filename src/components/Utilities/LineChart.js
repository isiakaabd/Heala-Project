import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
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
  selectedTimeframe,
  setSelectedTimeframe,
  tooltipTitle,
  doctorStats,
  type,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [results, setResults] = useState([]);
  useEffect(() => {
    let result =
      type === "subscriber"
        ? doctorStats &&
          Object.keys(doctorStats)
            .map((key) => doctorStats[key])
            .filter((element) => {
              return element !== undefined;
            })
        : doctorStats &&
          Object.keys(doctorStats)
            .map((key) => doctorStats[key].count)
            .filter((element) => {
              return element !== undefined;
            });
    setResults(result);

    // setResults(result);
  }, [doctorStats, type]);

  const data = {
    labels: ["0", ".4", "0.6", "1.2", "1.6", "2"],
    datasets: [
      {
        label: "Active",
        data: results,
        fill: false,
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
        data: results,
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
  console.log(results);
  const options = {
    locale: "fr",
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.12)",
          borderDash: [5, 8],
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
        bodyColor: theme.palette.common.lightGrey,
        titleAlign: "center",
        bodyAlign: "center",
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 2,
        displayColors: true,
        boxHeight: 0,
        boxWidth: 0,
        yAlign: "bottom",
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            return tooltipTitle;
          },
          label: (context) => {
            return new Date().toString().slice(0, 21);
          },
          labelPointStyle: (context) => {
            return {
              pointStyle: "triangle",
              rotation: 0,
            };
          },
        },
      },
    },
  };

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

              .map((timeFrame) => (
                <Grid item key={timeFrame.id}>
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
  tooltipTitle: PropTypes.string,
  type: PropTypes.string,
  doctorStats: PropTypes.object,
};

export default LineChart;
