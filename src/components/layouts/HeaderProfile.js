import React, { useState, useEffect } from "react";
import { Grid, Avatar, IconButton, Typography, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import displayPhoto from "assets/images/avatar.svg";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Notifications } from "components/layouts";
import { findAccounts, getNotifications } from "components/graphQL/useQuery";
import { useLazyQuery, useQuery } from "@apollo/client";

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
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("_id");
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAcc, setProfileAcc] = useState([]);
  const [num, setNum] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [profile, { data, loading }] = useLazyQuery(findAccounts, {
    variables: { email },
  });
  const { data: notData } = useQuery(getNotifications, {
    variables: { user: id },
  });
  useEffect(() => {
    setNum(notifications && notifications.length);

    // eslint-disable-next-line
  }, []);
  const classes = useStyles();
  const handleNotification = (event) => {
    setAnchorEl(event.currentTarget);
    setNum(0);
  };

  useEffect(() => {
    (async () => {
      profile();
      if (data && data.accounts.data) {
        setProfileAcc(data.accounts.data[0]);
      }
    })();
  }, [profile, email, data]);
  useEffect(() => {
    if (notData) {
      setNotifications(notData.getNotifications.data);
    }
  }, [notData]);

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }
  if (loading) return <p style={{ display: "hidden" }}>Loading</p>;

  return (
    <header style={{ flexShrink: "0" }}>
      <Grid container alignItems="center">
        <Grid item>
          <Avatar alt="Display avatar" src={displayPhoto} />
        </Grid>
        <Grid item style={{ marginRight: "3em", marginLeft: "1em" }}>
          <Grid container direction="column" justifyContent="center">
            <Grid item>
              <Typography variant="body1" className={classes.name}>
                {profileAcc && profileAcc.role}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" className={classes.role} style={{ fontWeight: 300 }}>
                {profileAcc && profileAcc.email}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton
            aria-label={notificationsLabel(num)}
            onClick={(event) => handleNotification(event)}
          >
            <Badge badgeContent={num} color="error">
              <NotificationsActiveIcon color="primary" fontSize="large" />
            </Badge>
          </IconButton>
          <Notifications
            anchorEl={anchorEl}
            Notifications={notifications}
            setNotifications={setNotifications}
            setAnchorEl={setAnchorEl}
          />
        </Grid>
      </Grid>
    </header>
  );
};
HeaderProfile.propTypes = {
  data: PropTypes.object,
};

export default HeaderProfile;
