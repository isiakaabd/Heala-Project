import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    padding: "4rem 3rem",
    borderBottom: `1px solid ${theme.palette.info.light}`,

    "&:hover": {
      background: "#eee",
      cursor: "pointer",
    },

    "&:active": {
      background: theme.palette.info.light,
    },
  },
  chatText: {
    "&.MuiTypography-root": {
      fontWeight: 400,
      color: theme.palette.info.dark,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "25ch",
    },
  },
  redDot: {
    width: 15,
    height: 15,
    border: `6px solid ${theme.palette.common.red}`,
    borderRadius: "50%",
  },
}));
const ChatItem = ({ chatList: { name, photo, message, time } }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className={classes.parentGrid}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Grid item style={{ marginRight: "1rem" }}>
            <Avatar
              src={photo}
              alt={`A display photo of ${name}`}
              style={{ width: 50, height: 50 }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h4" gutterBottom>
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.chatText}>
                  {message}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography
              variant="body2"
              style={{ fontWeight: 400, color: theme.palette.common.green }}
              gutterBottom
            >
              {time}
            </Typography>
          </Grid>
          <Grid item alignSelf="flex-end">
            <div className={classes.redDot} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ChatItem.propTypes = {
  chatList: PropTypes.object.isRequired,
};

export default ChatItem;
