import React from "react";
import IconLabelButtons from "./Utilities/Button";
import SearchContainer from "./Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "./Utilities/DataGrid";
import { rows, Subscriptioncolumns } from "./Utilities/DataHeader";
import Styled from "styled-components";
import { AppBar } from "@mui/material";

function SubscriptionPlans() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "#fbfbfb",
      }}
    >
      <Box
        sx={{
          width: "100.7rem",
          height: "5.7rem",
          flexGrow: 1,
          marginLeft: "4.1rem",
          marginRight: "4.5rem",
        }}
      >
        <Grid
          container
          sx={{
            display: "-webkit-box",
            flexWrap: "nowrap",
          }}
        >
          <Grid item sx={{ marginRight: "5rem", width: "76.7rem" }}>
            <SearchContainer placeholder="Enter your Email Here" height="inherit" />
          </Grid>

          <Grid item xs={3}>
            <IconLabelButtons
              placeholder="Create new plan"
              height="inherit"
              width="18.5rem"
              backgroundColor="#ED3237"
              type="subscription"
              border="1rem"
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "6.5rem 4.5rem 0 4.1rem" }}>
        <DataTable columns={Subscriptioncolumns} rows={rows} rowHeight="70" headerHeight="6rem" />
      </Grid>
    </AppBar>
  );
}

export default SubscriptionPlans;
