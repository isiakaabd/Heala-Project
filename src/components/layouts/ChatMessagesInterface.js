import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MicIcon from "@mui/icons-material/Mic";
import { makeStyles } from "@mui/styles";
import ChatInterfaceHeading from "components/layouts/ChatInterfaceHeading";
import SendIcon from "@mui/icons-material/Send";
import Search from "components/Utilities/Search";

const useStyles = makeStyles((theme) => ({
  timelineGrid: {
    padding: "5rem 2rem",
    paddingTop: "15rem",
  },

  messagesBox: {
    paddingBottom: "10rem",
  },

  badge: {
    "&.MuiChip-root": {
      fontSize: "1.6rem",
      background: "#fff",
      color: theme.palette.common.grey,
      fontWeight: 400,
    },
  },
  chatMessage: {
    width: "50rem",
    background: "#fff",
    padding: "3rem 2rem",
    borderTopRightRadius: "3rem",
    borderBottomLeftRadius: "3rem",
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",

    "& > .MuiTypography-root": {
      fontWeight: 400,
    },
  },
  purpleChatBox: {
    background: "#0f0627",

    "& > .MuiTypography-root": {
      color: "#fff",
      fontWeight: 300,
    },
  },
  searchInput: {
    "&.MuiOutlinedInput-root": {
      background: "rgb(239, 239, 239)",
      borderRadius: "20rem",
    },
  },

  iconButton: {
    "&.MuiIconButton-root": {
      background: theme.palette.common.green,

      "&:hover": {
        background: theme.palette.success.light,
      },

      "&:active": {
        background: theme.palette.success.dark,
      },
    },
  },

  chatIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "3rem",
      color: "#fff",
    },
  },
  chatFieldParent: {
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "0 1rem 2rem 52.6rem",
    background: "#fff",
  },
}));

const ChatMessagesInterface = ({ setChatMediaActive }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item container className={classes.chatHeadingParent}>
        <ChatInterfaceHeading setChatMediaActive={setChatMediaActive} />
      </Grid>
      <Grid item className={classes.messagesBox}>
        <Grid container direction="column">
          <Grid item className={classes.timelineGrid}>
            <Grid container alignItems="center">
              <Grid item flex={1}>
                <Divider />
              </Grid>
              <Grid item>
                <Chip variant="contained" label="Sunday, April 25 2021" className={classes.badge} />
              </Grid>
              <Grid item flex={1}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container justifyContent="flex-end" style={{ padding: "0 5rem 3rem" }}>
            <Grid item className={classes.chatMessage}>
              <Typography variant="body1">
                Social money transfers for millenial. Send and receive money with your abeg tag.
                Social money transfers for millenial. Send and receive money with your abeg tag
              </Typography>
            </Grid>
          </Grid>
          <Grid item container style={{ padding: "0 5rem 3rem" }}>
            <Grid item className={`${classes.chatMessage} ${classes.purpleChatBox}`}>
              <Typography variant="body1">
                Social money transfers for millenial. Send and receive money with your abeg tag.
                Social money transfers for millenial. Send and receive money with your abeg tag
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent="flex-end" style={{ padding: "0 5rem 3rem" }}>
            <Grid item className={classes.chatMessage}>
              <Typography variant="body1">
                Social money transfers for millenial. Send and receive money with your abeg tag.
                Social money transfers for millenial. Send and receive money with your abeg tag
              </Typography>
            </Grid>
          </Grid>
          <Grid item container style={{ padding: "0 5rem 3rem" }}>
            <Grid item className={`${classes.chatMessage} ${classes.purpleChatBox}`}>
              <Typography variant="body1">Thank you. Goodnight...</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container alignItems="center" spacing={2} className={classes.chatFieldParent}>
        <Grid item>
          <IconButton className={classes.iconButton}>
            <AddIcon className={classes.chatIcon} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.iconButton}>
            <CameraAltIcon className={classes.chatIcon} />
          </IconButton>
        </Grid>
        <Grid item flex={1}>
          <Search
            className={classes.searchInput}
            hasStartIcon={false}
            endAdornment={
              <InputAdornment position="end">
                <SendIcon style={{ fontSize: "3rem", color: "#0f0627" }} />
              </InputAdornment>
            }
            placeholder="Send a message"
          />
        </Grid>
        <Grid item>
          <IconButton className={classes.iconButton}>
            <MicIcon className={classes.chatIcon} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

ChatMessagesInterface.propTypes = {
  setChatMediaActive: PropTypes.func.isRequired,
};

export default ChatMessagesInterface;
