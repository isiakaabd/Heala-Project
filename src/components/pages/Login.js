import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Grid,
  Checkbox,
  InputAdornment,
  Typography,
  Button,
} from "@mui/material";

import logo from "assets/images/logo.svg";
import { useSelector } from "react-redux";
import { Loader } from "components/Utilities";
import { setAccessToken } from "../../accessToken";
import { useStyles } from "styles/loginPageStyles";
import { useActions } from "components/hooks/useActions";
import { Login_USER } from "components/graphQL/Mutation";
import LoginInput from "components/validation/LoginInput";
import { showErrorMsg } from "../../helpers/filterHelperFunctions";

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { authError } = useSelector((state) => state.auth);
  const history = useHistory();
  const [loginInfo] = useMutation(Login_USER);
  const { loginUser, loginFailue } = useActions();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    authType: "normal",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .trim()
      .required("Email is required"),
    password: Yup.string().trim().required("password is required"),
  });

  const onSubmit = async (values, onSubmitProps) => {
    let isMounted = true;

    try {
      const { email, password, authType } = values;
      if (isMounted) {
        const { data } = await loginInfo({
          variables: {
            data: { email, password, authType },
          },
        });

        loginUser({
          data: data,
          messages: {
            message: "Login sucessful",
            type: "success",
          },
        });
        if (data) {
          const { email, access_token, _id, userTypeId, dociId } =
            data.login.account;
          setAccessToken(access_token);
          localStorage.setItem("email", email);
          localStorage.setItem("_id", _id);
          localStorage.setItem("userTypeId", userTypeId);
          localStorage.setItem("dociId", dociId);
          history.push("/");
        }
      }
    } catch (error) {
      loginFailue({
        message: error.message,
        type: "error",
      });
    }

    onSubmitProps.resetForm();
    return () => (isMounted = false);
  };

  React.useEffect(() => {
    Object.keys(authError).length > 0 &&
      showErrorMsg(enqueueSnackbar, authError?.message);
  }, [authError, enqueueSnackbar]);

  return (
    <>
      <Grid className={classes.gridContainer}>
        <Grid item className={classes.logoAlign}>
          <img src={logo} alt="Brand logo" className={classes.logo} />
        </Grid>
        <Grid
          item
          sx={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <Grid
            container
            xl={3}
            lg={3.4}
            md={4}
            sm={6}
            xs={10}
            className={classes.rightParentGrid}
            sx={{ justifyContent: "center" }}
          >
            <Grid item container>
              <Grid item container>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnMount={false}
                  validateOnBlur={false}
                >
                  {({ isSubmitting, isValid, dirty }) => {
                    return (
                      <Grid
                        item
                        container
                        direction="column"
                        sx={{ paddingBottom: "2rem" }}
                      >
                        <Form>
                          <Grid
                            item
                            style={{
                              borderBottom: "1px solid #E5E9F1",
                              marginBottom: "2rem",
                            }}
                          >
                            <Typography
                              variant="h1"
                              className={classes.heading}
                            >
                              Log in into your account
                            </Typography>
                          </Grid>
                          <Grid sx={{ padding: "1rem 3rem" }}>
                            <Grid
                              item
                              style={{ marginBottom: "2rem", width: "100%" }}
                            >
                              <Grid container direction="column">
                                <LoginInput
                                  label="Email address"
                                  name="email"
                                  type="email"
                                  autoFocus={false}
                                  id="email"
                                  placeholder="Enter your email"
                                  hasStartIcon={false}
                                />
                              </Grid>
                            </Grid>
                            <Grid item style={{ marginBottom: "0rem" }}>
                              <Grid container direction="column">
                                <LoginInput
                                  id="password"
                                  label="Password"
                                  name="password"
                                  placeholder="Enter your password"
                                  type={showPassword ? "text" : "password"}
                                  endIcon={
                                    <InputAdornment
                                      position="end"
                                      onClick={() =>
                                        setShowPassword((prev) => !prev)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      {showPassword ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </InputAdornment>
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Grid item style={{ margin: "1rem 0 2rem" }}>
                              <Grid
                                container
                                alignItems="center"
                                flexWrap="nowrap"
                                justifyContent="space-between"
                              >
                                <Grid item container alignItems="center">
                                  <Checkbox
                                    {...label}
                                    defaultChecked
                                    sx={{
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "min(28, 5vw)",
                                        color: "#3E5EA9",
                                      },
                                    }}
                                    color="success"
                                  />

                                  <Typography
                                    variant="span"
                                    sx={{
                                      color: "#767676",
                                      fontWeight: 300,
                                      fontSize: "14px",
                                    }}
                                  >
                                    Remember me
                                  </Typography>
                                </Grid>

                                {/* <Grid item>
                                  <Typography
                                    variant="span"
                                    color="error"
                                    component={Link}
                                    to="forgot-password"
                                    className={classes.link}
                                    noWrap
                                    sx={{
                                      fontSize: "clamp(1rem, 2vw, 1.4rem)",
                                    }}
                                  >
                                    Forgot password?
                                  </Typography>
                                </Grid> */}
                              </Grid>
                            </Grid>
                            <Grid item container>
                              <Button
                                type="submit"
                                className={classes.loginBtn}
                                disabled={!(dirty || isValid) || isSubmitting}
                              >
                                {isSubmitting ? (
                                  <Loader size={35} color="info" />
                                ) : (
                                  "Log in"
                                )}
                              </Button>
                            </Grid>
                          </Grid>
                        </Form>
                      </Grid>
                    );
                  }}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          style={{ marginTop: "3rem" }}
        >
          <a
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#000000",
            }}
            href="https://partners.heala.io"
          >
            Partner login
          </a>
        </Grid>
      </Grid>
    </>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
