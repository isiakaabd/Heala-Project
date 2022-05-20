import React, { useEffect, useState } from "react";
import { NoData } from "components/layouts";
import PropTypes from "prop-types";
import {
  CustomButton,
  Loader,
  Modals,
  PreviousButton,
} from "components/Utilities";
import { Grid, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { dateMoment } from "components/Utilities/Time";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  verification,
  getVerification,
  getCategory,
} from "components/graphQL/useQuery"; //
import {
  rejectVerification,
  updateDoctorProvider,
  // updateUserProvider,
} from "components/graphQL/Mutation";
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

  cardContainer: {
    "&.MuiGrid-root": {
      display: "grid",
      maxWidth: "100%",
      gridTemplateColumns: "repeat(4,minmax(15rem,1fr))",
      rowGap: "2rem",
      "& > *": {
        flex: 1,
        flexDirection: "column",
        gap: "10px",
      },

      "@media (max-width:1450px)": {
        gridTemplateColumns: "repeat(3,minmax(15rem,auto))",
        "&.MuiGrid-root .btn": {
          gridColumnStart: 3,
        },
      },
      "@media (max-width:1200px)": {
        gap: "10px",
        gridTemplateColumns: "repeat(2,minmax(auto,auto))",
        "&.MuiGrid-root .btn": {
          gridColumnStart: 2,
        },
      },
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
      background: theme.palette.common.lightGreen,
      color: theme.palette.common.green,
      borderRadius: "1.5rem",
    },
  },

  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    padding: "4rem 5rem",
    "@media (max-width:1450px)": {
      padding: "2rem",
    },

    minHeight: "14.1rem",
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

const ViewHCP = ({
  selectedMenu,
  setSelectedMenu,
  /* selectedSubMenu,
  setSelectedSubMenu,
  setDoctorView,
  doctorView, */
}) => {
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
  const [update] = useMutation(updateDoctorProvider);
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
          query: getVerification,
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
    disabled: "#868686",
  };
  const RedButton = {
    background: "red",
    hover: "red",
    active: "red",
    disabled: "#FF8484",
  };
  const [ref, setRef] = useState(null);
  const [get, { data: da }] = useLazyQuery(getCategory);
  useEffect(() => {
    if (data) {
      setRespondData(data.getVerification);
      setRef(data.getVerification.reference?.reference_code);
    }
  }, [data, ref]);
  const [verifyState, setVerifyState] = useState(
    respondData.status ? "Doctor Verified!" : "Verify Doctor"
  );
  const [process, setProcess] = useState(undefined);
  console.log(respondData.status);
  useEffect(() => {
    if (ref) {
      get({
        variables: {
          id: ref,
        },
      });
    }
    if (da && da.getProvider !== null) {
      setProcess(da?.getProvider.name);
    } else {
      setProcess(undefined);
    }
  }, [ref, da, get]);

  useEffect(() => {
    if (respondData.status) {
      setVerifyState("Doctor Verified!!");
    }
  }, [verifyState, respondData.status]);
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
  console.log(doctorData);

  const [verify, { data: verifyData }] = useMutation(verifyHCP);
  const [button, setButtonValue] = useState(respondData.status); //button

  useEffect(() => {
    if (verifyData && verifyData.verifyHCP.status) {
      setVerifyState("Doctor Verified!!");
      setButtonValue(verifyData.verifyHCP.status);
    }
  }, [verify, status, button, verifyState, verifyData]);

  const handleVerifyDoctor = async () => {
    try {
      await verify({
        variables: {
          id: viewId,
        },
        refetchQueries: [
          {
            query: verification,
            variables: {
              id: viewId,
            },
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };
  const classes = useStyles();
  useEffect(() => {
    setSelectedMenu(7);
    /* setSelectedSubMenu(8);
    setDoctorView(0); */
    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu, doctorView */]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  console.log(verifyState);
  // eslint-disable-next-line
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
                sx={{
                  minWidth: "150px",
                  minHeight: "150px",
                  marginRight: "2rem",
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            // direction="column"
            // alignItems="center"
            // gap={3}
            className={classes.cardContainer}
            // sx={{ height: "100%", background: "red" }}
          >
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Doctor Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData
                    ? `${doctorData.firstName} ${doctorData.lastName}`
                    : "No Doctor"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Hospital</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData && doctorData.hospital !== ""
                    ? doctorData.hospital
                    : "No Hospital"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Gender:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData ? `${doctorData.gender} ` : "Not Specified"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Medical ID:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData ? `${doctorData.dociId.split("-")[1]}` : "No ID "}{" "}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Specialization:</Typography>
              </Grid>
              <Grid item width="100%">
                <Typography variant="h4">
                  {doctorData
                    ? `${doctorData.specialization}`
                    : "No specialization "}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">DOB:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData ? `${dateMoment(doctorData.dob)}` : "No DOB"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Status</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  style={{
                    color:
                      status === true
                        ? theme.palette.common.green
                        : theme.palette.common.red,
                    width: "max-content",
                  }}
                >
                  {status ? "Verified" : "Not Verified"}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              className="btn"
              alignItems="center"
              sx={{ justifyContent: "center !important" }}
            >
              <Grid item container>
                <CustomButton
                  title="View Doctor Profile"
                  type={trasparentButton}
                  width="100%"
                  component={Link}
                  to={`/hcps/${doctorData && doctorData._id}`}
                  /* onClick={() => {
                    setSelectedSubMenu(7);
                    setDoctorView(1);
                  }} */
                  // isSubmitting={submit}
                  // onClick={() => handleUpdateProVider(reference?.reference_code)}
                  // disabled={doctorData?.providerId === reference?.reference_code ? true : false}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "2rem" }}
        >
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: "2rem" }}
          >
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
                    <Grid className={classes.link}>
                      {dateMoment(qualification.year).slice(-4)}
                    </Grid>
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

          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: "2rem" }}
          >
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
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "2rem" }}
        >
          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginRight: "2rem" }}
          >
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
              {yearbook &&
              Object.keys(yearbook).length > 0 &&
              yearbook.image ? (
                <Grid item container gap={2}>
                  {yearbook && yearbook?.graduation_year !== "Invalid date" ? (
                    <Grid item className={classes.link}>
                      {yearbook?.graduation_year?.slice(0, 4)}
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

          <Grid
            item
            md
            className={classes.cardGrid}
            style={{ marginLeft: "2rem" }}
          >
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
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ paddingTop: "2rem" }}
        >
          <Grid
            item
            md
            style={{ marginRight: " 2rem" }}
            className={classes.cardGrid}
          >
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
              <Grid
                item
                container
                justifyContent="space-between"
                paddingTop={1}
              >
                {reference?.reference_code ? (
                  <>
                    <Grid item className={classes.link}>
                      {process ? process : reference?.reference_code}
                    </Grid>
                  </>
                ) : (
                  <Grid className={classes.link}>Not Provided</Grid>
                )}
                {reference?.reference_code && (
                  <Grid item sx={{ alignSelf: "center" }}>
                    <CustomButton
                      title={
                        doctorData?.providerId === reference?.reference_code ||
                        updateState === "Updated"
                          ? "Updated"
                          : "Update Provider"
                      }
                      type={trasparentButton}
                      width="100%"
                      isSubmitting={submit}
                      onClick={() =>
                        handleUpdateProVider(reference?.reference_code)
                      }
                      disabled={
                        doctorData?.providerId === reference?.reference_code
                          ? true
                          : false
                      }
                    />
                  </Grid>
                )}
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
          <Grid
            item
            container
            justifyContent="center"
            gap={2}
            className={classes.cardGrid}
          >
            <Grid item>
              <CustomButton
                title="Reject Verification"
                type={RedButton}
                // disabled={verifyState !== "Doctor Verified!"}
                onClick={handleDialogOpen}
                width="100%"
              />
            </Grid>
            <Grid item>
              <CustomButton
                title={verifyState}
                type={trasparentButton}
                disabled={verifyState === "Doctor Verified!!"}
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
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func,
  doctorView: PropTypes.number,
  setDoctorView: PropTypes.func, */
};

export default ViewHCP;
