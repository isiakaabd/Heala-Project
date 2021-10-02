import React from "react";
import IconLabelButtons from "components/Utilities/Button";
import FilterBox from "components/Utilities/Filter";
import SearchContainer from "components/Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "components/Utilities/DataGrid";
import { columns, rows } from "components/Utilities/DataHeader";
import { AppBar } from "@mui/material";
// import download from "assets/images/avatar.png";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";

const Mail = () => {
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
          maxWidth: "100.7rem",
          height: "5.7rem",
          flexGrow: 1,
          marginLeft: "4.1rem",
          marginRight: "4.5rem",
        }}
      >
        <Grid container>
          <Grid item sx={{ flexGrow: 1, marginRight: "4.1rem" }}>
            <SearchContainer
              placeholder="Enter your Email Here"
              maxWidth="62.3rem"
              placeholderWidth="17.3"
              height="inherit"
            />
          </Grid>
          <Grid sx={{ width: "34.9rem", display: "flex", justifyContent: "flex-start" }}>
            <Grid item xs={2} sx={{ marginRight: "3.5rem", maxWidth: "100% !important" }}>
              <FilterBox
                options={option}
                width="12.4rem"
                placeholder="Filter by"
                height="5.7rem"
                type="filter"
              />
            </Grid>
            <Grid item xs={3} sx={{ marginRight: "4.5rem" }}>
              <IconLabelButtons
                placeholder="Download email"
                height="5.7rem"
                width="19rem"
                backgroundColor="#3EA584"
                type="download"
                border="1rem"
                endIcon={<DownloadSharpIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        sx={{
          height: "700px",
          maxWidth: "100.7rem",
          margin: "5.6rem 4.5rem 0 4.1rem",
        }}
      >
        <DataTable columns={columns} rows={rows} rowHeight="70" />
      </Grid>
    </AppBar>
  );
};

export default Mail;
