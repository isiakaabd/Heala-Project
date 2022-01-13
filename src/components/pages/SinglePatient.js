import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Modals from "components/Utilities/Modal";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import { useLazyQuery } from "@apollo/client";
import Card from "components/Utilities/Card";
import DisablePatient from "components/modals/DeleteOrDisable";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.png";
import { findProfile } from "components/graphQL/useQuery";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as PrescriptionIcon } from "assets/images/prescription.svg";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ReferPatient from "components/modals/ReferPatient";
import { useQuery, useMutation } from "@apollo/client";
import { getPatients } from "components/graphQL/useQuery";
import Loader from "components/Utilities/Loader";
import { deleteProfile } from "components/graphQL/Mutation";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingBottom: "20rem",
  },

  gridsWrapper: {
    background: "#fff",
    borderRadius: "2rem",
    padding: "4rem",
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
    "&.css-1o5jd4y-MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
}));
const SinglePatient = (props) => {
  const {
    selectedMenu,
    selectedSubMenu,
    selectedPatientMenu,
    setSelectedMenu,
    setSelectedSubMenu,
    setSelectedPatientMenu,
  } = props;
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const { patientId } = useParams();
  const [disableUser] = useMutation(deleteProfile);
  const onConfirm = async () => {
    try {
      await disableUser({ variables: { id: patientId }, refetchQueries: [{ query: getPatients }] });

      history.push("/patients");
    } catch (error) {
      console.log(error);
    }
  };
  const cards1 = [
    {
      id: 1,
      title: "Patient Profile",
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
      icon: ConsultationIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 3,
      title: "Prescriptions",
      background: theme.palette.common.lightRed,
      path: "prescriptions",
      icon: PrescriptionIcon,
      fill: theme.palette.common.red,
    },
  ];

  const cards2 = [
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
      id: 6,
      title: "Medications",
      background: theme.palette.common.lightGreen,
      path: "medications",
      icon: UserIcon,
      fill: theme.palette.common.green,
    },
  ];

  const trasparentButton = {
    background: "transparent",
    hover: "#fafafa",
    active: "#f4f4f4",
  };

  const greenButton = {
    background: theme.palette.success.main,
    hover: theme.palette.success.light,
    active: theme.palette.success.dark,
  };
  const initialValues = {
    referral: "",
    category: "",
    textarea: "",
  };
  const [patientProfile, setPatientProfile] = useState("");
  const profile = useQuery(findProfile, {
    variables: {
      id: patientId,
    },
  });
  useEffect(() => {
    if (profile.data) {
      setPatientProfile(profile.data.profile);
    }
  }, [profile.data, patientId]);

  const [openDisablePatient, setOpenDisablePatient] = useState(false);

  const handleDialogOpen = () => setIsOpen(true);

  const handleDialogClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setSelectedMenu(1);
    setSelectedSubMenu(2);
    setSelectedPatientMenu(0);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedPatientMenu]);
  if (profile.loading) return <Loader />;
  else {
    return (
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item style={{ marginBottom: "3rem" }}>
          <PreviousButton path={`/patients`} onClick={() => setSelectedSubMenu(0)} />
        </Grid>
        <Grid item container justifyContent="space-between" className={classes.gridsWrapper}>
          {/* Display photo and profile name grid */}
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "2rem" }}>
                <Avatar
                  alt={patientProfile.firstName}
                  src={displayPhoto}
                  sx={{ width: 50, height: 50 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h2">
                  {patientProfile.firstName} {patientProfile.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Action Buttons grid */}
          <Grid item>
            <Grid container alignItems="center">
              <Grid item style={{ marginRight: "2rem" }}>
                <CustomButton
                  endIcon={<PersonRemoveIcon />}
                  title="Disable Patient"
                  type={trasparentButton}
                  textColor={theme.palette.common.red}
                  onClick={() => setOpenDisablePatient(true)}
                />
              </Grid>
              <Grid item>
                <CustomButton
                  endIcon={<TrendingUpIcon />}
                  title="Refer Patient"
                  type={greenButton}
                  onClick={handleDialogOpen}
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
              to={`/patients/${patientId}/${card.path}`}
              onClick={() => setSelectedPatientMenu(card.id)}
            >
              <Card title={card.title} background={card.background} header="h4">
                {React.createElement(card.icon, { fill: card.fill })}
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
              to={`/patients/${patientId}/${card.path}`}
              onClick={() => setSelectedPatientMenu(card.id)}
            >
              <Card title={card.title} background={card.background} header="h4">
                {React.createElement(card.icon, {
                  fill: card.fill,
                  color: "success",
                  style: { fontSize: "4rem" },
                })}
              </Card>
            </Grid>
          ))}
        </Grid>
        <DisablePatient
          open={openDisablePatient}
          setOpen={setOpenDisablePatient}
          title="Delete Patient"
          btnValue="delete"
          onConfirm={onConfirm}
          confirmationMsg="disable Patient"
        />
        <Modals isOpen={isOpen} title="Refer Patient" handleClose={handleDialogClose}>
          <ReferPatient handleDialogClose={handleDialogClose} initialValues={initialValues} />
        </Modals>
      </Grid>
    );
  }
};

SinglePatient.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedPatientMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedPatientMenu: PropTypes.func.isRequired,
};

export default SinglePatient;
