import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Avatar, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import { dateMoment } from "components/Utilities/Time";
import { getConsultations } from "components/graphQL/useQuery";
import { useQuery } from "@apollo/client";
import { Loader } from "components/Utilities";
import { NoData } from "components/layouts";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
    },
  },
  item: {
    "&.MuiGrid-root > *": {
      flex: 1,
    },
  },
  parentGrid: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.5rem",
      borderRadius: "1.5rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
    },
  },
  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      marginRight: "2rem",
    },
  },
}));

const Prescriptions = (props) => {
  const { selectedMenu, setSelectedMenu } = props;
  const classes = useStyles();

  const { patientId } = useParams();

  useEffect(() => {
    setSelectedMenu(1);

    // eslint-disable-next-line
  }, [selectedMenu]);

  const { loading, error, data } = useQuery(getConsultations, {
    variables: {
      id: patientId,
      orderBy: "-createdAt",
    },
  });

  const [consultations, setConsultations] = useState({});
  const [pre, setPre] = useState([]);
  const [doc, setDoc] = useState(null);
  useEffect(() => {
    if (data && data.getConsultations.data) {
      const datas = data.getConsultations.data[0];
      if (datas) {
        setConsultations(datas);
        setPre(datas.prescription);
        setDoc(datas.doctorData);
      }
    }
  }, [data, consultations, pre, doc]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <Grid container direction="column" flexWrap="nowrap" height="100%" gap={2}>
      <Grid item>
        <Typography variant="h2">Prescriptions</Typography>
      </Grid>
      {Object.entries(consultations).length > 0 ? (
        <Grid item container direction="column" width="100%" className={classes.parentGrid}>
          <Grid
            item
            container
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="no-wrap"
            padding=" 2rem 0"
            rowGap={{ xs: 2 }}
            width="90%"
            margin="auto"
          >
            <Grid item>
              <Grid item container gap={2} alignItems="center">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Doctor:
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    src={consultations && doc && doc.picture ? doc.picture : displayPhoto}
                    alt="Display photo of the sender"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {doc.firstName ? `${doc && doc.firstName} ${doc && doc.lastName}` : "no doctor"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container gap={2} alignItems="center">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Prescription Date:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{dateMoment(consultations.updatedAt)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item alignItems="center">
              <Grid item container gap={2} alignItems="center">
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Symptoms:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {consultations.symptoms
                      ? consultations.symptoms.map((i) => `${i.name}, `)
                      : "No Symptom"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />

          {pre && pre.length > 0 && (
            <>
              <Grid
                container
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="no-wrap"
                padding=" 2rem 0"
                width="90%"
                margin="auto"
              >
                <Grid
                  item
                  container
                  alignItems="center"
                  className={classes.item}
                  justifyContent="space-between"
                  gap={2}
                >
                  <Grid item>
                    <Typography variant="h5">Drugs</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">Dosage</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">Frequency</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">Mode</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </>
          )}
          {pre &&
            pre.length > 0 &&
            pre.map((i, index) => {
              return (
                <>
                  <Grid
                    container
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="no-wrap"
                    padding=" 2rem 0"
                    width="90%"
                    margin="auto"
                    key={index}
                  >
                    <Grid
                      item
                      container
                      className={classes.item}
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Grid item>
                        <Typography variant="body1">{i.drugName}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{i.dosage}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{`${i.dosageFrequency.day}day / ${i.dosageFrequency.duration}duration`}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{i.mode}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Divider />
                </>
              );
            })}
          <Grid
            item
            container
            rowSpacing={2}
            flexDirection="column"
            padding=" 2rem 0"
            width="90%"
            margin="auto"
          >
            <Grid item>
              <Typography variant="body1" className={classes.title}>
                Doctor Notes:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                {consultations.doctorNote ? consultations.doctorNote : "No Note"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <NoData />
      )}
    </Grid>
  );
};

Prescriptions.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
};

export default Prescriptions;
