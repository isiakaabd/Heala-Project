import React from "react";
import styled from "styled-components";

import { H1, H3, H5, P } from "components/Utilities/Texts";
import Card from "@mui/material/Card";
import peopleIcon from "assets/images/people.svg";
import graphData from "mocks/graphData";
import LineGraph from "components/layouts/LineGraph";
import ArrowUpward from "@mui/icons-material/ArrowUpward";

const DashboardHomeStyle = styled.main`
  display: flex;
  flex-direction: column;
`;

const DashboardHome = () => {
  return (
    <DashboardHomeStyle>
      <div className="">
        <H1 fontSize="28px" color="#4F4F4F">
          Dashboard
        </H1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Card style={{ width: "475px", marginTop: "30px" }} className="">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ backgroundColor: "#F2F2F2", padding: "12px" }}>
              <H5 color="#2D2F39">HCP Stats</H5>
            </div>
            <div style={{ padding: "20px", marginTop: "20px", display: "flex" }}>
              <img src={peopleIcon} />
              <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                <H3 fontSize="24px">3000</H3>
                <P fontSize="10px" color="#CCCCCC">
                  Total Patients
                </P>
              </div>
              <div style={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
                <ArrowUpward style={{ color: "#3EA584" }} />
                <P color="#3EA584" fontSize="8px">
                  2.76%
                </P>
              </div>
            </div>

            <div className="" style={{ width: "100%" }}>
              <LineGraph
                // width={500}
                // height={250}
                data={graphData}
              />
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "flex-start",
                padding: "20px",
                marginTop: "50px",
              }}
            >
              <div>
                <CircleRounded />
                <H4>1800</H4>
                <P>Total active HCPs</P>
              </div>
              <div>
                <CircleRounded />
                <H4>1800</H4>
                <P>Total active HCPs</P>
              </div>
            </div> */}
          </div>
        </Card>
        <Card style={{ width: "475px", marginTop: "30px" }} className="">
          <div style={{ backgroundColor: "#F2F2F2", padding: "12px" }}>
            <H5 color="#2D2F39">HCP Stats</H5>
          </div>
          <div style={{ padding: "20px", marginTop: "20px", display: "flex" }}>
            <img src={peopleIcon} />
            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
              <H3 fontSize="24px">3000</H3>
              <P fontSize="10px" color="#CCCCCC">
                Total Patients
              </P>
            </div>
            <div style={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
              <ArrowUpward style={{ color: "#3EA584" }} />
              <P color="#3EA584" fontSize="8px">
                2.76%
              </P>
            </div>
          </div>

          <div className="" style={{ width: "100%" }}>
            <LineGraph
              // width={500}
              // height={250}
              data={graphData}
            />
          </div>
        </Card>
      </div>
    </DashboardHomeStyle>
  );
};

export default DashboardHome;
