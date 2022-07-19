import React, { useState, useEffect } from "react";
import { NoData } from "components/layouts";
import { Grid, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { CircularProgressBar, Loader, FormSelect } from "components/Utilities";
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

    // padding: "2rem 4rem",
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

const HcpEarnings = () => {
  const classes = useStyles();
  // const theme = useTheme();

  const { hcpId } = useParams();

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

  if (loading) return <Loader />;
  if (error) return <NoData error={error} />;
  return (
    <Grid
      container
      padding={{ md: "2rem 4rem", sm: "2rem, 4rem", xs: "1rem" }}
      className={classes.mainContainer}
      gap={3}
    >
      <Grid
        item
        flexWrap="nowrap"
        // flexDirection={{ md: "row", sm: "column", xs: "column" }}
        container
        className={classes.flexContainer}
      >
        <Grid item flex={1}>
          <Typography variant="h5" fontSize="clamp(2rem, 2vw, 3.3rem)">
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

      <Grid
        item
        container
        rowGap={4}
        flexDirection={{ md: "row", sm: "row", xs: "column" }}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
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
            <Grid item spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
              <Grid container alignItems="center" gap={{ md: 2, sm: 2, xs: 4 }}>
                <Grid
                  className={classes.iconWrapper}
                  sx={{ background: theme.palette.common.lightGreen }}
                >
                  <Grid item>
                    <TrendingDownIcon color="success" className={classes.cardIcon} />
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
                    {formatNumber(+x)}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.common.lightGrey,
                    }}
                  >
                    Total earnings
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* second */}
            <Grid item>
              <Grid container alignItems="center" gap={{ md: 2, sm: 2, xs: 4 }}>
                <Grid
                  className={classes.iconWrapper}
                  sx={{ background: theme.palette.common.lightRed }}
                >
                  <Grid item>
                    <TrendingUpIcon color="error" className={classes.cardIcon} />
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
                    {formatNumber(+totalPayouts)}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.common.lightGrey,
                      // fontSize: "clamp(2,3vw,2.275rem)",
                    }}
                  >
                    Total withdrawal
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* second */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HcpEarnings;
