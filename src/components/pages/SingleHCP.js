import React, { useState, useEffect, createElement } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery, useMutation } from "@apollo/client";
import { doctor, getDoctorsProfile } from "components/graphQL/useQuery";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Card, CustomButton, Loader, PreviousButton } from "components/Utilities";
import DisablePatient from "components/modals/DeleteOrDisable";
import { makeStyles } from "@mui/styles";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteDoctor } from "components/graphQL/Mutation";
//

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingBottom: "20rem",
  },

  gridsWrapper: {
    background: "#fff",
    borderRadius: "2rem",
    padding: "2rem 4rem",
  },

  parentGrid: {
    textDecoration: "none",
    width: "24.7rem",
    color: theme.palette.primary.main,
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
      minWidth: "20rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
}));
const SingleHCP = (props) => {
  const {
    selectedMenu,
    setSelectedMenu,
    /* selectedSubMenu,
    selectedScopedMenu,
    setSelectedSubMenu,
    selectedHcpMenu,
    setSelectedHcpMenu,
    setSelectedScopedMenu, */
  } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { hcpId } = useParams();
  const history = useHistory();
  const [disableUser] = useMutation(deleteDoctor);
  const [doctorProfile, setDoctorProfile] = useState("");
  const [openDisableDoctor, setOpenDisableDoctor] = useState(false);
  const profile = useQuery(doctor, {
    variables: {
      id: hcpId,
    },
  });
  const onConfirm = async () => {
    try {
      await disableUser({
        variables: { id: hcpId },
        refetchQueries: [{ query: getDoctorsProfile }],
      });
      history.push("/hcps");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (profile.data) {
      setDoctorProfile(profile.data.doctorProfile);
    }
  }, [profile.data, hcpId]);

  const cards1 = [
    {
      id: 1,
      title: "Doctor Profile",
      background: theme.palette.common.lightRed,
      path: "profile",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 2,
      title: "Appointments",
      background: theme.palette.common.lightGreen,
      path: "appointments",
      icon: CalendarIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 3,
      title: "Availability",
      background: theme.palette.common.lightRed,
      path: "availability",
      icon: ConsultationIcon,
      fill: theme.palette.common.red,
    },
  ];

  const cards2 = [
    {
      id: 4,
      title: "Earnings",
      background: theme.palette.common.lightGreen,
      path: "earnings",
      icon: PaymentsIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 5,
      title: "Patients",
      background: theme.palette.common.lightRed,
      path: "doctor-patients",
      icon: UserIcon,
      fill: theme.palette.common.red,
    },
    {
      id: 6,
      title: "Consultations",
      background: theme.palette.common.lightGreen,
      path: "consultations",
      icon: AssignmentIcon,
      fill: theme.palette.common.red,
    },
  ];

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

  useEffect(() => {
    setSelectedMenu(2);
    /* setSelectedSubMenu(3);
    setSelectedHcpMenu(0);
    setSelectedScopedMenu(0); */

    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu, selectedHcpMenu, selectedScopedMenu */]);
  if (profile.loading) return <Loader />;
  return (
    <>
      <Grid container direction="column" gap={2} rowSpacing={2} className={classes.gridContainer}>
        <Grid item>
          <PreviousButton
            path={`/hcps`}
            /* onClick={() => setSelectedSubMenu(0)} */
          />
        </Grid>
        <Grid item container justifyContent="space-between" className={classes.gridsWrapper}>
          {/* Display photo and profile name grid */}
          <Grid item sx={{ paddingTop: 0 }}>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "2rem" }}>
                <Avatar
                  alt={`Display Photo`}
                  src={doctorProfile.picture}
                  sx={{ width: 50, height: 50 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h2">{`${doctorProfile.firstName} ${doctorProfile.lastName}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Action Buttons grid */}
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <CustomButton
                  endIcon={<PersonRemoveIcon />}
                  title="Disable Doctor"
                  onClick={() => setOpenDisableDoctor(true)}
                  type={trasparentButton}
                  textColor={theme.palette.common.red}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* TOP CARDS SECTION */}
        <Grid item container style={{ paddingTop: "5rem" }} justifyContent="space-evenly">
          {cards1.map((card) => (
            <Grid
              key={card.id}
              item
              className={classes.parentGrid}
              component={Link}
              to={`/hcps/${hcpId}/${card.path}`}
              /* onClick={() => setSelectedHcpMenu(card.id)} */
            >
              <Card title={card.title} background={card.background} header="h4">
                {createElement(card.icon, { fill: card.fill })}
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* BOTTOM CARDS SECTION */}
        <Grid item container justifyContent="space-evenly" style={{ paddingTop: "5rem" }}>
          {cards2.map((card) => (
            <Grid
              key={card.id}
              item
              className={classes.parentGrid}
              component={Link}
              to={`/hcps/${hcpId}/${card.path}`}
              /*  onClick={() => setSelectedHcpMenu(card.id)} */
            >
              <Card title={card.title} background={card.background} header="h4">
                {createElement(card.icon, {
                  fill: card.fill,
                  color: card.id === 4 || card.id === 6 ? "success" : undefined,
                  style: { fontSize: "4rem" },
                })}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <DisablePatient
        open={openDisableDoctor}
        setOpen={setOpenDisableDoctor}
        title="Delete Doctor"
        btnValue="delete"
        confirmationMsg="delete Doctor"
        onConfirm={onConfirm}
      />
    </>
  );
};

SingleHCP.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  selectedScopedMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func,
  setSelectedScopedMenu: PropTypes.func, */
};

export default SingleHCP;
