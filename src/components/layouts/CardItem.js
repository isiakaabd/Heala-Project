import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PropTypes from "prop-types";
import { ArrowDownwardOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import { useTheme } from "@mui/material/styles";
import { roundUp } from "components/Utilities/Time";
const useStyles = makeStyles((theme) => ({
  grid: {
    "&.MuiGrid-item": {
      paddingLeft: "0",
    },
  },
}));
const CardItem = ({ value }) => {
  const theme = useTheme();
  const { name, value: val, id, percentageValue, icon } = value;
  const percent = roundUp(percentageValue);
  const classes = useStyles();

  return (
    <Card
      variant="outlined"
      width="100%"
      xs={3}
      sx={{
        padding: "22px 20px",
        borderRadius: "15px",
        borderColor: "transparent",
      }}
    >
      <Grid
        item
        container
        gap="1rem"
        flexWrap="nowrap"
        flexDirection={{ xs: "row", sm: "row", md: "row" }}
      >
        <Grid
          item
          sx={{
            minHeight: "5.4rem",
            // maxWidth: "5.4rem",
            maxWidth: "100%",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Grid>
        <Grid item>
          <Grid container flexDirection="column" spacing={1}>
            <Grid item>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#757886",
                }}
              >
                {name}
              </Typography>
            </Grid>
            <Grid item className={classes.grid}>
              <Grid
                container
                gap={1}
                alignItems="center"
                sx={{
                  padding: "3px 8px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    lineHeight: "24px",
                    letterSpacing: "-0.28px",

                    color: "#2D2F39",
                  }}
                >
                  {val}
                </Typography>

                {id < 3 && (
                  <Grid
                    item
                    sx={{
                      borderRadius: "100px",
                      color:
                        percentageValue < 1
                          ? "#ED3237"
                          : theme.palette.success.main,
                      backgroundColor:
                        percentageValue < 1
                          ? "rgba(237, 50, 55, 0.1)"
                          : "rgba(62, 165, 132, 0.1)",
                      padding: "3px 8px",
                    }}
                  >
                    <Grid container alignItems="center" justifyContent="center">
                      <Typography
                        variant="span"
                        sx={{ fontWeight: 500, fontSize: "1rem" }}
                      >
                        {percent}
                      </Typography>
                      {percentageValue < 1 ? (
                        <ArrowDownwardOutlined
                          sx={{ color: "inherit", fontSize: "1rem" }}
                        />
                      ) : (
                        <ArrowUpwardIcon
                          sx={{ color: "inherit", fontSize: "1rem" }}
                        />
                      )}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
CardItem.propTypes = {
  value: PropTypes.object,
};

export default CardItem;
