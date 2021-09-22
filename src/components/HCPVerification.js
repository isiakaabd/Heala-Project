import React from "react";
import IconLabelButtons from "./Utilities/Button";
import FilterBox from "./Utilities/Filter";
import SearchContainer from "./Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "./Utilities/DataGrid";
import { columns, rows } from "./Utilities/DataHeader";

function HCPVerification() {
  const option = ["height", "long", "short"];
  return (
    <>
      <Box
        sx={{
          width: "110rem",
          height: "5.7rem",
          flexGrow: 1,
          marginLeft: "2.7rem",
        }}
        spacing={4}
      >
        <Grid container>
          <Grid item sx={{ flexGrow: 1, marginRight: "3rem" }}>
            <SearchContainer
              placeholder="Enter your Email Here"
              maxWidth="83.3rem"
              height="inherit"
            />
          </Grid>
          {/* <Grid sx={{ width: "34.9rem", display: "flex", justifyContent: "space-around" }}> */}
          <Grid item xs={2} sx={{ marginRight: "4.5rem" }}>
            <FilterBox
              options={option}
              width="12.4rem"
              placeholder="Filter by"
              height="30px"
              type="filter"
            />
          </Grid>

          {/* </Grid> */}
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem auto" }}>
        <DataTable columns={columns} rows={rows} rowHeight="70" />
      </Grid>
    </>
  );
}

export default HCPVerification;
