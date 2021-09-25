import React from "react";
import FilterBox from "components/Utilities/Filter";
import SearchContainer from "components/Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "components/Utilities/DataGrid";
import { columns2, rows } from "components/Utilities/DataHeader";
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
          <Grid item sx={{ marginRight: "5rem", width: "83.3rem" }}>
            <SearchContainer
              // maxWwidth="83.3rem"
              placeholder="Type to search HCPs... "
              height="inherit"
            />
          </Grid>

          <Grid item xs={2}>
            <FilterBox
              options={option}
              placeholder="Filter by "
              height="5.7rem"
              type="filter"
              width="12.4rem"
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem 4.5rem 0 4.1rem" }}>
        <DataTable columns={columns2} rows={rows} rowHeight="70" />
      </Grid>
    </AppBar>
  );
}

export default HCPVerification;
