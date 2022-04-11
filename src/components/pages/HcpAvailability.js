import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { AvailabilityCard, Loader, PreviousButton } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getAvailability } from "components/graphQL/useQuery";
import { NoData } from "components/layouts";

const HcpAvailability = (props) => {
  const [availabiltyArray, setAvailabiltyArray] = useState([]);
  const { hcpId } = useParams();
  const { loading, data, error } = useQuery(getAvailability, {
    variables: {
      id: hcpId,
    },
  });
  useEffect(() => {
    if (data) setAvailabiltyArray(data.getAvailabilities.availability);
  }, [data]);

  const {
    selectedMenu,
    selectedSubMenu,
    selectedHcpMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedHcpMenu,
  } = props;

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(3);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column" gap={2}>
      <Grid item>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      <Grid item>
        <Typography variant="h2">HCP Availability</Typography>
      </Grid>
      <Grid item container gap={3}>
        {availabiltyArray.map((availability, index) => {
          return (
            <Grid item key={index}>
              <AvailabilityCard availability={availability} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

HcpAvailability.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default HcpAvailability;
