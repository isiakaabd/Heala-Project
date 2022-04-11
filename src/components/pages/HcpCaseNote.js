import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Chip, Avatar, Typography, Divider } from "@mui/material";
import { Modals, Loader, PreviousButton, CustomButton } from "components/Utilities";
import { NoData } from "components/layouts";
import { useQuery } from "@apollo/client";
import { getConsult } from "components/graphQL/useQuery";
import { dateMoment, duration, daily } from "components/Utilities/Time";
import displayPhoto from "assets/images/avatar.svg";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",

    "&:not(:last-of-type)": {
      marginBottom: "5rem",
    },
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
    },
  },
}));

const caseNotes = [
  {
    id: 0,
    photo: displayPhoto,
  },
];

const HcpCaseNotes = ({
  selectedMenu,
  selectedSubMenu,
  setSelectedMenu,
  selectedHcpMenu,
  selectedScopedMenu,
  setSelectedSubMenu,
  setSelectedHcpMenu,
  setSelectedScopedMenu,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const { hcpId, rowId } = useParams();

  const [consult, setConsult] = useState([]);
  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(6);
    setSelectedScopedMenu(2);
    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu, selectedScopedMenu]);

  const { loading, data, error } = useQuery(getConsult, {
    variables: {
      id: rowId,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (data) {
      setConsult(data.getConsultation);
    }
  }, [data, rowId]);
  if (error) return <NoData error={error} />;

  if (loading) return <Loader />;
  const {
    prescription,
    type,
    consultationOwner,
    referralId,
    createdAt,
    discomfortLevel,
    status,
    description,
    doctorNote,
    severity,
    firstNotice,
    patient,
    contactMedium,
    symptoms,
  } = consult;
  return (
    <>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <PreviousButton
            path={`/Doctor/${hcpId}/consultations`}
            onClick={() => setSelectedHcpMenu(6)}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">Consultation Details</Typography>
        </Grid>
        {caseNotes.map((casenote) => (
          <Grid
            item
            container
            direction="column"
            key={casenote.id}
            className={classes.parentGridWrapper}
          >
            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Consultation Date:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">{dateMoment(createdAt)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Referral:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{referralId ? referralId : "No Value"}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Consultation ID:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{referralId ? referralId : "No Value"}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Chip variant="contained" label={status} className={classes.infoBadge} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Patient:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar src={displayPhoto} alt="Display photo of the sender" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">{patient}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Contact:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {contactMedium ? contactMedium : "No Value"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Owner:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {consultationOwner ? consultationOwner : "No Value"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Type:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{type ? type : "No Value"}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />

            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item container gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Symptoms:
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container gap={1}>
                    {symptoms ? (
                      symptoms.map((symptom, index) => {
                        return (
                          <Typography key={index} variant="body1">
                            {symptom.name}
                          </Typography>
                        );
                      })
                    ) : (
                      <Typography variant="body1">No Value</Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Severity:
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container gap={1}>
                    <Typography variant="body1" className={classes.title}>
                      {severity ? severity : "No value"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    First Notice:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1"> {firstNotice ? firstNotice : "No value"}</Typography>
                </Grid>
              </Grid>
              <Grid item container gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Discomfort:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {discomfortLevel ? discomfortLevel : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Divider color={theme.palette.common.lighterGrey} />
            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item container direction="column" gap={3}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Description:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                    {description ? description : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item container direction="column" gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Doctors Note:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                    {doctorNote ? doctorNote : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
            <Grid
              item
              container
              style={{ padding: "4rem 3rem" }}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item container sx={{ width: "20%" }}>
                <CustomButton
                  title="View Prescription"
                  width="100%"
                  type={buttonType}
                  onClick={handleDialogOpen}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Modals
        isOpen={isOpen}
        title="Prescription"
        width="60vw"
        rowSpacing={2}
        handleClose={handleDialogClose}
      >
        {caseNotes.map((casenote) => (
          <Grid
            item
            container
            width="100%"
            direction="row"
            key={casenote.id}
            // className={classes.parentGridWrapper}
          >
            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              width="100%"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Patient:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar src={displayPhoto} alt="Display photo of the sender" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">{patient}</Typography>
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
                    <Typography variant="body1">{dateMoment(createdAt)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container gap={2} alignItems="center">
                  <Grid item>
                    <Typography variant="body1" className={classes.title}>
                      Symptoms
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container gap={1}>
                      {symptoms ? (
                        symptoms.map((i) => {
                          return (
                            <Typography key={i.name} variant="body1">
                              {i.name}
                            </Typography>
                          );
                        })
                      ) : (
                        <Typography variant="body1">No Value</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />

            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Drug
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Dosage
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Frequency
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Mode
                </Typography>
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
            {prescription &&
              prescription.map((i, index) => {
                return (
                  <>
                    <Grid
                      key={index}
                      item
                      container
                      style={{ padding: "2rem 3rem" }}
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ flexWrap: "nowrap", textAlign: "left" }}
                    >
                      <Grid item>
                        <Typography variant="body1" className={classes.title}>
                          {i.drugName}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="body1" className={classes.title}>
                          {`${i.dosageQuantity} ${i.dosage}`}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="body1" className={classes.title}>
                          {duration(i.dosageFrequency.duration)} {daily(i.dosageFrequency.day)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" className={classes.title}>
                          {i.mode}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider color={theme.palette.common.lighterGrey} />
                  </>
                );
              })}
            <Grid
              item
              container
              style={{ padding: "2rem 3rem" }}
              alignItems="center"
              justifyContent="space-between"
              sx={{ flexWrap: "nowrap" }}
            >
              <Grid item container direction="column" gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Doctors Note:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                    {doctorNote ? doctorNote : "No Value"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Modals>
    </>
  );
};

HcpCaseNotes.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  selectedScopedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
  setSelectedScopedMenu: PropTypes.func.isRequired,
};

export default HcpCaseNotes;
