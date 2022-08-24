import React, { useEffect, useState, memo, createElement } from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Card, CustomButton, Loader } from "components/Utilities";
import DisablePatient from "components/modals/DeleteOrDisable";
import { makeStyles } from "@mui/styles";
import { NoData } from "components/layouts";
import { findProfile } from "components/graphQL/useQuery";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as PrescriptionIcon } from "assets/images/prescription.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useParams, useHistory } from "react-router-dom";
// import ReferPatient from "components/modals/ReferPatient";
import { useQuery, useMutation } from "@apollo/client";
import { getPatients } from "components/graphQL/useQuery";
import { deleteProfile } from "components/graphQL/Mutation";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingBottom: "10rem",
  },

  gridsWrapper: {
    "@media(max-width:600px)": {
      "&.MuiGrid-root": {
        flexDirection: "column",
        rowGap: "1.5rem",
        alignItems: "center",
        "& .detailsContainer": {
          justifyContent: "space-around",
        },
      },
    },
  },
  parentGrid: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },

  icon: {
    "&.css-1o5jd4y-MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
  "@media(max-width:600px)": {
    "&.MuiGrid-root": {
      flexDirection: "column",
      rowGap: "1.5rem",
    },
  },
  container: {
    "&.MuiGrid-root": {
      paddingTop: "5rem",
      flexWrap: "wrap",
      "@media(max-width:600px)": {
        "&": {
          padding: 0,
          paddingTop: "1rem",
          // flexDirection: "column",
          rowGap: "1.5rem",
        },
      },
    },
  },
}));
const SinglePatient = () => {
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const { patientId } = useParams();
  const [disableUser] = useMutation(deleteProfile);
  const onConfirm = async () => {
    try {
      await disableUser({
        variables: { id: patientId },
        refetchQueries: [{ query: getPatients }],
      });

      history.push("/patients");
    } catch (error) {
      console.log(error);
    }
  };

  const cards2 = [
    {
      id: 1,
      title: "Patient Profile",
      background: theme.palette.common.lightRed,
      path: "profile",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 4,
      title: "Medical Records",
      background: theme.palette.common.lightGreen,
      path: "records",
      icon: AssignmentIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 5,
      title: "Consultations",
      background: theme.palette.common.lightRed,
      path: "consultations",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 3,
      title: "Prescriptions",
      background: theme.palette.common.lightRed,
      path: "prescriptions",
      icon: PrescriptionIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 2,
      title: "Appointments",
      background: theme.palette.common.lightGreen,
      path: "appointments",
      icon: ConsultationIcon,
      fill: theme.palette.common.green,
    },
    /* {
      id: 6,
      title: "Medications",
      background: theme.palette.common.lightGreen,
      path: "medications",
      icon: UserIcon,
      fill: theme.palette.common.green,
    }, */
  ];

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

  const [patientProfile, setPatientProfile] = useState("");
  const { loading, error, data } = useQuery(findProfile, {
    variables: {
      id: patientId,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("userDociId", data.profile.dociId);
      setPatientProfile(data.profile);
    }
  }, [data, patientId]);

  const [openDisablePatient, setOpenDisablePatient] = useState(false);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  else {
    return (
      <Grid container direction="column" className={classes.gridContainer} gap={2}>
        <Grid
          item
          justifyContent="space-between"
          alignItems="center"
          container
          p={2}
          className={classes.gridsWrapper}
        >
          <Grid
            item
            alignItems="center"
            container
            gap={2}
            className="detailsContainer"
            sx={{ flex: 1 }}
          >
            <Typography variant="h2">
              {patientProfile.firstName} {patientProfile.lastName}
            </Typography>
          </Grid>
          <Grid item>
            <CustomButton
              endIcon={<PersonRemoveIcon />}
              title="Disable Patient"
              type={trasparentButton}
              textColor={theme.palette.common.red}
              onClick={() => setOpenDisablePatient(true)}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            justifyContent="center"
            p={2}
            flexWrap="wrap"
            // sx={{ background: "yellow" }}
            columnSpacing={{ md: 6, sm: 4, xs: 4 }}
            rowSpacing={{ md: 6, sm: 4, xs: 4 }}
            // spacing={2}
          >
            {cards2.map((card) => (
              <Grid
                key={card.id}
                item
                xs={10}
                sm={6}
                md={4}
                className={classes.parentGrid}
                component={Link}
                // gap={3}
                p={0}
                to={`/patients/${patientId}/${card.path}`}
              >
                <Card title={card.title} background={card.background} header="h4">
                  {createElement(card.icon, {
                    fill: card.fill,
                    color: "success",
                    style: { fontSize: "clamp(2.5rem, 3vw,4rem)" },
                  })}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <DisablePatient
          open={openDisablePatient}
          setOpen={setOpenDisablePatient}
          title="Delete Patient"
          btnValue="delete"
          onConfirm={onConfirm}
          confirmationMsg="disable Patient"
        />
      </Grid>
    );
  }
};

export default memo(SinglePatient);
