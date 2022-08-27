import React, { useState, useEffect } from "react";
import { Grid, Avatar, IconButton, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import displayPhoto from "assets/images/avatar.svg";
import { Notifications } from "components/layouts";
import { findAccounts, getNotifications } from "components/graphQL/useQuery";
import { useLazyQuery, useQuery } from "@apollo/client";
import BellIcon from "components/Icons/BellIcon";

const useStyles = makeStyles((theme) => ({
  role: {
    fontSize: "clamp(1rem, 1vw, 1.5rem)",
    color: theme.palette.common.lightGrey,
  },

  name: {
    fontWeight: "normal",
    fontSize: "clamp(1.6rem, 2vw, 1.2rem)",
  },

  notification: {
    fontSize: "clamp(2rem, 2vw, 1.2rem)",
  },
  HeaderProfile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  head: {
    "@media(max-width:600px)": {
      "&.MuiGrid-root": {
        display: "none",
      },
    },
  },
}));

const HeaderProfile = () => {
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("_id");
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setProfileAcc] = useState([]);
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
    <header className={classes.HeaderProfile}>
      <Grid
        container
        alignItems="center"
        gap="3px"
        justifyContent="space-between"
        flexWrap="nowrap"
        className={classes.head}
        spacing={1}
      >
        <Grid item>
          <IconButton
            aria-label={notificationsLabel(num)}
            onClick={(event) => handleNotification(event)}
            sx={{
              borderRadius: "100%",
              backgroundColor: "#F8F8F8",
              padding: "1rem",
            }}
          >
            <Badge>
              <BellIcon sx={{ color: "transparent", fontSize: "20px" }} />
            </Badge>
          </IconButton>
          <Notifications
            anchorEl={anchorEl}
            Notifications={notifications}
            setNotifications={setNotifications}
            setAnchorEl={setAnchorEl}
          />
        </Grid>
        <Grid item>
          <Avatar alt="Display avatar" src={displayPhoto} />
        </Grid>
      </Grid>
    </header>
  );
};
HeaderProfile.propTypes = {
  data: PropTypes.object,
};

export default HeaderProfile;
