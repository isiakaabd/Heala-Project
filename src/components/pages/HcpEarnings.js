import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import FormSelect from "components/Utilities/FormSelect";
import circle from "assets/images/circle.png";
import PreviousButton from "components/Utilities/PreviousButton";

const useStyles = makeStyles((theme) => ({
  chartCard: {
    background: "#fff",
    borderRadius: "1rem",
  },
  overviewGrid: {
    padding: "4rem 2rem 3rem",
  },
  headerGrid: {
    background: "rgb(253, 253, 253)",
    width: "100%",
    borderTopLeftRadius: "1rem",
    borderTopRightRadius: "1rem",
    padding: "1.5rem 2rem",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2.5rem",
    },
  },
  greenIconBg: {
    background: theme.palette.common.lightGreen,
  },
  redIconBg: {
    background: theme.palette.common.lightRed,
  },
}));

const selectOptions = ["One day", "Five Days", "One Month", "Three Months", "One Year"];

const HcpEarnings = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { hcpId } = useParams();

  const {
    selectedMenu,
    setSelectedMenu,
    selectedSubMenu,
    setSelectedSubMenu,
    selectedHcpMenu,
    setSelectedHcpMenu,
  } = props;

  const [timeframeOption, setTimeframeOption] = useState("");

  useEffect(() => {
    setSelectedMenu(2);
    setSelectedSubMenu(3);
    setSelectedHcpMenu(4);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu, selectedHcpMenu]);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/hcps/${hcpId}`} onClick={() => setSelectedHcpMenu(0)} />
      </Grid>
      <Grid item className={classes.chartCard} style={{ marginBottom: "3em" }}>
        <Grid container direction="column">
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={classes.headerGrid}
            >
              <Grid item>
                <Typography variant="h5">Financial Stats</Typography>
              </Grid>
              <Grid item>
                <FormSelect
                  placeholderText="Select days"
                  options={selectOptions}
                  value={timeframeOption}
                  onChange={(event) => setTimeframeOption(event.target.value)}
                />
              </Grid>
            </Grid>
            <Divider color={theme.palette.common.lighterGrey} />
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={classes.overviewGrid}
            >
              <Grid item>
                <img src={circle} alt="A circle representing total earning and payout difference" />
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className={`${classes.iconWrapper} ${classes.greenIconBg}`}>
                    <TrendingDownIcon color="success" className={classes.icon} />
                  </Grid>
                  <Grid item style={{ marginLeft: "2rem" }}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h2">
                          <span
                            style={{
                              textDecoration: "line-through",
                              textDecorationStyle: "double",
                            }}
                          >
                            N
                          </span>
                          700,000
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total earnings
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item className={`${classes.iconWrapper} ${classes.redIconBg}`}>
                    <TrendingUpIcon color="error" className={classes.icon} />
                  </Grid>
                  <Grid item style={{ marginLeft: "2rem" }}>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h2">
                          <span
                            style={{
                              textDecoration: "line-through",
                              textDecorationStyle: "double",
                            }}
                          >
                            N
                          </span>
                          600,000
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ color: theme.palette.common.lightGrey }}
                        >
                          Total payouts
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

HcpEarnings.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  selectedHcpMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
  setSelectedHcpMenu: PropTypes.func.isRequired,
};

export default HcpEarnings;
