import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "components/Utilities/Loader";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import FormikControl from "components/validation/FormikControl";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { CREATE_MESSAGE } from "components/graphQL/Mutation";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { getMessage, doctor } from "components/graphQL/useQuery";

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

const HCPChat = ({
  setSelectedSubMenu,
  setSelectedMenu,
  selectedSubMenu,
  selectedMenu,
  setSelectedHcpMenu,
  setSelectedScopedMenu,
}) => {
  const { hcpId } = useParams();

  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const [createNewMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [{ query: getMessage }],
  });
  const { data, loading } = useQuery(doctor, { variables: { id: hcpId } });
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
      setprofile(data.doctorProfile);
    }
  }, [data]);

  const validationSchema = Yup.object({
    subject: Yup.string("Enter your subject").required("Subject is required"),
    textarea: Yup.string("Enter your message").required("Message is required"),
    recipient: Yup.string("Enter your recipient").required("recipients is required"),
  });
  const onSubmit = async (values, onSubmitProps) => {
    const id = localStorage.getItem("user_id");
    const { subject, textarea } = values;

    try {
      await createNewMessage({
        variables: {
          sender: id,
          recipient: hcpId,
          subject,
          body: textarea,
        },
      });
    } catch (error) {
      console.log(error);
    }
    onSubmitProps.resetForm();
    history.push(`/hcps/${hcpId}/profile`);

    setSelectedScopedMenu(0);
  };

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(1);
    setSelectedScopedMenu(3);
    //   eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, setSelectedHcpMenu, setSelectedScopedMenu]);
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
                <PreviousButton
                  path={`/hcps/${hcpId}/profile`}
                  onClick={() => setSelectedScopedMenu(0)}
                />
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

HCPChat.propTypes = {
  chatMediaActive: PropTypes.bool,
  setChatMediaActive: PropTypes.func,
  setSelectedSubMenu: PropTypes.func,
  setSelectedMenu: PropTypes.func,
  selectedSubMenu: PropTypes.number,
  selectedMenu: PropTypes.number,
  setSelectedHcpMenu: PropTypes.func,
  setSelectedScopedMenu: PropTypes.func,
};

export default HCPChat;
