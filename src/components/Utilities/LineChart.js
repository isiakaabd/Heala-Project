import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Line } from "react-chartjs-2";
import { monthNames } from "components/Utilities/Time";

const LineChart2 = ({ graphState, optionsValue, type, opt }) => {
  const theme = useTheme();
  const [state, setState] = useState("");
  // const lightGold = "rgba(243, 173, 83,.04)";
  const lightRed = "linear-gradient(to bottom, #3E5EA9 4%, #FFFFFF 88%)";
  // const lightGreen = "rgba(45, 211, 158, .04)";
  // const gold = theme.palette.common.gold;
  const [arr, setArr] = useState([]);
  useEffect(() => {
    setState(opt);
  }, [opt]);

  const active = useMemo(
    () => graphState?.data?.active?.map((i) => i?.sum),
    [graphState?.data?.active]
  );
  const all = useMemo(
    () => graphState?.data?.all?.map((i) => i?.sum),
    [graphState?.data?.all]
  );
  const inactive = useMemo(
    () => graphState?.data?.inactive?.map((i) => i?.sum),
    [graphState?.data?.inactive]
  );
  const complete = useMemo(
    () => graphState?.data?.complete?.map((i) => i?.sum),
    [graphState?.data?.complete]
  );
  const accept = useMemo(
    () => graphState?.data?.accept?.map((i) => i?.sum),
    [graphState?.data?.accept]
  );
  const cancel = useMemo(
    () => graphState?.data?.cancel?.map((i) => i?.sum),
    [graphState?.data?.cancel]
  );
  const decline = useMemo(
    () => graphState?.data?.decline?.map((i) => i?.sum),
    [graphState?.data?.decline]
  );
  const pharmacy = useMemo(
    () => graphState?.data?.pharmacy?.map((i) => i?.sum),
    [graphState?.data?.pharmacy]
  );
  const hospital = useMemo(
    () => graphState?.data?.hospital?.map((i) => i?.sum),
    [graphState?.data?.hospital]
  );
  const diagnostic = useMemo(
    () => graphState?.data?.diagnostic?.map((i) => i?.sum),
    [graphState?.data?.diagnostic]
  );
  const earning = useMemo(
    () => graphState?.data?.earning?.map((i) => i?.sum),
    [graphState?.data?.earning]
  );
  const payout = useMemo(
    () => graphState?.data?.payout?.map((i) => i?.sum),
    [graphState?.data?.payout]
  );
  const ongoing = useMemo(
    () => graphState?.data?.ongoing?.map((i) => i?.sum),
    [graphState?.data?.ongoing]
  );

  useEffect(() => {
    if (type === "consultation") {
      setArr([accept, complete, decline, ongoing, cancel]);
      switch (state) {
        case "all":
          return setArr(accept);
        case "Accepted":
          return setArr(accept);
        case "Completed":
          return setArr(complete);
        case "Declined":
          return setArr(decline);
        case "Ongoing":
          return setArr(ongoing);
        case "Cancelled":
          return setArr(cancel);
        default:
          return setArr(accept);
        // setArr([active, inactive]);
      }
    } else if (type === "partners") {
      setArr([hospital, pharmacy, diagnostic]);
      switch (state) {
        case "all":
          return setArr(all);
        case "hospital":
          return setArr(hospital);
        case "pharmacy":
          return setArr(pharmacy);
        case "diagnostic":
          return setArr(diagnostic);
        default:
          return setArr(all);
      }
    } else if (type === "finance") {
      setArr([earning, payout]);
      switch (state) {
        case "all":
          return setArr(earning);
        case "Earnings":
          return setArr(earning);
        case "Payouts":
          return setArr(payout);
        default:
          return setArr(earning);
      }
    } else {
      switch (state) {
        case "all":
          return setArr(active);
        case "active":
          return setArr(active);
        case "inactive":
          return setArr(inactive);
        default:
          return setArr(active);
      }
    }
  }, [
    graphState,
    state,
    all,
    diagnostic,
    pharmacy,
    hospital,
    type,
    decline,
    active,
    ongoing,
    cancel,
    earning,
    payout,
    accept,
    complete,
    inactive,
  ]);

  const lx = optionsValue.map((i) => {
    let x;
    const { value } = i;

    if (value === opt) {
      x = {
        label: value,
        data: arr,
        fill: true,
        color: "#f00",
        borderColor: theme.palette.common.red,

        pointBackgroundColor: theme.palette.common.red,
        pointBorderColor: "#fff",
        pointRadius: 2,
        // backgroundColor:

        //   lightRed,
        // background: "rgb(255,255,255)";
        // background:
        //   "linear-gradient(356deg, rgba(255,255,255,1) 38%, rgba(252,242,219,1) 38%)",
        pointHoverRadius: 2,
        pointBorderWidth: 2,
        tension: 0.5,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;

          const gradient = ctx.createLinearGradient(0, 0, 0, 330);
          gradient.addColorStop(0, "rgba(62, 94, 209, .05)");
          gradient.addColorStop(1, "rgba(255,255,255,0.3)");
          return gradient;
        },
      };
    } else return null;
    return x;
  });
  const j = lx.filter((n) => n);

  const data = {
    labels: monthNames,
    backgroundColor: "#fff",
    datasets: [...j],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    backgroundColor: "#f3f3f3",
    locale: "fr",
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
        min: 0,
        grid: {
          color: "rgba(0,0,0,0.05)",
          borderColor: "rgba(0,0,0,0.05)",
          borderDash: [10, 10],
          speechSynthesis: true,
          display: true,
        },
      },
      x: {
        grid: {
          color: "#fff",
          borderDash: [2, 2],
          borderColor: "rgba(0,0,0,0.05)",
          display: false,
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
        bodyColor: "rgba(0, 0, 0, 1)",
        titleAlign: "left",
        bodyAlign: "left",
        borderColor: "rgba(0, 0, 0, 0.05)",
        borderWidth: 3,
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
  function hover(event) {
    const x = (event.target.style.cursor = "pointer");
    return x;
  }
  function colorItem(tooltipItem) {
    const tooltipTitleColor =
      tooltipItem.tooltip.labelColors[0].backgroundColor;

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
  optionsValue: PropTypes.array,
  type: PropTypes.string,
  selectedTimeframe: PropTypes.number,
  setSelectedTimeframe: PropTypes.func,
  doctorStats: PropTypes.array,
  graphState: PropTypes.object,
  opt: PropTypes.object,
};

export default LineChart2;
