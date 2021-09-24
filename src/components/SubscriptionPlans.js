import React from "react";
import IconLabelButtons from "./Utilities/Button";
import SearchContainer from "./Utilities/Search";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DataTable from "./Utilities/DataGrid";
import { rows, Subscriptioncolumns } from "./Utilities/DataHeader";
import Styled from "styled-components";

function SubscriptionPlans() {
  return (
    <Container>
      <Box sx={{ width: "125rem", height: "5.7rem", flexGrow: 1, marginLeft: "2rem" }}>
        <Grid container>
          <Grid item sx={{ flexGrow: 1, marginRight: "5rem" }}>
            <SearchContainer
              placeholder="Enter your Email Here"
              maxWidth="76.7rem"
              height="inherit"
            />
          </Grid>

          <Grid item xs={3} sx={{ marginRight: "1.5rem" }}>
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
      <Grid container sx={{ height: "700px", width: "100.7rem", margin: "5.6rem auto" }}>
        <DataTable columns={Subscriptioncolumns} rows={rows} rowHeight="70" />
      </Grid>
    </Container>
  );
}
const Container = Styled.div`
{
  background: #FBFBFB
}
`;

export default SubscriptionPlans;
