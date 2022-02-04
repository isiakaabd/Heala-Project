import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Avatar, Divider } from "@mui/material";
// import EnhancedTable from "components/layouts/EnhancedTable";
// import NoData from "components/layouts/NoData";
// import { dateMoment, timeMoment } from "components/Utilities/Time";
// import { prescriptionsHeadCells } from "components/Utilities/tableHeaders";
// import { useSelector } from "react-redux";
// import { useActions } from "components/hooks/useActions";
// import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import PreviousButton from "components/Utilities/PreviousButton";
import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import { getConsultations } from "components/graphQL/useQuery";
// import Loader from "components/Utilities/Loader";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    "&.MuiTableCell-root": {
      fontSize: "1.25rem",
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
  const {
    selectedMenu,
    selectedSubMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    selectedPatientMenu,
    setSelectedPatientMenu,
  } = props;
  const classes = useStyles();

  const { patientId } = useParams();
  const array = ["panadol", "500mg", "Twice Daily", "Oral"];

  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(3);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);

  // const { loading, error, data } = useQuery(getConsultations, {
  //   variables: {
  //     id: patientId,
  //     orderBy: "-createdAt",
  //   },
  // });

  // const [consultations, setConsultations] = useState([]);
  // useEffect(() => {
  //   if (data && data.getConsultations.data) {
  //     setConsultations(data.getConsultations.data);
  //   }
  // }, [data, consultations]);

  // if (loading) return <Loader />;
  // if (error) return <NoData error={error.message} />;
  return (
    <Grid container direction="column" flexWrap="nowrap" height="100%" gap={2}>
      <Grid item>
        <PreviousButton path={`/patients/${patientId}`} onClick={() => setSelectedPatientMenu(0)} />
      </Grid>
      <Grid item>
        <Typography variant="h2">Prescriptions</Typography>
      </Grid>
      <Grid item container direction="column" width="100%" className={classes.parentGrid}>
        <Grid
          item
          container
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="no-wrap"
          padding=" 2rem 0"
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
                <Avatar src={displayPhoto} alt="Display photo of the sender" />
              </Grid>
              <Grid item>
                <Typography variant="h5">Sule Muntari</Typography>
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
                <Typography variant="h5">JAN 31 2022</Typography>
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
                <Typography variant="h5"> Fever Malaria</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
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
          <Grid item container alignItems="center" justifyContent="space-between" gap={2}>
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
            {/* );
            })} */}
          </Grid>
        </Grid>
        <Divider />
        {array.map((i, index) => {
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
                <Grid item container alignItems="center" justifyContent="space-between" gap={2}>
                  <Grid item>
                    <Typography variant="h5">Panadol</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">500mg</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">Twice Daily</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">Oral</Typography>
                  </Grid>
                  {/* );
              })} */}
                </Grid>
              </Grid>
              <Divider />
            </>
          );
        })}
        <Divider />
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
              note
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Prescriptions.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  selectedPatientMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  setSelectedPatientMenu: PropTypes.func,
};

export default Prescriptions;
