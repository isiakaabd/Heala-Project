import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";
/* import { makeStyles } from "@mui/styles"; */
import { useMutation } from "@apollo/client";
import { useTheme } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Grid,
  Checkbox,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";

import logo from "assets/images/logo.svg";
import { useSelector } from "react-redux";
import { setAccessToken } from "../../accessToken";
import { useStyles } from "styles/loginPageStyles";
import { CustomButton } from "components/Utilities";
/* import people from "assets/images/login-page-photo.png"; */
import { useActions } from "components/hooks/useActions";
import { Login_USER } from "components/graphQL/Mutation";
import LoginInput from "components/validation/LoginInput";
import { showErrorMsg } from "../../helpers/filterHelperFunctions";
/* import loginBackground from "assets/images/login-background.svg"; */

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { authError } = useSelector((state) => state.auth);
  const theme = useTheme();
  const history = useHistory();
  const [loginInfo] = useMutation(Login_USER);
  const { loginUser, loginFailue } = useActions();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [showPassword, setShowPassword] = useState(false);
  const buttonColors = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };
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
      <Grid container className={classes.gridContainer}>
        <Grid item container className={classes.leftParentGrid}></Grid>
        <Grid
          container
          item
          className={classes.rightParentGrid}
          sx={{ justifyContent: "center" }}
        >
          <Grid item container md={8} xs={10} margin="auto">
            <Grid item className={classes.logoAlign}>
              <img src={logo} alt="Brand logo" className={classes.logo} />
            </Grid>
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
                      justifyContent="center"
                    >
                      <Form>
                        <Grid item style={{ marginBottom: "3rem" }}>
                          <Typography variant="h2" className={classes.heading}>
                            Sign into your account
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{ marginBottom: "2rem", width: "100%" }}
                        >
                          <Grid container direction="column">
                            <LoginInput
                              label="Email address"
                              name="email"
                              type="email"
                              autoFocus={true}
                              id="email"
                              placeholder="Enter your email"
                              hasStartIcon={false}
                            />
                          </Grid>
                        </Grid>
                        <Grid item style={{ marginBottom: "2rem" }}>
                          <Grid container direction="column">
                            <LoginInput
                              id="password"
                              label="Password"
                              name="password"
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              hasStartIcon={false}
                              endAdornment={
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
                        <Grid item style={{ marginBottom: "5rem" }}>
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
                                  },
                                }}
                                color="success"
                              />

                              <Typography
                                variant="span"
                                sx={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
                              >
                                Remember me
                              </Typography>
                            </Grid>

                            <Grid item>
                              <Typography
                                variant="span"
                                color="error"
                                component={Link}
                                to="forgot-password"
                                className={classes.link}
                                noWrap
                                sx={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
                              >
                                Forgot password?
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item container>
                          <CustomButton
                            title="Login"
                            width="100%"
                            type={buttonColors}
                            disableRipple
                            isSubmitting={isSubmitting}
                            disabled={!(dirty || isValid)}
                          />
                        </Grid>
                        <Grid
                          item
                          container
                          alignItems="center"
                          style={{ marginTop: "2rem" }}
                        >
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.common.grey }}
                              paddingRight
                            >
                              Dont have an account?
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="h5"
                              color="primary"
                              component={Link}
                              to="/signup"
                              className={classes.link}
                            >
                              Sign up
                            </Typography>
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
    </>
  );
};

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
