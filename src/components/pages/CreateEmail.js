import React, { useEffect } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChipInput from "material-ui-chip-input";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
      maxWidth: "70rem !important",
      boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.1)",
      "& .MuiFormControl-root": {
        "& .WAMuiChipInput-standard-6 ": {
          display: "flex",
          alignItems: "center",
          fontSize: "1.5rem",
        },
        "& .WAMuiChipInput-chip-16": {
          padding: ".6rem",
          fontSize: "1.5rem",
        },
      },
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
    "& .MuiChipInput-chipContainer": {
      position: "relative",
      display: "none",
      marginTop: 0,
      border: "none !important",
    },

    "&:focus": {
      outline: "none",
      borderBottom: "none !important",
    },
  },
  inputGrid: {
    flex: 1,
  },
  btns: {
    ...theme.typography.btn,
    padding: "2rem 3rem",
  },
  heading: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
    },
  },

  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    fontSize: "30px",
    height: 300,
    borderRadius: "0.5rem",
  },
  divider: {
    "&.MuiDivider-root": {
      borderColor: "rgba(0, 0, 0, 0.03)",
    },
  },
}));

const CreateEmail = ({
  selectedMenu,
  setSelectedMenu /* selectedSubMenu, setSelectedSubMenu */,
}) => {
  const isEvent = (event) =>
    event && (event instanceof Event || event.nativeEvent instanceof Event);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const { emailData } = useActions();

  useEffect(() => {
    setSelectedMenu(6);
    /* setSelectedSubMenu(7); */

    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu */]);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
  };

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
    name: Yup.array().of(
      Yup.string().email("Enter a valid email").required("Email is required")
    ),
    message: Yup.string("Enter your subject").required("Subject is required"),
    textarea: Yup.string("Enter your message").required("Message is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnMount={false}
    >
      {({ isSubmitting, isValid, dirty }) => {
        return (
          <Form>
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

                <Grid
                  item
                  container
                  direction="column"
                  className={classes.gridWrapper}
                >
                  <Grid item style={{ marginBottom: "3rem" }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Recipient(s):
                        </Typography>
                      </Grid>
                      <Grid item className={classes.inputGrid}>
                        <Field name="name">
                          {({ field, form }) => {
                            const { value, name, onChange } = field;
                            const { setFieldValue } = form;
                            return (
                              <ChipWrapper>
                                <ChipInput
                                  fullWidth
                                  {...field}
                                  name="name"
                                  id="name"
                                  value={value}
                                  style={{
                                    padding: "1.2rem",
                                  }}
                                  disableUnderline
                                  onAdd={(newVal) => {
                                    const newArr = [...value, newVal];
                                    if (isEvent(newArr)) {
                                      onChange(newArr);
                                    } else {
                                      setFieldValue(name, newArr);
                                    }
                                  }}
                                  onDelete={(deletedVal) => {
                                    const newArr = value.filter(
                                      (state) => state !== deletedVal
                                    );
                                    if (isEvent(newArr)) {
                                      onChange(newArr);
                                    } else {
                                      setFieldValue(name, newArr);
                                    }
                                  }}
                                />
                              </ChipWrapper>
                            );
                          }}
                        </Field>
                      </Grid>
                    </Grid>
                    <ErrorMessage name="name" component={TextError} />
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item style={{ marginBottom: "3rem" }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Subject:
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
                    </Grid>
                    <ErrorMessage name="message" component={TextError} />
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid item container>
                    <Grid item container direction="column" maxWidth="100%">
                      <Grid item>
                        <Typography variant="body2" className={classes.heading}>
                          Message:{" "}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        sx={{ marginBottom: "2rem" }}
                        maxWidth="100%"
                      >
                        <Field name="textarea">
                          {({ field, form }) => {
                            return (
                              <Wrapper>
                                <CKEditor
                                  id="textarea"
                                  className="textarea"
                                  name="textarea"
                                  data={field.value}
                                  editor={ClassicEditor}
                                  onChange={(e, editor) => {
                                    form.setFieldValue(
                                      "textarea",
                                      editor.getData("text")
                                    );
                                  }}
                                />
                              </Wrapper>
                            );
                          }}
                        </Field>
                      </Grid>
                    </Grid>
                    <ErrorMessage name="textarea" component={TextError} />
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid
                    item
                    style={{ alignSelf: "flex-end", marginTop: "2rem" }}
                  >
                    <CustomButton
                      title="Send Mail"
                      width="100%"
                      type={buttonType}
                      isSubmitting={isSubmitting}
                      disabled={!(dirty || isValid)}
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
const Wrapper = styled.div`
  display: inline-block;
  max-width: 100%;
  margin-bottom: 2rem;
  font-size: 1.5rem !important;
  overflow: scroll;
  p {
    height: 50px;
    max-height: 200px;
    overflow: scroll;
  }
`;
const ChipWrapper = styled.div`
  font-size: 1.4rem;
`;
CreateEmail.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  /* selectedSubMenu: PropTypes.number.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired, */
};

export default CreateEmail;
