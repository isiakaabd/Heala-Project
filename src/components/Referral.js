import React from "react";
import FilterBox from "./Utilities/Filter";
import SearchContainer from "./Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "./Utilities/DataGrid";
import { Referralcolumns, rows } from "./Utilities/DataHeader";
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
          width: "110rem",
          height: "5.7rem",
          marginLeft: "2rem",
          marginRight: "2.5rem",
        }}
      >
        <Grid container>
          <Grid item sx={{ flexGrow: 1 }}>
            <SearchContainer
              placeholder="Type to search referrals... "
              width="78.9rem"
              maxWidth="100%"
              height="inherit"
              sx={{ flexGrow: 1, marginRight: "5rem" }}
            />
          </Grid>

          <Grid item xs={2} sx={{ marginLeft: "1rem" }}>
            <FilterBox
              options={option}
              width="16.8rem"
              placeholder="Filter referrals"
              height="5.7rem"
              type="referral"
              sx={{ marginLeft: "2rem", maxWidth: "100%", display: "flex" }}
            />
          </Grid>

          {/* </Grid> */}
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "120rem", margin: "5.6rem 2rem" }}>
        <DataTable columns={Referralcolumns} rows={rows} rowHeight="70" sx={{ width: "100%" }} />
      </Grid>
    </AppBar>
  );
};

export default Referral;
