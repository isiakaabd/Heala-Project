import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import LoginInput from "components/validation/LoginInput";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Grid, Checkbox, InputAdornment, Typography, Alert } from "@mui/material";
import { CustomButton } from "components/Utilities";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import people from "assets/images/login-page-photo.png";
import loginBackground from "assets/images/login-background.svg";
import logo from "assets/images/logo.svg";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useActions } from "components/hooks/useActions";
import { useSelector } from "react-redux";
import { Login_USER } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";
import { setAccessToken } from "../../accessToken";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    "&.MuiGrid-root": {
      minHeight: "100vh",
      display: "grid !important",
      gridTemplateColumns: "repeat(2,1fr)",
      "@media(max-width:600px)": {
        gridTemplateColumns: "1fr",
        "& >*:first-child": {
          display: "none !important",
        },
      },
    },
  },
  leftParentGrid: {
    "&.MuiGrid-root": {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${people}),
      linear-gradient(89.63deg, rgba(1, 2, 2, 0.49) 0.3%, rgba(1, 2, 2, 0) 99.66%)`,
      backgroundBlendMode: "darken",
    },
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  peopleBgImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundPosition: "25% 50%",
  },
  heading: {
    "&.MuiTypography-root": {
      fontSize: "clamp(3rem, 3vw, 4.8rem)",
      "@media(max-width:600px)": {
        textAlign: "center",
      },
    },
  },
  error: {
    "&.MuiAlert-root": {
      fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
    },
  },
  logoAlign: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: "min(28rem, 40vw)",
    position: "relative",
    textAlign: "center",
  },
  rightParentGrid: {
    backgroundImage: `url(${loginBackground})`,
    // padding: "5rem 8rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  link: {
    textDecoration: "none",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { authError } = useSelector((state) => state.auth);
  const theme = useTheme();
  const history = useHistory();
  const [loginInfo] = useMutation(Login_USER); //{ data, loading, error }
  const { loginUser, loginFailue } = useActions();
  // const { authError } = useSelector((state) => state.auth);
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
    email: Yup.string().email("Enter a valid email").trim().required("Email is required"),
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
          const { email, access_token, _id, userTypeId, dociId } = data.login.account;
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

  return (
    <>
      <Grid container className={classes.gridContainer}>
        <Grid item container className={classes.leftParentGrid}></Grid>
        <Grid container item className={classes.rightParentGrid} sx={{ justifyContent: "center" }}>
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
                    <Grid item container direction="column" justifyContent="center">
                      <Form>
                        <Grid item style={{ marginBottom: "3rem" }}>
                          <Typography variant="h2" className={classes.heading}>
                            Sign into your account
                          </Typography>
                        </Grid>
                        <Grid item style={{ marginBottom: "2rem" }}>
                          {Object.keys(authError).length > 0 && (
                            <Alert
                              variant="filled"
                              className={classes.error}
                              severity={authError.type}
                              sx={{ justifyContent: "center" }}
                            >
                              {authError.message}
                            </Alert>
                          )}
                        </Grid>
                        <Grid item style={{ marginBottom: "2rem", width: "100%" }}>
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
                              label="password"
                              name="password"
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              hasStartIcon={false}
                              endAdornment={
                                <InputAdornment
                                  position="end"
                                  onClick={() => setShowPassword((prev) => !prev)}
                                  style={{ cursor: "pointer" }}
                                >
                                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                sx={{ "& .MuiSvgIcon-root": { fontSize: "min(28, 5vw)" } }}
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
                        <Grid item container alignItems="center" style={{ marginTop: "2rem" }}>
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
