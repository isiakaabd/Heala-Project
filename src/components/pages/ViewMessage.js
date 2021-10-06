import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.png";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
  gridWrapper: {
    padding: "3rem 5rem",
  },
  badge: {
    "&.MuiChip-root": {
      border: `1px solid ${theme.palette.common.lighterGrey} !important`,
    },
    "& .MuiChip-label": {
      fontSize: "1.25rem",
      color: theme.palette.common.green,
    },
  },
}));

const ViewMessage = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.parentGrid}>
      <Grid item className={classes.gridWrapper}>
        <Typography variant="h3">Appreciate message to DOCi team</Typography>
      </Grid>
      <Divider />
      <Grid item style={{ padding: "1.5rem 5rem" }}>
        <Grid container alignItems="center">
          <Grid item>
            <Avatar src={displayPhoto} alt="Display photo of the sender" />
          </Grid>
          <Grid item style={{ margin: "0 3rem 0 1.5rem" }}>
            <Typography variant="h5">Alison Igbenedion</Typography>
          </Grid>
          <Grid item>
            <Chip variant="outlined" label="alisonigbenedion@gmail.com" className={classes.badge} />
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid item className={classes.gridWrapper}>
        <Typography variant="body1" style={{ lineHeight: 1.85 }}>
          I want to use this medium to thank DOCi team for their relentless services to the world
          and their provision of quality healthcare service. I want to use this medium to thank DOCi
          team for their relentless services to the world and their provision of quality healthcare
          service. I want to use this medium to thank DOCi team for their relentless services to the
          world and their provision of quality healthcare service. I want to use this medium to
          thank DOCi team for their relentless services to the world and their provision of quality
          healthcare service. I want to use this medium to thank DOCi team for their relentless
          services to the world and their provision of quality healthcare service.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ViewMessage;
