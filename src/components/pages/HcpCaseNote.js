import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Chip, Avatar, Typography, Divider } from "@mui/material";
import { Modals, Loader, CustomButton } from "components/Utilities";
import { NoData } from "components/layouts";
import { useQuery } from "@apollo/client";
import { getConsult } from "components/graphQL/useQuery";
import { dateMoment, duration } from "components/Utilities/Time";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { trucateString } from "helpers/filterHelperFunctions";
import Copy from "components/Copy";
import { daily } from "components/Utilities/Time";

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
      // marginRight: "2rem",
      whitespace: "wrap",
    },
  },
  item: {
    padding: "2rem 3rem",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "nowrap",
    // justifyContent: "space-between",
    "&.MuiGrid-root > *": {
      flex: 1,
    },
  },
  subItem: {
    "&.MuiGrid-container": {
      flexDirection: "column",
      wordBreak: "break-word",
    },
  },
}));

const HcpCaseNotes = ({ selectedMenu, setSelectedMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

  const { rowId } = useParams();

  const [consult, setConsult] = useState([]);
  useEffect(() => {
    setSelectedMenu(2);

    // eslint-disable-next-line
  }, [selectedMenu]);

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
    contactMedium,
    updatedAt,
    patientData,
    doctorData,
    symptoms,
  } = consult;

  return (
    <>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <Typography variant="h2">Consultation Details</Typography>
        </Grid>

        <Grid item container direction="column" className={classes.parentGridWrapper}>
          <Grid
            item
            container
            flexWrap="wrap"
            className={classes.item}
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            alignItems={{ md: "center", xs: "flex-start", sm: "flex-start" }}
            rowGap={{ xs: "1.5rem", sm: "1.5rem" }}
          >
            <Grid item>
              <Grid container className={classes.subItem} gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Consultation Date:
                  </Typography>
                </Grid>
                <Grid item container>
                  <Typography variant="h5">{dateMoment(createdAt)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container className={classes.subItem} gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Referral:
                  </Typography>
                </Grid>
                <Grid item>
                  {referralId ? (
                    <Grid item container gap={2}>
                      <Typography variant="body1">{trucateString(referralId, 10)}</Typography>
                      <Copy text={referralId} name="Consultation ID" />
                    </Grid>
                  ) : (
                    "No value"
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container flexDirection="column" gap={2} className={classes.subItem}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Consultation ID:
                  </Typography>
                </Grid>
                <Grid item>
                  {referralId ? (
                    <Grid item container gap={2}>
                      <Typography variant="h5">{trucateString(referralId, 10)}</Typography>
                      <Copy text={referralId} name="Consultation ID" />
                    </Grid>
                  ) : (
                    <Typography variant="h5"> No value</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid
            item
            container
            className={classes.item}
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            alignItems={{ md: "center", xs: "flex-start", sm: "flex-start" }}
            rowGap={{ xs: "1.5rem", sm: "1.5rem" }}
          >
            <Grid item>
              <Grid container className={classes.subItem} gap={2}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Doctor:
                  </Typography>
                </Grid>
                {patientData && Object.keys(patientData).length > 0 ? (
                  <Grid item container alignItems="center">
                    <Grid item marginRight={2}>
                      <Avatar
                        src={patientData.image}
                        alt={`Display photo of the ${patientData.firstName}`}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{`${patientData.firstName} ${patientData.lastName}`}</Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="h5">No Doctor</Typography>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container className={classes.subItem} gap={2}>
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
              <Grid item container className={classes.subItem} gap={2}>
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
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />

          <Grid
            item
            container
            className={classes.item}
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            alignItems={{ md: "center", xs: "flex-start", sm: "flex-start" }}
            rowGap={{ xs: "1.5rem", sm: "1.5rem" }}
          >
            <Grid item container className={classes.subItem} gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Severity:
                </Typography>
              </Grid>
              <Grid item>
                <Grid container gap={1}>
                  <Typography variant="body1">{severity ? severity : "No value"}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container className={classes.subItem} gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  First Notice:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1"> {firstNotice ? firstNotice : "No value"}</Typography>
              </Grid>
            </Grid>
            <Grid item container className={classes.subItem} gap={2}>
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
            className={classes.item}
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            alignItems={{ md: "center", xs: "flex-start", sm: "flex-start" }}
            rowGap={{ xs: "1.5rem", sm: "1.5rem" }}
          >
            <Grid item container className={classes.subItem} gap={2}>
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
                          {`${symptom.name},`}
                        </Typography>
                      );
                    })
                  ) : (
                    <Typography variant="body1">No Value</Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container flexDirection="column" className={classes.subItem} gap={2}>
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
            <Grid item>
              <Grid item container className={classes.subItem} gap={2}>
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
            className={classes.item}
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            alignItems={{ md: "center", xs: "flex-start", sm: "flex-start" }}
            rowGap={{ xs: "1.5rem", sm: "1.5rem" }}
          >
            <Grid item container className={classes.subItem} gap={2}>
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
            <Grid item container direction="column" gap={2}>
              <Grid item>
                <Typography variant="body1" className={classes.title}>
                  Updated At:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ lineHeight: 1.85 }}>
                  {dateMoment(updatedAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          <Grid item container style={{ padding: "2rem 3rem" }} justifyContent="flex-end">
            <Grid item container width={{ md: "20%", xs: "100%", sm: "50%" }}>
              <CustomButton
                title="View Prescription"
                width="100%"
                type={buttonType}
                onClick={handleDialogOpen}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals
        isOpen={isOpen}
        height={{ xs: "90vh" }}
        title="Prescription"
        width={{ md: "50vw", sm: "70vw", xs: "90vw" }}
        rowSpacing={2}
        handleClose={handleDialogClose}
      >
        <Grid item container width="100%" direction="row">
          <Grid
            item
            container
            padding={{ md: "2rem 0", sm: "1rem 0", xs: "1rem 0" }}
            // alignItems="center"
            justifyContent="space-between"
            width="100%"
            flexDirection={{ xs: "column", sm: "row", md: "row" }}
            alignItems={{ md: "center", xs: "flex-start", sm: "flex-start" }}
            rowGap={{ xs: "1rem", sm: "1.5rem" }}
          >
            <Grid item>
              <Grid item container className={classes.subItem} gap={{ md: 2, sm: 2, xs: 0 }}>
                <Grid item>
                  <Typography variant="body1" className={classes.title}>
                    Doctor:
                  </Typography>
                </Grid>
                {doctorData && Object.keys(doctorData).length > 0 ? (
                  <Grid container alignItems="center">
                    <Grid item marginRight={2}>
                      <Avatar
                        src={doctorData.image}
                        alt={`Display photo of the ${doctorData.firstName}`}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{`${doctorData.firstName} ${doctorData.lastName}`}</Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body1">No Doctor</Typography>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container className={classes.subItem} gap={{ md: 2, sm: 2, xs: 0 }}>
                <Grid>
                  <Typography variant="body1" className={classes.title}>
                    Prescription Date
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{dateMoment(createdAt)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container className={classes.subItem} gap={{ md: 2, sm: 2, xs: 0 }}>
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
                          <Typography key={i.name} variant="h5">
                            {i.name}
                          </Typography>
                        );
                      })
                    ) : (
                      <Typography variant="h5">No Value</Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider color={theme.palette.common.lighterGrey} />
          {prescription && (
            <Fragment>
              <Grid
                item
                container
                style={{ padding: "2rem 0rem" }}
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
            </Fragment>
          )}

          {prescription &&
            prescription.map((i, index) => {
              return (
                <>
                  <Grid
                    key={index}
                    item
                    container
                    style={{ color: "#4f4f4f" }}
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
            padding={{ md: "2rem 0", sm: "1rem 0", xs: "1rem 0" }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "nowrap" }}
          >
            <Grid item container direction="column" gap={{ md: 2, sm: 2, xs: 0 }}>
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
      </Modals>
    </>
  );
};

HcpCaseNotes.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
};

export default HcpCaseNotes;
