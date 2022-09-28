import React, { useState, useEffect } from "react";
import { NoData } from "components/layouts";
import { Loader, CircularProgressBar, Card } from "components/Utilities";
import { Grid, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  getFinanceStats,
  getProviders,
  getFinanceStat,
} from "components/graphQL/useQuery";
import {
  financialPercent,
  finance,
  formatNumber,
} from "components/Utilities/Time";
import { CustomSelect } from "components/validation/Select";

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
    width: "100%",
    background: "white",
    borderRadius: "2rem",
    boxShadow: "-1px 11px 30px 0px #e0e0e03b",
  },
  parentGrid: {
    textDecoration: "none",
    color: theme.palette.primary.main,

    "& > .MuiGrid-root.MuiGrid-container": {
      backgroundColor: "#ffffff",
    },
  },

  cardIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
    },
  },
}));
const Finance = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [range, setRange] = useState("7");
  const [totalIncome, setTotalIncome] = useState(0);
  const [provider, setProvider] = useState("");
  const [form, setForm] = useState("");
  const [dropDown, setDropDown] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const financialValue = financialPercent(totalIncome, totalExpenditure);
  const [finances, setFinances] = useState(financialValue);
  const [fetchFinanceStats, { error, loading, data: dat }] =
    useLazyQuery(getFinanceStats);
  const [fetchFinanceStat, { error: err, loading: load, data }] =
    useLazyQuery(getFinanceStat);
  const { data: da } = useQuery(getProviders);
  useEffect(() => {
    const x = {
      key: "All Stats",
      value: "",
    };
    if (da) {
      const data = da.getProviders.provider;
      const options = data?.map((i) => {
        return {
          key: i.name,
          value: i._id,
        };
      });
      setDropDown([x, ...options]);
    }
  }, [da]);
  const onChange = async (e) => {
    setProvider(e.target.value);
    setForm(e.target.value);
  };
  useEffect(() => {
    if (provider === "") {
      fetchFinanceStats({ variables: { q: range } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, provider, fetchFinanceStats]);
  useEffect(() => {
    if (dat) {
      const { subscriptionIncome, totalPayout } = dat.getEarningStats;
      setTotalIncome(subscriptionIncome);
      setTotalExpenditure(totalPayout);
      const value = financialPercent(subscriptionIncome, totalPayout);
      setFinances(value);
    }
  }, [dat, provider]);
  useEffect(() => {
    if (provider !== "" && range !== "") {
      fetchFinanceStat({ variables: { q: range, providerId: provider } });
    }
    //eslint-disable-next-line
  }, [range, provider]);
  useEffect(() => {
    if (data) {
      const { subscriptionIncome, totalPayout } = data?.getEarningStats;
      setTotalIncome(subscriptionIncome);
      setTotalExpenditure(totalPayout);
      const value = financialPercent(subscriptionIncome, totalPayout);
      setFinances(value);
    }
  }, [data]);

  if (loading || load) return <Loader />;
  if (error || err) return <NoData error={error} />;

  return (
    <Grid container gap={3}>
      <Grid
        item
        container
        rowGap={4}
        padding={{ md: "2rem 4rem", sm: "2rem, 4rem", xs: "1rem" }}
        className={classes.mainContainer}
        flexDirection={{ md: "row", sm: "row", xs: "column" }}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Grid
          item
          container
          alignItems="center"
          className={classes.flexContainer}
          flexWrap="nowrap"
        >
          <Grid item flex={1}>
            <Typography variant="h1" color="#2D2F39">
              Earning
            </Typography>
          </Grid>
          <Grid item sx={{ mb: 2 }}>
            <Grid container gap={2}>
              <Grid item>
                <CustomSelect
                  value={form}
                  onChange={onChange}
                  options={dropDown}
                  name="availability-dropdown"
                />
              </Grid>
              <Grid item>
                <CustomSelect
                  placeholder="Select days"
                  value={range}
                  onChange={(e) => setRange(e?.target?.value)}
                  options={finance}
                  name="finance"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          flexDirection={{ md: "row", sm: "row", xs: "column" }}
          spacing={{ md: 2, xs: 2, sm: 2 }}
        >
          <Grid item>
            <CircularProgressBar
              height="17rem"
              width="17rem"
              color={theme.palette.common.green}
              trailColor={theme.palette.common.red}
              value={finances}
              strokeWidth={8}
            />
          </Grid>
          <Grid item flex={1}>
            <Grid
              container
              alignItems="center"
              rowGap={4}
              justifyContent={{
                md: "space-around",
                xs: "flex-start",
                sm: "space-around",
              }}
            >
              <Grid
                item
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid
                  container
                  alignItems="center"
                  gap={{ md: 2, sm: 2, xs: 4 }}
                >
                  <Grid
                    className={classes.iconWrapper}
                    sx={{ background: theme.palette.common.lightGreen }}
                  >
                    <Grid item>
                      <TrendingDownIcon
                        color="success"
                        className={classes.cardIcon}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography noWrap variant="h2">
                      <span
                        style={{
                          textDecoration: "line-through",
                          textDecorationStyle: "double",
                        }}
                      >
                        N{""}
                      </span>
                      {formatNumber(totalIncome)}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.common.lightGrey,
                      }}
                    >
                      Subscription Earnings
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* second */}
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  gap={{ md: 2, sm: 2, xs: 4 }}
                >
                  <Grid
                    className={classes.iconWrapper}
                    sx={{ background: theme.palette.common.lightRed }}
                  >
                    <Grid item>
                      <TrendingUpIcon
                        color="error"
                        className={classes.cardIcon}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography noWrap variant="h2">
                      <span
                        style={{
                          textDecoration: "line-through",
                          textDecorationStyle: "double",
                        }}
                      >
                        N
                      </span>
                      {formatNumber(+totalExpenditure)}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.common.lightGrey,
                      }}
                    >
                      Total Payouts
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* second */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* iterms */}
      <Grid item container spacing={2} justifyContent="space-between">
        {/* 1 */}
        <Grid item container md={4} sm={4} xs={12}>
          <Grid
            item
            container
            flexDirection="column"
            component={Link}
            to="/finance/payouts"
            className={classes.parentGrid}
          >
            <Card
              title="Doctor Payout"
              background={theme.palette.common.lightGreen}
            >
              <TrendingUpIcon color="error" className={classes.cardIcon} />
            </Card>
          </Grid>
        </Grid>
        {/* 2 */}
        <Grid item container md={4} sm={4} xs={12}>
          <Grid
            item
            container
            flexDirection="column"
            component={Link}
            to="/finance/earnings"
            className={classes.parentGrid}
          >
            <Card
              title="Doctor Earnings"
              background={theme.palette.common.lightGreen}
            >
              <Grid className={classes.iconWrapper}>
                <TrendingDownIcon
                  color="success"
                  className={classes.cardIcon}
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>
        {/* 3 */}
        <Grid item container md={4} sm={4} xs={12}>
          <Grid
            item
            container
            flexDirection="column"
            component={Link}
            to="/finance/sub-income"
            className={classes.parentGrid}
          >
            <Card
              title="Subscription Income"
              background={theme.palette.common.lightGreen}
            >
              <Grid className={classes.iconWrapper}>
                <TrendingDownIcon
                  color="success"
                  className={classes.cardIcon}
                />
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Finance.propTypes = {
  /* setSelectedSubMenu: PropTypes.func, */
};

export default Finance;
