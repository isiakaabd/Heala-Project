import React, { useState } from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import t from "prop-types";
import styled from "styled-components";

const DataToggleHolder = styled.div`
  display: flex;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  font-family: "Graphik-Regular", sans-serif;
  font-size: 12px;
  color: #44a798;
  background: #ecf6f3;
  opacity: 0.5;
  border-radius: 20px;
  padding: 6px 7px;

  p {
    padding: 4px 12px;
    cursor: pointer;
    background: #fff;
    color: #2d2f39;
    flex: 1;
    margin-left: 8px;
    text-align: center;
    border-radius: 20px;
    font-size: 8px;
    white-space: pre;
    font-weight: 600;

    &:hover,
    &.selected {
      color: #fff;
      background: #3ea584;
    }
  }
`;

const ResponsiveHolder = styled.div`
  width: 100%;
  height: 217px;
`;

const LineGraph = ({ data }) => {
  const [chartMode, setChartMode] = useState("FIVE_DAYS");
  console.log(data);
  return (
    <ResponsiveHolder>
      <LineChart
        width={400}
        height={250}
        data={data[chartMode]}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#3EA584" />
        <Line type="monotone" dataKey="uv" stroke="#ED3237" />
      </LineChart>
      <DataToggleHolder>
        <p
          className={chartMode === "ONE_DAY" ? "selected" : ""}
          onClick={() => setChartMode("ONE_DAY")}
        >
          One Day
        </p>
        <p
          className={chartMode === "FIVE_DAYS" ? "selected" : ""}
          onClick={() => setChartMode("FIVE_DAYS")}
        >
          Five Days
        </p>
        <p
          className={chartMode === "ONE_MONTH" ? "selected" : ""}
          onClick={() => setChartMode("ONE_MONTH")}
        >
          One Month
        </p>
        <p
          className={chartMode === "THREE_MONTHS" ? "selected" : ""}
          onClick={() => setChartMode("THREE_MONTHS")}
        >
          Three Months
        </p>
        <p
          className={chartMode === "ONE_YEAR" ? "selected" : ""}
          onClick={() => setChartMode("ONE_YEAR")}
        >
          One Year
        </p>
      </DataToggleHolder>
    </ResponsiveHolder>
  );
};

LineGraph.propTypes = {
  data: t.object.isRequired,
};

export default LineGraph;
