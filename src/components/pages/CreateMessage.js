import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    "&.MuiGrid-item": {
      borderRadius: "1rem",
      background: "#fff",
      padding: "2rem 4rem",
      maxWidth: "60rem !important",
    },
  },
  inputGrid: {
    flex: 1,
  },
  heading: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      //   fontSize: "1rem"
    },
  },
  formInput: {
    width: "100%",
    height: "100%",
    fontSize: "1.5rem",
    padding: ".5rem 1rem",
    border: "none",
    background: "transparent",
    color: theme.palette.common.grey,

    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    borderRadius: "0.5rem",
  },
  divider: {
    "&.MuiDivider-root": {
      borderColor: "rgba(0, 0, 0, 0.03)",
    },
  },
}));

const CreateMessage = () => {
  const classes = useStyles();
  const theme = useTheme();

  const redButton = {
    background: theme.palette.error.main,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };

  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/messages`} />
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: "3rem" }}>
            Create New Message
          </Typography>
        </Grid>
        <Grid item container direction="column" className={classes.gridWrapper}>
          <Grid item style={{ marginBottom: "3rem" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Recipient:{" "}
                </Typography>
              </Grid>
              <Grid item className={classes.inputGrid}>
                <input className={classes.formInput} />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item style={{ marginBottom: "3rem" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Subject:{" "}
                </Typography>
              </Grid>
              <Grid item className={classes.inputGrid}>
                <input className={classes.formInput} />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Message:{" "}
                </Typography>
              </Grid>
              <Grid item style={{ height: "15rem" }}>
                <textarea className={`${classes.formInput} ${classes.textArea}`} />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item style={{ alignSelf: "flex-end", marginTop: "2rem" }}>
            <CustomButton
              title="Send Message"
              type={redButton}
              endIcon={<ArrowForwardIosIcon style={{ fontSize: "1.5rem" }} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateMessage;
