import React, { useState } from "react";
import { Grid } from "@mui/material";
import logo from "assets/images/heala-logo.png";
import InfoCard from "components/cards/InfoCard";
import hmoLogo from "assets/images/hmo-logo.png";
import hospitalLogo from "assets/images/hospitals.png";

const SubscriptionPlans = () => {
  const [healaPlans] = useState(5);
  const [noOfHospitals] = useState(35);
  const [hmoPlans] = useState(4);

  return (
    <Grid>
      <Grid container spacing={2} flexWrap="wrap">
        <Grid item>
          <InfoCard
            variant="img"
            imgUrl={logo}
            alt="Heala logo"
            hasMenu={false}
            linkTo="plans/heala-plans"
            subTitle={
              healaPlans && healaPlans > 1
                ? `${healaPlans} Plans`
                : `${healaPlans} Plan`
            }
            title="Heala Plans"
          />
        </Grid>
        <Grid item>
          <InfoCard
            variant="img"
            imgUrl={hospitalLogo}
            alt="hospitals logo"
            hasMenu={false}
            linkTo="plans/hospitals"
            subTitle={
              noOfHospitals && noOfHospitals > 1
                ? `${noOfHospitals} Hospitals`
                : `${noOfHospitals} Hospital`
            }
            title="Hospitals"
          />
        </Grid>
        <Grid item>
          <InfoCard
            variant="img"
            imgUrl={hmoLogo}
            alt="Hmo logo"
            hasMenu={false}
            linkTo="plans/hmo-plans"
            subTitle={
              hmoPlans && hmoPlans > 1
                ? `${hmoPlans} Plans`
                : `${hmoPlans} Plan`
            }
            title="HMO Plan"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubscriptionPlans;
