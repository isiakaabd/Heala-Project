import React from "react";
import IconLabelButtons from "components/Utilities/Button";
import SearchContainer from "components/Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "../Utilities/DataGrid";
import { rows, Subscriptioncolumns } from "components/Utilities/DataHeader";
import { AppBar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
              height="5.6rem"
              width="18.5rem"
              backgroundColor="#ED3237"
              endIcon={<AddIcon />}
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
