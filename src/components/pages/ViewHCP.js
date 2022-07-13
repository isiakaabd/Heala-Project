import React, { useEffect, useState } from "react";
import { NoData } from "components/layouts";
import { useSnackbar } from "notistack";
import { CustomButton, Loader, Modals } from "components/Utilities";
import { Grid, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { dateMoment } from "components/Utilities/Time";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { verification, getVerification, getCategory } from "components/graphQL/useQuery"; //
import { rejectVerification, updateDoctorProvider } from "components/graphQL/Mutation";
import { verifyHCP } from "components/graphQL/Mutation";
import displayPhoto from "assets/images/avatar.svg";
import { useTheme } from "@mui/material/styles";
import { FormikControl } from "components/validation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Success from "components/modals/Success";
import { handleError, showSuccessMsg } from "helpers/filterHelperFunctions";

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
      rowGap: "2rem",
      "& > *": {
        flex: 1,
        flexDirection: "column",
        gap: "10px",
      },
    },
    "@media (max-width:1200px)": {
      gap: "10px",
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
    borderRadius: "1rem",
    minHeight: "14.1rem",
    paddingInline: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
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

const ViewHCP = () => {
  const { viewId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, data, error } = useQuery(verification, {
    variables: { id: viewId },
  });

  const history = useHistory();
  const [respondData, setRespondData] = useState([]);

  const [reject] = useMutation(rejectVerification);
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
    try {
      const { reason } = values;
      const trimedReason = reason.trim();
      console.log("trimmed reason", trimedReason);
      await reject({
        variables: {
          reason: trimedReason,
          id: viewId,
        },
        refetchQueries: [
          {
            query: getVerification,
          },
        ],
      });
      setCancel(false);
      showSuccessMsg(enqueueSnackbar, Typography, "Reject verification successful.");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        history.push("/verification");
      }, 3000);
    } catch (error) {
      console.log("Error from reject verification", error);
      handleError(error, enqueueSnackbar, Typography);
    }
  };

  const theme = useTheme();

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
    respondData.status ? "Doctor Verified!" : "Verify Doctor",
  );
  const [process, setProcess] = useState(undefined);
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

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;

  return (
    <>
      <Grid container direction="column" rowGap={4} sx={{ overFlow: "hidden" }}>
        <Grid
          item
          direction={{ md: "row", xs: "column", sm: "row" }}
          width="100%"
          justifyContent="space-between"
          gap={{ md: 2, sm: 2, xs: 2 }}
          container
          flexWrap={{ md: "nowrap", sm: "wrap" }}
          alignItems="center"
          padding={{ sm: "2.5rem", xs: "1.5rem", md: "3rem" }}
          className={`${classes.cardGrid} ${classes.firstContainer}`}
        >
          <Grid item container justifyContent="center" height="100%">
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
            flex={1}
            container
            display="grid"
            gridTemplateColumns={{
              md: "repeat(4,minmax(15rem,1fr))",
              sm: "repeat(3,minmax(15rem,auto))",
              xs: "repeat(2,1fr)",
            }}
            className={classes.cardContainer}
          >
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Doctor Name</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData ? `${doctorData.firstName} ${doctorData.lastName}` : "No Doctor"}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography variant="body1">Hospital</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {doctorData && doctorData.hospital !== "" ? doctorData.hospital : "No Hospital"}
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
                  {doctorData ? `${doctorData.specialization}` : "No specialization "}
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
                    color: status === true ? theme.palette.common.green : theme.palette.common.red,
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
              gridColumnStart={{ sm: 2, xs: 2, md: 3 }}
              sx={{ justifyContent: "center !important" }}
            >
              <CustomButton
                title="View Doctor Profile"
                type={trasparentButton}
                width="100%"
                component={Link}
                to={`/hcps/${doctorData && doctorData._id}`}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* qualifications */}
        <Grid
          container
          display="grid"
          gap={3}
          gridTemplateColumns={{
            md: "repeat(2,1fr)",
            sm: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          }}
        >
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap={{ sm: 3, md: 4, xs: 3 }}
              className={classes.cardGrid}
            >
              <Grid item>
                <Typography variant="h4">Qualification</Typography>
              </Grid>
              {qualification?.degree !== "" && qualification?.image !== "" ? (
                <Grid item container gap={2} justifyContent={{ xs: "left", sm: "center" }}>
                  {qualification?.degree && (
                    <Grid item>
                      <Typography variant="h5" className={classes.link}>
                        {qualification.degree}
                      </Typography>
                    </Grid>
                  )}
                  {qualification?.year && (
                    <Typography variant="h5" item className={classes.link}>
                      {dateMoment(qualification.year).slice(-4)}
                    </Typography>
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
                <Typography variant="h5" item className={classes.link}>
                  Not Provided
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* 2 */}
          <Grid item>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
              gap={{ sm: 3, md: 4, xs: 3 }}
              className={classes.cardGrid}
            >
              <Grid item>
                <Typography variant="h5">License</Typography>
              </Grid>
              {license && license.number ? (
                <Grid
                  item
                  container
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent={{
                    md: "center",
                    sm: "center",
                    xs: "flex-start",
                  }}
                  gap={2}
                >
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

          {/* 3 */}
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            gap={{ sm: 3, md: 4, xs: 3 }}
            className={classes.cardGrid}
          >
            <Grid item>
              <Typography variant="h4">Year Book</Typography>
            </Grid>
            {yearbook && Object.keys(yearbook).length > 0 && yearbook.image ? (
              <Grid
                item
                container
                justifyContent={{
                  md: "center",
                  sm: "center",
                  xs: "flex-start",
                }}
                gap={2}
                alignItems="center"
                flexWrap="wrap"
              >
                {yearbook && yearbook?.graduation_year !== "Invalid date" ? (
                  <Typography className={classes.link} variant="h5">
                    {yearbook?.graduation_year?.slice(0, 4)}
                  </Typography>
                ) : (
                  <Grid item>
                    <Typography className={classes.link} variant="h5">
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
                <Typography className={classes.link} variant="h5">
                  Not Provided
                </Typography>
              </Grid>
            )}
          </Grid>

          {/* 4 */}
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            gap={{ sm: 3, md: 4, xs: 3 }}
            className={classes.cardGrid}
          >
            <Grid item>
              <Typography variant="h4">Alumni</Typography>
            </Grid>
            {alumni_association?.facebook_group_name ? (
              <Grid
                item
                container
                justifyContent={{
                  md: "center",
                  sm: "center",
                  xs: "flex-start",
                }}
                gap={2}
              >
                {alumni_association.facebook_group_name && (
                  <a
                    href={alumni_association.image}
                    rel="noreferrer"
                    target="_blank"
                    className={classes.link}
                  >
                    <span>{alumni_association.facebook_group_name}</span>
                  </a>
                )}
                {alumni_association.instagram_handle && (
                  <a
                    href={alumni_association.image}
                    rel="noreferrer"
                    target="_blank"
                    className={classes.link}
                  >
                    <span>{alumni_association.instagram_handle}</span>
                  </a>
                )}
              </Grid>
            ) : (
              <Typography variant="h5" className={classes.link}>
                Not Provided
              </Typography>
            )}
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            gap={{ sm: 3, md: 4, xs: 3 }}
            className={classes.cardGrid}
          >
            <Grid item>
              <Typography variant="h4">Reference ID</Typography>
            </Grid>
            <Grid
              item
              container
              // justifyContent="center"
              justifyContent={{
                md: "center",
                sm: "space-between",
                xs: "space-around",
              }}
              gap={2}
              flexWrap="nowrap"
            >
              {reference?.reference_code ? (
                <Typography variant="h5" className={classes.link}>
                  {process ? process : reference?.reference_code}
                </Typography>
              ) : (
                <Typography variant="h5" className={classes.link}>
                  Not Provided
                </Typography>
              )}
              {reference?.reference_code && (
                <Grid item>
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
                    onClick={() => handleUpdateProVider(reference?.reference_code)}
                    disabled={doctorData?.providerId === reference?.reference_code ? true : false}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* 5 */}

        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexWrap="nowrap"
          className={classes.cardGrid}
        >
          <Grid item>
            <CustomButton
              title="Reject Verification"
              type={RedButton}
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

      <Modals
        isOpen={cancel}
        width={{ sm: "30vw", md: "30vw", xs: "90vw" }}
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

export default ViewHCP;
