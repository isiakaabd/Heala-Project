import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
// import { useTheme } from "@mui/material/styles";
import displayPhoto from "assets/images/avatar.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Notifications from "../layouts/Notifications";
import IconButton from "@mui/material/IconButton";
// import { useSelector } from "react-redux";
// import { UserProfile } from "components/graphQL/useQuery";

const useStyles = makeStyles((theme) => ({
  role: {
    fontSize: "1.5rem",
    color: theme.palette.common.lightGrey,
  },

  name: {
    fontWeight: "normal",
  },
  notification: {
    fontSize: "2rem",
  },
}));

const HeaderProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);

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
  // const { id } = useSelector((state) => state.auth);

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
                {/* {loading ? "Admin" : error ? "Admin" : email} */} email
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.role} style={{ fontWeight: 300 }}>
                {/* {loading ? "Admin" : error ? "Admin" : email} */} email
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            aria-label={notificationsLabel(1)}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <Badge badgeContent={1} color="error">
              <NotificationsActiveIcon color="primary" fontSize="large" />
            </Badge>
          </IconButton>
          <Notifications anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Grid>
      </Grid>
    </header>
  );
};
HeaderProfile.propTypes = {
  data: PropTypes.object,
};

export default HeaderProfile;
