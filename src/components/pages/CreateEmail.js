import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ChipInput } from "material-ui-formik-components";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useActions } from "components/hooks/useActions";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { TextError } from "components/Utilities/TextError";
import { useHistory } from "react-router";

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
  },
  btns: {
    ...theme.typography.btn,
    padding: "2rem 3rem",
  },
  inputChip: {
    marginLeft: ".8rem",
    "& .WAMuiChipInput-standard-40.WAMuiChipInput-chipContainer-38.WAMuiChipInput-underline-48.WAMuiChipInput-labeled-42": {
      "&::before,&::after": {
        borderBottom: "none !important",
      },
    },
    "& .WAMuiChipInput-chipContainer-21": {
      position: "relative",
      marginTop: 0,
      border: "none !important",
      "&::before,&::after": {
        borderBottom: "none !important",
      },
    },
    "& .MuiFormHelperText-root": {
      color: theme.palette.error.main,
      fontSize: "1.2rem",
    },
    "& .MuiChip-root": {
      fontSize: "1.3rem",
      fontWeight: 600,
      border: "none !important",
      color: theme.palette.primary.main,
    },
    "& .MuiInputBase-input": {
      fontSize: "1.3rem",
    },
  },
  heading: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
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

const CreateEmail = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const greenButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  const { emailData } = useActions();

  useEffect(() => {
    setSelectedMenu(6);
    setSelectedSubMenu(7);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    emailData(values);
    onSubmitProps.resetForm();
    history.push("/email");
  };
  const initialValues = {
    id: Math.floor(Math.random() * 100 + 1),
    name: [],
    message: "",
    textarea: "",
    entryData: "July 17, 2021",
    plan: "HCP",
    email: "Sule@gmail.com",
  };
  const validationSchema = Yup.object({
    name: Yup.array().min(1, "Add atleast a recipient"),
    message: Yup.string("Enter your subject").required("Subject is required"),
    textarea: Yup.string("Enter your message").required("Message is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount
    >
      {(formik) => {
        return (
          <Form
          // style={{ width: "inherit", margin: "auto" }}
          >
            <Grid container direction="column">
              <Grid item style={{ marginBottom: "3rem" }}>
                <PreviousButton path={`/email`} />
              </Grid>
              <Grid item container direction="column" alignItems="center">
                <Grid item>
                  <Typography variant="h4" style={{ marginBottom: "3rem" }}>
                    Create new Email
                  </Typography>
                </Grid>

                <Grid item container direction="column" className={classes.gridWrapper}>
                  <Grid item style={{ marginBottom: "3rem" }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Recipient(s):
                        </Typography>
                      </Grid>
                      <Grid item className={classes.inputGrid}>
                        <Field
                          name="name"
                          id="name"
                          component={ChipInput}
                          className={`${classes.formInput}  ${classes.inputChip}`}
                        />
                        {/* <ErrorMessage name="name" component={TextError} /> */}
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item style={{ marginBottom: "3rem" }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Subject:{" "}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.inputGrid}>
                        <Field
                          id="message"
                          name="message"
                          variant="standard"
                          className={classes.formInput}
                        />
                      </Grid>
                      <ErrorMessage name="message" component={TextError} />
                    </Grid>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Message:{" "}
                        </Typography>
                      </Grid>
                      <Grid item style={{ height: "15rem" }}>
                        <Field
                          id="standard-multiline-static"
                          as="textarea"
                          name="textarea"
                          rows={4}
                          variant="standard"
                          className={`${classes.formInput}  ${classes.textArea}`}
                        />
                      </Grid>
                    </Grid>
                    <ErrorMessage name="textarea" component={TextError} />
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item style={{ alignSelf: "flex-end", marginTop: "2rem" }}>
                    <CustomButton
                      title="Send Mail"
                      type={greenButton}
                      // to="/email/"
                      disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}
                      endIcon={<ArrowForwardIosIcon style={{ fontSize: "1.5rem" }} />}
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
CreateEmail.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default CreateEmail;
