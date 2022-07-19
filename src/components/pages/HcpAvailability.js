import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { AvailabilityCard, Loader } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getAvailability } from "components/graphQL/useQuery";
import { NoData } from "components/layouts";

const HcpAvailability = () => {
  const [availabiltyArray, setAvailabiltyArray] = useState([]);
  const { hcpId } = useParams();
  const { loading, data, error } = useQuery(getAvailability, {
    variables: {
      id: hcpId,
    },
  });
  useEffect(() => {
    if (data) setAvailabiltyArray(data?.getAvailabilities?.availability);
  }, [data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2} flexWrap="nowrap" height="100%">
      <Grid item>
        <Typography variant="h2">HCP Availability</Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        gap={2}
        flexWrap="nowrap"
        height="100%"
      >
        {availabiltyArray.length > 0 ? (
          availabiltyArray.map((availability, index) => {
            if (availability?.times) {
              return (
                <Grid item key={index}>
                  <AvailabilityCard availability={availability} />
                </Grid>
              );
            } else {
              return null;
            }
          })
        ) : (
          <NoData />
        )}
      </Grid>
    </Grid>
  );
};

export default HcpAvailability;
