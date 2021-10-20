import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import CustomButton from "components/Utilities/CustomButton";
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import people from "assets/images/login-page-photo.png";
import loginBackground from "assets/images/login-background.svg";
import logo from "assets/images/logo-white.png";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Search from "components/Utilities/Search";
import useFormInput from "components/hooks/useFormInput";
import { useActions } from "components/hooks/useActions";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    minHeight: "100vh",
  },
  peopleImgWrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  overlay: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(89.63deg, rgba(1, 2, 2, 0.49) 0.3%, rgba(1, 2, 2, 0) 99.66%)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  peopleBgImage: {
    width: "100%",
    height: "100%",
    background: `url(${people}) no-repeat`,
    overflow: "hidden",
    backgroundPosition: "25% 50%",
  },

  logo: {
    position: "absolute",
    top: "10%",
    left: "30%",
  },
  rightParentGrid: {
    width: "100%",
    minHeight: "100%",
    background: `url(${loginBackground}) no-repeat`,
    backgroundPosition: "center",
    padding: "5rem 15rem",
  },
  link: {
    textDecoration: "none",
  },
}));

const Login = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { loginUser } = useActions();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const buttonColors = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  const [showPassword, setShowPassword] = useState(false);
  //   const [emailHelper, setEmailHelper] = useState("");
  const [formInput, handleFormInput] = useFormInput({
    email: "",
    password: "",
  });

  const { email, password } = formInput;

  //   const validateInput = (event) => {
  //     let valid;

  //     switch (event.target.name) {
  //       case "email":
  //         valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  //         if (!valid) {
  //           setEmailHelper("Invalid email");
  //         } else {
  //           setEmailHelper("");
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   };

  const handleLogin = () => {
    loginUser();
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid container className={classes.gridContainer}>
      <Grid item lg={5} className={classes.leftParentGrid}>
        <Grid item container direction="column" className={classes.peopleImgWrapper}>
          <Grid item className={classes.overlay}></Grid>
          <Grid item className={classes.peopleBgImage}></Grid>
          <Grid item>
            <img src={logo} alt="Brand logo" className={classes.logo} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={7} className={classes.rightParentGrid}>
        <Grid container direction="column" justifyContent="center">
          <Grid item style={{ marginBottom: "3rem" }}>
            <Typography variant="h2" style={{ fontSize: "5rem" }}>
              Sign into your account
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: "2rem" }}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  Email address
                </Typography>
              </Grid>
              <Grid item>
                <Search
                  id="email"
                  value={email}
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleFormInput}
                  //   helperText={emailHelper}
                  hasStartIcon={false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginBottom: "2rem" }}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  Password
                </Typography>
              </Grid>
              <Grid item>
                <Search
                  id="password"
                  value={password}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleFormInput}
                  name="password"
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
          </Grid>
          <Grid item style={{ marginBottom: "5rem" }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Checkbox {...label} defaultChecked color="success" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">Remember me</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  color="error"
                  component={Link}
                  to="forgot-password"
                  className={classes.link}
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
              onClick={handleLogin}
            />
          </Grid>
          <Grid item container alignItems="center" style={{ marginTop: "2rem" }}>
            <Grid item>
              <Typography variant="body2" style={{ color: theme.palette.common.grey }} paddingRight>
                Dont have an account?{" "}
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
