import React from "react";
import FilterBox from "components/Utilities/Filter";
import SearchContainer from "components/Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "components/Utilities/DataGrid";
import { Referralcolumns, rows } from "components/Utilities/DataHeader";
import { AppBar } from "@mui/material";

const Referral = () => {
  const option = ["height", "long", "short"];
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
          <Grid item sx={{ marginRight: "5rem", width: "78.9rem" }}>
            <SearchContainer placeholder="Type to search referrals... " height="inherit" />
          </Grid>

          <Grid item xs={2}>
            <FilterBox
              options={option}
              width="16.8rem"
              placeholder="Filter referrals"
              height="5.7rem"
              type="referral"
            />
          </Grid>

          {/* </Grid> */}
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem 4.5rem 0 4.1rem" }}>
        <DataTable columns={Referralcolumns} rows={rows} rowHeight="70" sx={{ width: "100%" }} />
      </Grid>
    </AppBar>
  );
};

export default Referral;
