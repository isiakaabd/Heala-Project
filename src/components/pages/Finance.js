import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DateComponent from "components/Utilities/DateComponent";
import { CircularProgressBar } from "components/Utilities/CircularProgress";
import { Link } from "react-router-dom";
import Card from "components/Utilities/Card";

const Finance = ({ setSelectedSubMenu }) => {
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
      width: 60,
      height: 60,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cardGrid: {
      justifyContent: "center",
      alignItems: "center",
      height: "25.8rem",
    },
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
        fontSize: "3rem",
      },
    },
  }));

  const theme = useTheme();

  const classes = useStyles();

  return (
    <Stack position="static" className={classes.containerGrid} spacing={3}>
      <Grid container component="div" className={classes.mainContainer}>
        <Grid item sm container className={classes.flexContainer}>
          <Grid item>
            <Typography variant="h1" color=" #2D2F39">
              Earning
            </Typography>
          </Grid>
          <Grid item>
            <DateComponent label="Last 30 Days" />
          </Grid>
        </Grid>

        <Grid item container sx={{ padding: "3rem 4rem" }}>
          <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={4}>
              <CircularProgressBar value={90} color="error" />
            </Grid>
            <Grid
              item
              sm
              container
              columnSpacing={2}
              xs={3}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                className={classes.iconWrapper}
                sx={{ background: theme.palette.common.lightGreen }}
              >
                <Grid item>
                  <TrendingDownIcon color="success" className={classes.cardIcon} />
                </Grid>
              </Grid>
              <Grid item>
                <Typography noWrap variant="h1" component="div" color="#2D2F39">
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationStyle: "double",
                    }}
                  >
                    N{""}
                  </span>
                  700,000
                </Typography>
                <Typography variant="h6" color="#CCCCCC">
                  Total earning
                </Typography>
              </Grid>
            </Grid>
            {/* second */}
            <Grid
              item
              sm
              container
              columnSpacing={2}
              xs={3}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Grid
                className={classes.iconWrapper}
                sx={{ background: theme.palette.common.lightRed }}
              >
                <Grid item>
                  <TrendingUpIcon color="error" className={classes.cardIcon} />
                </Grid>
              </Grid>

              <Grid item>
                <Typography noWrap variant="h1" component="div" color="black">
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationStyle: "double",
                    }}
                  >
                    N{""}
                  </span>
                  700,000
                </Typography>
                <Typography variant="h6" color="#CCCCCC">
                  Total Withdrawal
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          component={Link}
          to="/finance/earnings"
          className={classes.parentGrid}
          style={{ marginRight: "5rem" }}
          onClick={() => setSelectedSubMenu(9)}
        >
          <Card title="Earnings Table" background={theme.palette.common.lightGreen}>
            <Grid className={classes.iconWrapper}>
              <TrendingDownIcon color="success" className={classes.cardIcon} />
            </Grid>
          </Card>
        </Grid>
        <Grid
          item
          component={Link}
          to="/finance/payouts"
          className={classes.parentGrid}
          style={{ marginRight: "5rem" }}
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

Finance.propTypes = {
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default Finance;
