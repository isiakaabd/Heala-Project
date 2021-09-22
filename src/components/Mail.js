import React from "react";
import IconLabelButtons from "./Utilities/Button";
import FilterBox from "./Utilities/Filter";
import SearchContainer from "./Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "./Utilities/DataGrid";
import { columns, rows } from "./Utilities/DataHeader";

const Mail = () => {
  const option = ["height", "long", "short"];
  return (
    <>
      <Box sx={{ width: "110rem", height: "5.7rem", flexGrow: 1, marginLeft: "2rem" }}>
        <Grid container>
          <Grid item sx={{ flexGrow: 1, marginRight: "2.7rem" }}>
            <SearchContainer
              placeholder="Enter your Email Here"
              maxWidth="62.3rem"
              height="inherit"
            />
          </Grid>
          <Grid sx={{ width: "34.9rem", display: "flex", justifyContent: "space-around" }}>
            <Grid item xs={2} sx={{ margin: 0 }}>
              <FilterBox
                options={option}
                width="12.4rem"
                placeholder="Filter by"
                // height="30px"
                type="filter"
              />
            </Grid>
            <Grid item xs={3} sx={{ marginRight: "1.5rem" }}>
              <IconLabelButtons
                placeholder="Download email"
                height="inherit"
                width="19rem"
                backgroundColor="#3EA584"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem auto" }}>
        <DataTable columns={columns} rows={rows} rowHeight="70" />
      </Grid>
    </>
  );
};

export default Mail;
