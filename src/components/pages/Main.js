import React from "react";
import PropTypes from "prop-types";
import { Avatar, Grid, Typography } from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DateComponent from "components/Utilities/Card";
import Card from "components/Utilities/DateComponent";
import { CircularProgressBar } from "components/Utilities/CircularProgress";
import { Link } from "react-router-dom";
// import { ReactComponent as Financearrowdown } from "assets/images/financearrowdown.svg";

// const MainFinanceTab = () => {
const useStyles = makeStyles((theme) => ({
  cardContainer: {
    "&.MuiCard-root": {
      width: "100%",
      height: "15.8rem",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      background: "white",
      marginRight: "5rem",
      "&:hover": {
        boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
        cursor: "pointer",
      },
      "&:active": {
        background: "#fafafa",
      },
      "& .MuiCardContent-root .MuiTypography-h5": {
        textDecoration: "none !important",
        textTransform: "uppercase",
      },
    },
  },

  iconWrapper: {
    ...theme.typography.cardIconWrapper,
  },
  cardGrid: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    marginRight: "5rem",
    "&:hover": {
      boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
      transform: "translateX(2px)",
      cursor: "pointer",
    },
    "&:active": {
      background: "#fafafa",
    },
    "& .MuiCardContent-root .MuiTypography-h5": {
      textDecoration: "none !important",
      textTransform: "uppercase",
    },
  },
  // cardGrid: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   height: "25.8rem",
  // },
  flexContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    margin: "auto",
    width: "100%",

    padding: "2rem 4rem",
    "&:first-child": {
      borderBottom: ".5px solid #F8F8F8",
    },
  },
  lightGreen: {
    color: theme.palette.common.green,
  },

  lightRed: {
    color: theme.palette.common.red,
  },
  mainContainer: {
    flexDirection: "column",
    width: "100%",
    background: "white",
    borderRadius: "2rem",
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
  },

  parentGrid: {
    textDecoration: "none",
    width: "24.7rem",
    color: theme.palette.primary.main,
    "&.MuiGrid-item": {
      ...theme.typography.cardParentGrid,
      minWidth: "20rem",

      "&:hover": {
        background: "#fcfcfc",
      },

      "&:active": {
        background: "#fafafa",
      },
    },
  },

  cardIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
}));

const MainFinanceTab = ({ setSelectedSubMenu }) => {
  const theme = useTheme();

  const classes = useStyles();
  return (
    <Stack position="static" className={classes.containerGrid} spacing={2}>
      <Grid container component="div" className={classes.mainContainer}>
        <Grid item sm container className={classes.flexContainer}>
          <Grid item>
            <Typography variant="h1"> Earning</Typography>
          </Grid>
          <Grid item>
            <DateComponent label="Last 30 Days" />
          </Grid>
        </Grid>

        <Grid item container sx={{ padding: "3rem 4rem" }}>
          <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={4}>
              <CircularProgressBar sx={{ color: "green" }} />
            </Grid>
            <Grid
              item
              sm
              container
              spacing={4}
              xs={3}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                item
                // className={`${classes.iconWrapper} ${classes.lightGreen}`}
                // style={{ background: "yellow" }}
              >
                {/* <Financearrowdown  /> */}
                <Avatar sx={{ background: theme.palette.common.lightGreen }}>
                  <MovingIcon sx={{ color: "green" }} />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography noWrap variant="h1" component="div">
                  N700,000
                </Typography>
                <Typography variant="h6" color="secondary">
                  Total earning
                </Typography>
              </Grid>
            </Grid>
            {/* second */}
            <Grid
              item
              sm
              container
              spacing={4}
              xs={3}
              sx={{ justifyContent: "flex-end", alignItems: "center" }}
            >
              <Grid item>
                <Avatar sx={{ background: theme.palette.common.lightRed }}>
                  <MovingIcon sx={{ color: theme.palette.common.red }} />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography noWrap variant="h1" component="div">
                  N700,000
                </Typography>
                <Typography variant="h6" color="secondary">
                  Total Withdrawal
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "5rem" }}>
        <Grid
          item
          component={Link}
          to="/finance/earnings"
          className={classes.parentGrid}
          style={{ marginRight: "5rem" }}
          onClick={() => setSelectedSubMenu(9)}
        >
          <Card title="Earnings Table" background={theme.palette.common.lightGreen}>
            <TrendingDownIcon color="success" className={classes.cardIcon} />
          </Card>
        </Grid>
        <Grid
          item
          component={Link}
          to="/finance/payouts"
          className={classes.parentGrid}
          style={{ marginLeft: "5rem" }}
          onClick={() => setSelectedSubMenu(9)}
        >
          <Card title="Payouts Table" background={theme.palette.common.lightRed}>
            <TrendingUpIcon color="error" className={classes.cardIcon} />
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

MainFinanceTab.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default MainFinanceTab;
