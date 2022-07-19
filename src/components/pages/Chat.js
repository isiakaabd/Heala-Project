import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Grid, Typography, Divider } from "@mui/material";
import { Loader, CustomButton, PreviousButton } from "components/Utilities";
import { useParams } from "react-router-dom";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { CREATE_MESSAGE } from "components/graphQL/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { showSuccessMsg, handleError } from "../../helpers/filterHelperFunctions";
import { getMessage, getProfile } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    "&.MuiGrid-item": {
      borderRadius: "1rem",
      background: "#fff",
      padding: "2rem 4rem",
      maxWidth: "60rem !important",
      boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.1)",
    },
  },
  inputGrid: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      //   fontSize: "1rem"
    },
  },
  formInput: {
    width: "100%",
    height: "100%",
    fontSize: "1.5rem",
    padding: ".5rem 1rem",
    border: "none",
    background: "transparent",
    color: theme.palette.common.grey,

    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    borderRadius: "0.5rem",
  },
  divider: {
    "&.MuiDivider-root": {
      borderColor: "rgba(0, 0, 0, 0.03)",
    },
  },
}));

const Chat = () => {
  const { patientId } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [createNewMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [{ query: getMessage }],
  });
  const { data, loading } = useQuery(getProfile, {
    variables: { profileId: patientId },
  });
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };
  const [profile, setprofile] = useState("");
  const { firstName, lastName } = profile;

  const initialValues = {
    subject: "",
    recipient: `${firstName} ${lastName} ` || "",
    textarea: "",
  };

  useEffect(() => {
    if (data) {
      setprofile(data.profile);
    }
  }, [data]);

  const validationSchema = Yup.object({
    subject: Yup.string("Enter your subject").trim().required("Subject is required"),
    textarea: Yup.string("Enter your message").trim().required("Message is required"),
    recipient: Yup.string("Enter your recipient").trim().required("recipients is required"),
  });
  const onSubmit = async (values, onSubmitProps) => {
    const id = localStorage.getItem("user_id");
    const { subject, textarea } = values;

    try {
      await createNewMessage({
        variables: {
          sender: id,
          recipient: patientId,
          subject,
          body: textarea,
        },
      });
      showSuccessMsg(enqueueSnackbar, Typography, "Message sent");
    } catch (error) {
      handleError(error, enqueueSnackbar);
      console.log(error);
    }
    onSubmitProps.resetForm();
    history.push(`/patients/${patientId}/profile`);
    /* setSelectedScopedMenu(0); */
  };

  if (loading) return <Loader />;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
      enableReinitialize
    >
      {({ isValid, isSubmitting, dirty }) => {
        return (
          <Form>
            <Grid container direction="column">
              <Grid item style={{ marginBottom: "3rem" }}>
                <PreviousButton path={`/patients/${patientId}/profile`} />
              </Grid>
              <Grid item container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h4" style={{ marginBottom: "3rem" }}>
                    Create New Message
                  </Typography>
                </Grid>
                <Grid item container direction="column" className={classes.gridWrapper}>
                  <Grid item>
                    <Grid item container alignItems="center" sx={{ gap: "0!important" }}>
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Recipient:
                        </Typography>
                      </Grid>
                      <Grid item className={classes.inputGrid}>
                        <FormikControl
                          control="input"
                          id="message"
                          name="recipient"
                          disabled
                          variant="standard"
                          className={classes.formInput}
                        />
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Subject:
                        </Typography>
                      </Grid>
                      <Grid item className={classes.inputGrid}>
                        <FormikControl
                          control="input"
                          id="subject"
                          name="subject"
                          variant="standard"
                          className={classes.formInput}
                        />
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Message:
                        </Typography>
                      </Grid>
                      <Grid item style={{ height: "15rem" }}>
                        <FormikControl
                          control="textarea"
                          id="textarea"
                          name="textarea"
                          variant="standard"
                          fLabel={true}
                        />
                      </Grid>
                    </Grid>
                    {/* <Divider className={classes.divider} /> */}
                  </Grid>
                  <Grid item style={{ alignSelf: "flex-end", marginTop: "2rem" }}>
                    <CustomButton
                      title="Send Message"
                      width="100%"
                      type={buttonType}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
                      // endIcon={<ArrowForwardIosIcon style={{ fontSize: "1.5rem" }} />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Chat;
