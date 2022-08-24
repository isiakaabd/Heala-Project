import React, { useEffect, useState } from "react";
import { Grid, Typography, Chip, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Loader } from "components/Utilities";
import { useQuery } from "@apollo/client";
import { getAMessage } from "components/graphQL/useQuery";
import { NoData } from "components/layouts";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
  gridWrapper: {
    padding: "4rem",
  },
  badge: {
    "&.MuiChip-root": {
      border: `1px solid ${theme.palette.common.lighterGrey} !important`,
    },
    "& .MuiChip-label": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
    },
  },
}));

const ViewMessage = () => {
  const classes = useStyles();
  const { messageId } = useParams();
  const { loading, data, error } = useQuery(getAMessage, {
    variables: { id: messageId },
  });

  const [message, setMessage] = useState([]);
  useEffect(() => {
    if (data) setMessage(data.getMessage);
  }, [message, data]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  const { body, recipientData, subject } = message;
  return (
    <Grid container direction="column">
      <Grid item container direction="column" className={classes.parentGrid}>
        <Grid item className={classes.gridWrapper}>
          <Typography variant="h3">{subject}</Typography>
        </Grid>
        <Divider />

        <Grid item direction="column" className={classes.gridWrapper} container gap={2}>
          <Grid item container gap={2} alignItems="center">
            <Grid item>
              <Typography variant="h5">
                {recipientData && Object.keys(recipientData).length > 0
                  ? `${recipientData?.firstName} ${recipientData?.lastName}`
                  : "No Value"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              label={
                recipientData && Object.keys(recipientData).length > 0
                  ? recipientData.dociId
                  : "No Heala ID"
              }
              className={classes.badge}
            />
          </Grid>
        </Grid>

        <Divider />
        <Grid item className={classes.gridWrapper}>
          <Typography variant="body1" style={{ lineHeight: 1.85 }}>
            {body ? body : "No Value"}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ViewMessage;
