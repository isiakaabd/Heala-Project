import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NoData } from "components/layouts";
import { Grid, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { CircularProgressBar, Loader, PreviousButton, FormSelect } from "components/Utilities";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getEarningStats, getMyEarningDoc } from "components/graphQL/useQuery";
import { financialPercent, selectOptions, formatNumber } from "components/Utilities/Time";

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
// const selectOptions = ["One day", "Five Days", "One Month", "Three Months", "One Year"];

const HcpEarnings = (props) => {
  const classes = useStyles();
  // const theme = useTheme();

  const { hcpId } = useParams();

  const {
    selectedMenu,
    setSelectedMenu,
    /*  selectedSubMenu,
    setSelectedSubMenu,
    selectedHcpMenu,
    setSelectedHcpMenu, */
  } = props;

  const [form, setForm] = useState("");
  const { data, error, loading, refetch } = useQuery(getEarningStats, {
    variables: { q: "365" },
  });
  const { data: datas } = useQuery(getMyEarningDoc, {
    variables: { doc: hcpId },
  });

  // console.log(datas.getMyEarnings.data[0].balance, "kkk");
  const [x, setX] = useState(0);

  const [totalEarning, setTotalEarning] = useState([]);
  const [totalPayouts, setTotalPayouts] = useState([]);
  const financialValue = financialPercent(totalEarning, totalPayouts);
  const [finances, setFinances] = useState(financialValue);
  const onChange = async (e) => {
    setForm(e.target.value);
    await refetch({ q: e.target.value });
  };

  const theme = useTheme();
  useEffect(() => {
    if (datas !== undefined) {
      if (datas.getMyEarnings.length > 0) {
        setX(datas?.getMyEarnings?.data[0]?.balance);
      }
    }

    if (data) {
      const { totalEarnings, totalPayout } = data.getEarningStats;

      setTotalEarning(totalEarnings);
      setTotalPayouts(totalPayout);
      const value = financialPercent(totalEarnings, totalPayout);
      setFinances(value);
    }
  }, [form, data, datas]);
  // const classes = useStyles();

  useEffect(() => {
    setSelectedMenu(2);
    /* setSelectedSubMenu(3);
    setSelectedHcpMenu(4); */

    // eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu, selectedHcpMenu */]);

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/hcps/${hcpId}`} /* onClick={() => setSelectedHcpMenu(0)} */ />
      </Grid>
      <Grid container component="div" className={classes.mainContainer}>
        <Grid item sm container className={classes.flexContainer}>
          <Grid item>
            <Typography variant="h5" style={{ fontSize: "3.3rem" }}>
              Earnings
            </Typography>
          </Grid>
          <Grid item>
            <FormSelect
              placeholder="Select days"
              value={form}
              onChange={onChange}
              options={selectOptions}
              name="finance"
            />
          </Grid>
        </Grid>

        <Grid item container sx={{ padding: "3rem 4rem" }}>
          <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={4}>
              <CircularProgressBar
                height="17rem"
                width="17rem"
                color={theme.palette.common.green}
                trailColor={theme.palette.common.red}
                value={finances}
                strokeWidth={8}
              />
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
                <Typography noWrap variant="h2" style={{ fontSize: "3.9rem" }}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationStyle: "double",
                    }}
                  >
                    N{""}
                  </span>
                  {formatNumber(+x)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: theme.palette.common.lightGrey,
                    fontSize: "2.275rem",
                  }}
                >
                  Total earnings
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
                <Typography noWrap variant="h2" style={{ fontSize: "3.9rem" }}>
                  <span
                    style={{
                      textDecoration: "line-through",
                      textDecorationStyle: "double",
                    }}
                  >
                    N{""}
                  </span>
                  {formatNumber(totalPayouts)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    color: theme.palette.common.lightGrey,
                    fontSize: "2.275rem",
                  }}
                >
                  Total withdrawal
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

HcpEarnings.propTypes = {
  selectedMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* selectedSubMenu: PropTypes.number,
  selectedHcpMenu: PropTypes.number,
  setSelectedSubMenu: PropTypes.func,
  setSelectedHcpMenu: PropTypes.func, */
};

export default HcpEarnings;
