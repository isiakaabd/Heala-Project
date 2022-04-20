import React, { useEffect, useState } from "react";
import { NoData } from "components/layouts";
import PropTypes from "prop-types";
import { CustomButton, Loader, Modals, PreviousButton } from "components/Utilities";
import { Grid, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { dateMoment } from "components/Utilities/Time";
import { useQuery, useMutation } from "@apollo/client";
import { verification } from "components/graphQL/useQuery";
import { rejectVerification, updateUserProvider } from "components/graphQL/Mutation";
import { verifyHCP } from "components/graphQL/Mutation";
import displayPhoto from "assets/images/avatar.svg";
import { useTheme } from "@mui/material/styles";
import { FormikControl } from "components/validation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Success from "components/modals/Success";

const useStyles = makeStyles((theme) => ({
  parentGridWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
    "&:not(:last-of-type)": {
      marginBottom: "5rem",
    },
  },
  gridsWrapper: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.3rem !important",
      //   height: "2.7rem",
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: "1.5rem",
    },
  },

  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem 5rem",
    height: "14.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
  firstContainer: {
    width: "100%",
    height: "100%",
  },

  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },

  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    color: theme.palette.common.green,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: ".75rem",
    borderRadius: "1.5rem",
    textDecoration: "none",
  },

  linkIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
      marginLeft: "1.2rem",
    },
  },

  buttonsGridWrapper: {
    marginTop: "5rem !important",
    height: "16.1rem",
  },

  title: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      // marginRight: "2rem",
    },
  },
}));

const ViewHCP = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const { viewId } = useParams();
  const { loading, data, error } = useQuery(verification, {
    variables: { id: viewId },
  });

  const history = useHistory();
  const [respondData, setRespondData] = useState([]);

  const [reject] = useMutation(rejectVerification);
  // const onConfirm = () => {
  //   setCancel(true);
  // };
  const [open, setOpen] = useState(false);
  const [updateState, setUpdateState] = useState("Update Provider");
  const [update] = useMutation(updateUserProvider);
  const [submit, setSubmit] = useState(false);
  const handleDialogCloses = () => setOpen(false);
  const handleUpdateProVider = async (value) => {
    try {
      setSubmit(true);
      await update({
        variables: {
          dociId: respondData && respondData.doctorData.dociId,
          providerId: value,
        },
      });
      setSubmit(false);
      setUpdateState("Updated");
    } catch (err) {
      setSubmit(false);
      console.log(err);
    }
  };
  const [cancel, setCancel] = useState(false);
  console.log(respondData.dociId);
  const handleDialogOpen = () => {
    setCancel(true);
  };
  const initialValues = {
    reason: "",
  };
  const validationSchema = Yup.object({
    reason: Yup.string("Enter Reason ").required("Reason is required"),
  });
  const onSubmit = async (values) => {
    const { reason } = values;

    await reject({
      variables: {
        reason,
        id: viewId,
      },
      refetchQueries: [
        {
          query: verification,
          variables: { id: viewId },
        },
      ],
    });
    setCancel(false);

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      history.push("/verification");
    }, 3000);
  };
  // eslint-disable-next-line

  const theme = useTheme();
  // const darkButton = {
  //   background: theme.palette.primary.main,
  //   hover: theme.palette.primary.light,
  //   active: theme.palette.primary.dark,
  // };
  const trasparentButton = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const RedButton = {
    background: "#f8432b",
    hover: "red",
    active: "red",
    disabled: "red",
  };
  useEffect(() => {
    if (data) {
      setRespondData(data.getVerification);
    }
  }, [data]);
  const [verifyState, setVerifyState] = useState(
    respondData.status ? "Doctor Verified!" : "Verify Doctor",
  );
  useEffect(() => {
    if (respondData.status) {
      setVerifyState("Doctor Verified!");
    }
  }, [respondData.status]);
  const {
    qualification,
    license,
    alumni_association,
    reference,
    doctorData,
    yearbook,
    status,
    // eslint-disable-next-line
  } = respondData;
  const [verify, { data: verifyData }] = useMutation(verifyHCP);
  const [button, setButtonValue] = useState(respondData.status);

  useEffect(() => {
    if (verifyData && verifyData.verifyHCP.status) {
      setVerifyState("Doctor Verified!!");
      setButtonValue(verifyData.verifyHCP.status);
    }
  }, [verify, status, verifyState, verifyData]);

  const handleVerifyDoctor = async () => {
    try {
      await verify({
        variables: {
          id: viewId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  const classes = useStyles();
  useEffect(() => {
    setSelectedMenu(7);
    setSelectedSubMenu(8);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  // eslint-disable-next-line
  console.log(license, "update");
  return (
    <>
      <Grid container direction="column" gap={2} sx={{ overFlow: "hidden" }}>
        <Grid item>
          <PreviousButton path="/verification" />
        </Grid>
        <Grid
          item
          flexWrap="nowrap"
          width="100%"
          justifyContent="space-between"
          gap={4}
          container
          alignItems="center"
          className={`${classes.cardGrid} ${classes.firstContainer}`}
        >
          <Grid item container justifyContent="center" flex={1} height="100%">
            <Grid item>
              <Avatar
                src={doctorData ? doctorData.picture : displayPhoto}
                sx={{ minWidth: "150px", minHeight: "150px", marginRight: "2rem" }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            gap={3}
            sx={{ height: "100%" }}
          >
            <Grid
              container
              direction="row"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} md={4}>
                <Grid container direction="column" gap={1}>
                  <Grid item>
                    <Typography variant="body1">Doctor Name</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">
                      {doctorData ? `${doctorData.firstName} ${doctorData.lastName}` : "No Doctor"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container direction="column" gap={1}>
                  <Grid item>
                    <Typography variant="body1">Hospital</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">
                      {doctorData ? `${doctorData.hospital}` : "No Hospital "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container direction="column" gap={1}>
                  <Grid item>
                    <Typography variant="body1">Gender:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">
                      {doctorData ? `${doctorData.gender} ` : "Not Specified"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={4} md={4}>
                <Grid container direction="column" gap={1}>
                  <Grid item>
                    <Typography variant="body1">Medical ID:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">
                      {doctorData ? `${doctorData.dociId.split("-")[1]}` : "No ID "}{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container direction="column" gap={1}>
                  <Grid item>
                    <Typography variant="body1">Specialization:</Typography>
                  </Grid>
                  <Grid item width="100%">
                    <Typography variant="h4">
                      {doctorData ? `${doctorData.specialization}` : "No specialization "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4}>
                <Grid container direction="column" gap={1} width="100%">
                  <Grid item>
                    <Typography variant="body1">DOB:</Typography>
                  </Grid>
                  <Grid item width="100%">
                    <Typography variant="h4">
                      {doctorData ? `${dateMoment(doctorData.dob)}` : "No DOB"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
          <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4">Qualification</Typography>
              </Grid>
              {qualification ? (
                <Grid item container gap={2}>
                  {qualification?.degree && (
                    <Grid className={classes.link}>{qualification.degree}</Grid>
                  )}
                  {qualification?.year && (
                    <Grid className={classes.link}>{dateMoment(qualification.year).slice(-4)}</Grid>
                  )}
                  {qualification?.image && (
                    <a
                      href={qualification.image}
                      rel="noreferrer"
                      target="_blank"
                      className={classes.link}
                    >
                      <span>Qualification PNG</span>
                    </a>
                  )}
                </Grid>
              ) : (
                <Grid item className={classes.link}>
                  Not Provided
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4">License</Typography>
              </Grid>
              {license && license.number ? (
                <Grid item container gap={2}>
                  {license.number && (
                    <Grid item className={classes.link}>
                      {license.number}
                    </Grid>
                  )}
                  {license.type && (
                    <Grid item className={classes.link}>
                      {license.type}
                    </Grid>
                  )}
                  {license.image && (
                    <Grid item>
                      <a
                        href={license.image}
                        rel="noreferrer"
                        className={classes.link}
                        target="_blank"
                      >
                        <span>IMG</span>
                      </a>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Grid item className={classes.link}>
                  Not Provided
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
          <Grid item md className={classes.cardGrid} style={{ marginRight: "2rem" }}>
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4">Year Book</Typography>
              </Grid>
              {yearbook ? (
                <Grid item container gap={2}>
                  {yearbook.graduation_year !== "Invalid date" ? (
                    <Grid item className={classes.link}>
                      {yearbook.graduation_year.slice(0, 4)}
                    </Grid>
                  ) : (
                    <Grid item>
                      <Typography className={classes.link} variant="h4">
                        Not Provided
                      </Typography>
                    </Grid>
                  )}
                  {yearbook.image && (
                    <Grid item>
                      <a
                        href={yearbook.image}
                        rel="noreferrer"
                        target="_blank"
                        className={classes.link}
                      >
                        <span>Qualification PNG</span>
                      </a>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Grid item>
                  <Typography className={classes.link} variant="h4">
                    Not Provided
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid item md className={classes.cardGrid} style={{ marginLeft: "2rem" }}>
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4">Alumni</Typography>
              </Grid>
              {alumni_association?.facebook_group_name ? (
                <Grid item container gap={2}>
                  {alumni_association.facebook_group_name && (
                    <Grid item>
                      <a
                        href={alumni_association.image}
                        rel="noreferrer"
                        target="_blank"
                        className={classes.link}
                      >
                        <span>{alumni_association.facebook_group_name}</span>
                      </a>
                    </Grid>
                  )}
                  {alumni_association.instagram_handle && (
                    <Grid item>
                      <a
                        href={alumni_association.image}
                        rel="noreferrer"
                        target="_blank"
                        className={classes.link}
                      >
                        <span>{alumni_association.instagram_handle}</span>
                      </a>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Grid item className={classes.link}>
                  Not Provided
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between" style={{ paddingTop: "2rem" }}>
          <Grid item md style={{ marginRight: " 2rem" }} className={classes.cardGrid}>
            <Grid
              container
              direction="column"
              style={{ height: "100%" }}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h4">Reference ID</Typography>
              </Grid>

              {reference?.reference_code ? (
                <>
                  <Grid item className={classes.link}>
                    {reference.reference_code}
                  </Grid>
                </>
              ) : (
                <Grid className={classes.link}>Not Provided</Grid>
              )}
              <Grid item sx={{ alignSelf: "center" }}>
                <CustomButton
                  title={updateState}
                  type={trasparentButton}
                  width="100%"
                  isSubmitting={submit}
                  onClick={() => handleUpdateProVider(reference?.reference_code)}
                  disabled={updateState === "Updated"}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            md
            style={{ marginLeft: "2rem", visibility: "hidden" }}
            className={classes.cardGrid}
          ></Grid>
        </Grid>
        <Grid item container style={{ paddingTop: "2rem" }}>
          <Grid item container justifyContent="center" gap={2} className={classes.cardGrid}>
            <Grid item>
              <CustomButton
                title="Reject Verification"
                type={RedButton}
                // disabled={button}
                onClick={handleDialogOpen}
                width="100%"
              />
            </Grid>
            <Grid item>
              <CustomButton
                title={verifyState}
                type={trasparentButton}
                disabled={button}
                onClick={handleVerifyDoctor}
                width="100%"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals
        isOpen={cancel}
        title="Reject Doctor"
        rowSpacing={5}
        handleClose={() => setCancel(false)}
      >
        <Formik
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
          initialValues={initialValues}
          enableReinitialize
        >
          {({ isSubmitting, dirty, isValid }) => {
            return (
              <Form style={{ marginTop: "3rem" }}>
                <Grid container>
                  <Grid item container>
                    <FormikControl
                      control="input"
                      label="State a Reason"
                      name="reason"
                      placeholder="Enter reason"
                    />
                  </Grid>
                  <Grid item container sx={{ flexGrow: 1, marginTop: "10rem" }}>
                    <CustomButton
                      title="Reject Verification"
                      type={trasparentButton}
                      width="100%"
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
      <Success
        open={open}
        handleDialogClose={handleDialogCloses}
        title=""
        type="fail"
        confirmationMsg=" Doctor Verification failed"
        btnValue="Continue"
      />
    </>
  );
};

ViewHCP.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ViewHCP;
