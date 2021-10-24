import React, { Fragment } from "react";
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

const LineChart = ({ timeFrames, selectedTimeframe, setSelectedTimeframe, tooltipTitle }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    labels: ["0", "500", "1000", "1500", "2000", "2500"],
    datasets: [
      {
        label: "Active",
        data: ["200", "700", "500", "1200", "1000", "1400"],
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
        data: ["300", "200", "100", "700", "500", "400"],
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
    <Fragment>
      <Grid>
        <Line data={data} options={options} />;
      </Grid>
      <Grid item>
        <Grid container justifyContent="space-evenly" className={classes.intervalButtonsGrid}>
          {timeFrames.map((timeFrame) => (
            <Grid item key={timeFrame.id}>
              <Chip
                label={timeFrame.time}
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
    </Fragment>
  );
};

LineChart.propTypes = {
  timeFrames: PropTypes.array.isRequired,
  selectedTimeframe: PropTypes.number.isRequired,
  setSelectedTimeframe: PropTypes.func.isRequired,
  tooltipTitle: PropTypes.string.isRequired,
};

export default LineChart;
