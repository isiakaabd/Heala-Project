import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Line } from "react-chartjs-2";

const LineChart2 = ({ graphState }) => {
  const theme = useTheme();
  const [state, setState] = useState("active");
  const [chartData, setChartData] = useState([]);
  const lightGreen = "rgba(45, 211, 158, .3)";
  const lightBlue = "rgba(62, 94, 169, .3)";
  const lightGold = "rgb(243, 173, 83,.3)";
  const gold = theme.palette.common.gold;
  const green = theme.palette.common.green;
  const red = theme.palette.common.red;
  useEffect(() => {
    const z = graphState?.data?.map((i) => i?.sum);
    setState(graphState?.state);
    setChartData(z);
  }, [graphState]);

  // switch (key) {
  //   case value:

  //     break;

  //   default:
  //     break;
  // }
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    backgroundColor: "rgba(90,165,60,0.6)",
    datasets: [
      {
        label: state,
        data: chartData,
        fill: true,
        cursor: "pointer",
        borderColor:
          state === "active" || state === "Completed" || state === "Accepted"
            ? green
            : state === "inactive" || state === "Ongoing"
            ? red
            : gold,
        pointBackgroundColor:
          state === "active" || state === "Completed" || state === "Accepted"
            ? green
            : state === "inactive" || state === "Ongoing"
            ? red
            : gold,
        pointBorderColor:
          state === "active" || state === "Completed" || state === "Accepted"
            ? green
            : state === "inactive" || state === "Ongoing"
            ? red
            : gold,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointHoverColor: "#00f",
        pointBorderWidth: 0.9,
        tension: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    locale: "fr",
    scales: {
      y: {
        beginAtZero: false,
        fillColor: "#fff",
        grid: {
          color: "#fff",
          borderColor:
            state === "active" || state === "Completed" || state === "Accepted"
              ? lightGreen
              : state === "inactive" || state === "Ongoing"
              ? lightBlue
              : lightGold,
          borderDash: [2, 2],
          display: true,
        },
      },
      x: {
        grid: {
          color: "#fff",
          borderDash: [2, 2],
          borderColor:
            state === "active" || state === "Completed" || state === "Accepted"
              ? lightGreen
              : state === "inactive" || state === "Ongoing"
              ? lightBlue
              : lightGold,
          display: true,
        },
        display: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        cursor: "pointer",
        titleColor: colorItem,
        onHover: hover,
        bodyColor:
          state === "active" || state === "Completed" || state === "Accepted"
            ? green
            : state === "inactive" || state === "Ongoing"
            ? red
            : gold,
        // theme.palette.common.lightGrey,
        titleAlign: "left",
        bodyAlign: "left",
        borderColor:
          state === "active" || state === "Completed" || state === "Accepted"
            ? green
            : state === "inactive" || state === "Ongoing"
            ? red
            : gold,
        // "rgba(0, 0, 0, 0.05)",
        borderWidth: 1,
        displayColors: true,
        boxHeight: 0,
        boxWidth: 0,
        yAlign: "top",
        usePointStyle: true,
        callbacks: {
          labelPointStyle: (context) => {
            return {
              pointStyle: "rectangle",
              rotation: 0,
              cursor: "pointer",
            };
          },
        },
      },
    },
  };
  function hover(event, chartElement) {
    const x = (event.target.style.cursor = "pointer");
    return x;
  }
  function colorItem(tooltipItem) {
    const tooltipTitleColor = tooltipItem.tooltip.labelColors[0].backgroundColor;

    return tooltipTitleColor;
  }
  return (
    <Grid item container>
      <Line data={data} options={options} />
    </Grid>
  );
};

LineChart2.propTypes = {
  timeFrames: PropTypes.array,
  selectedTimeframe: PropTypes.number,
  setSelectedTimeframe: PropTypes.func,
  doctorStats: PropTypes.array,
  graphState: PropTypes.object,
};

export default LineChart2;
