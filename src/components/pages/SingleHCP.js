import React, { useState, useEffect, createElement } from "react";
import { Grid, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useQuery, useMutation } from "@apollo/client";
import { doctor, getDoctorsProfile } from "components/graphQL/useQuery";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Card, CustomButton, Loader } from "components/Utilities";
import DisablePatient from "components/modals/DeleteOrDisable";
import { makeStyles } from "@mui/styles";
import { ReactComponent as ConsultationIcon } from "assets/images/consultation.svg";
import { ReactComponent as UserIcon } from "assets/images/user.svg";
import { ReactComponent as CalendarIcon } from "assets/images/calendar.svg";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteDoctor } from "components/graphQL/Mutation";
//

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

    "& > .MuiGrid-root.MuiGrid-container": {
      backgroundColor: "#ffffff",
    },
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
const SingleHCP = () => {
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

  const cards2 = [
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
      title: "Availability",
      background: theme.palette.common.lightGreen,
      path: "availability",
      icon: ConsultationIcon,
      fill: theme.palette.common.green,
    },
    {
      id: 3,
      title: "Consultations",
      background: theme.palette.common.lightRed,
      path: "consultations",
      icon: ConsultationIcon,
      fill: theme.palette.common.red,
    },
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
      title: "Appointments",
      background: theme.palette.common.lightGreen,
      path: "appointments",
      icon: CalendarIcon,
      fill: theme.palette.common.green,
    },
  ];

  const trasparentButton = {
    background: "transparent",
    hover: theme.palette.common.danger,
    active: "#f4f4f4",
  };

  if (profile.loading) return <Loader />;
  return (
    <>
      <Grid
        container
        direction="column"
        gap={2}
        rowSpacing={2}
        className={classes.gridContainer}
      >
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          p={2}
          className={classes.gridsWrapper}
        >
          {/* Display photo and profile name grid */}
          <Grid
            item
            alignItems="center"
            container
            gap={2}
            className="detailsContainer"
            sx={{ flex: 1 }}
          >
            <Grid item>
              <Avatar
                alt={doctorProfile?.firstName}
                src={doctorProfile?.picture}
                sx={{ width: 50, height: 50 }}
              />
            </Grid>

            <Typography variant="h2">{`${doctorProfile.firstName} ${doctorProfile.lastName}`}</Typography>
          </Grid>
          {/* Action Buttons grid */}

          <Grid item>
            <CustomButton
              endIcon={<PersonRemoveIcon />}
              title="Disable Doctor"
              onClick={() => setOpenDisableDoctor(true)}
              type={trasparentButton}
              textColor={theme.palette.common.danger}
              textColorOnHover="#ffffff"
            />
          </Grid>
        </Grid>

        {/* BOTTOM CARDS SECTION */}
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
                to={`/hcps/${hcpId}/${card.path}`}
              >
                <Card title={card.title} header="h4">
                  {createElement(card.icon, {
                    fill: card.fill,
                    color:
                      card.id === 4 || card.id === 6 ? "success" : undefined,
                    style: { fontSize: "clamp(2.5rem, 3vw,4rem)" },
                  })}
                </Card>
              </Grid>
            ))}
          </Grid>
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

export default SingleHCP;
