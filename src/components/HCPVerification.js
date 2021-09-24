import React from "react";
import FilterBox from "./Utilities/Filter";
import SearchContainer from "./Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "./Utilities/DataGrid";
import { columns2, rows } from "./Utilities/DataHeader";
import { AppBar } from "@mui/material";

function HCPVerification() {
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
          flexGrow: 1,
          marginLeft: "5.7rem",
          marginRight: "4.5rem",
        }}
      >
        <Grid container>
          <Grid item sx={{ flexGrow: 1 }}>
            <SearchContainer
              placeholder="Type to search HCPs... "
              width="83.3rem"
              maxWidth="100%"
              height="inherit"
              sx={{ flexGrow: 1, marginRight: "5rem" }}
            />
          </Grid>

          <Grid item xs={2}>
            <FilterBox
              options={option}
              width="12.4rem"
              placeholder="Filter by "
              height="5.7rem"
              type="filter"
              sx={{ maxWidth: "100%", display: "flex" }}
            />
          </Grid>

          {/* </Grid> */}
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem auto" }}>
        <DataTable columns={columns2} rows={rows} rowHeight="70" />
      </Grid>
    </AppBar>
  );
}

export default HCPVerification;
