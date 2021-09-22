import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { makeStyles } from "@mui/styles";
// import { useTheme } from "@mui/material/styles";
import displayPhoto from "assets/images/avatar.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles((theme) => ({
  role: {
    fontSize: "1.5rem",
    color: theme.palette.common.lightGrey,
  },

  name: {
    fontSize: "1.2rem",
    fontWeight: "normal",
  },
  notification: {
    fontSize: "2rem",
  },
}));

const HeaderProfile = () => {
  const classes = useStyles();

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <header>
      <Grid container alignItems="center">
        <Grid item>
          <Avatar alt="Display avatar" src={displayPhoto} />
        </Grid>
        <Grid item style={{ marginRight: "3em", marginLeft: "1em" }}>
          <Grid container direction="column" justifyContent="center">
            <Grid item>
              <Typography variant="body1" className={classes.name}>
                Emmanuel Chuckwu
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.role}>
                Admin
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton aria-label={notificationsLabel(1)}>
            <Badge badgeContent={1} color="error">
              <NotificationsActiveIcon color="primary" fontSize="large" />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
    </header>
  );
};

export default HeaderProfile;
