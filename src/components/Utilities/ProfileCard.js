import React from "react";
import { Typography, Grid, Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    background: "#fff",
    borderRadius: "1rem",
    // padding: "4rem 5rem",
    height: "16.1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
  link: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    color: theme.palette.common.green,
    // border: `1px solid ${theme.palette.common.lightGrey}`,
    padding: ".75rem",
    borderRadius: "1.5rem",
    textDecoration: "none",
  },
  infoBadge: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      borderRadius: "1.5rem",
      color: theme.palette.common.green,
    },
  },
}));
const ProfileCard = ({ value, text, type }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      rowGap={{ md: 4, sm: 3, xs: 3 }}
      alignItems="center"
      className={classes.cardGrid}
    >
      <Grid item>
        <Typography variant="h4">{text}</Typography>
      </Grid>

      {type === "alergy"
        ? value?.map((i, key) => (
            <a
              rel="noreferrer"
              key={i._id}
              className={classes.link}
              href={i.url}
              target="_blank"
            ></a>
          ))
        : null}
      <Grid item>
        {Array.isArray(value) ? (
          value.map((i, key) => (
            <Chip variant="outlined" key={key} label={i} className={classes.infoBadge} />
          ))
        ) : (
          <Chip variant="outlined" label={value} className={classes.infoBadge} />
        )}
      </Grid>
    </Grid>
  );
};

ProfileCard.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
};
export default ProfileCard;
