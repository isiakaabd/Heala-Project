import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Search from "components/Utilities/Search";
import ChatItem from "components/layouts/ChatItem";
import ChatMessagesInterface from "components/layouts/ChatMessagesInterface";
import photo1 from "assets/images/photo1.png";
import photo2 from "assets/images/photo2.png";
import photo3 from "assets/images/photo3.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const useStyles = makeStyles((theme) => ({
  parentGridContainer: {
    height: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  leftParentGrid: {
    borderRight: `1px solid ${theme.palette.common.lightGrey}`,
    padding: "2rem 0 0",
    position: "fixed",
    zIndex: 3,
    background: "#fff",
    width: "51.6rem",
    height: "100%",
    overflow: "hidden",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: ".85rem",
    },

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1rem rgba(0, 0, 0, 0.2)",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: ".5rem",
      background: theme.palette.common.lightGrey,

      "&:active": {
        background: "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  rightParentGrid: {
    height: "100%",
    width: "100%",
    background: "rgb(245, 245, 245)",
    paddingLeft: "51.6rem",
    overflow: "hidden",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "1rem",
    },

    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 1rem rgba(0, 0, 0, 0.2)",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: ".5rem",
      background: theme.palette.common.lightGrey,

      "&:active": {
        background: "rgba(0, 0, 0, 0.2)",
      },
    },
  },
  contactIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "8rem",
      color: theme.palette.common.lightGrey,
    },
  },
  searchInput: {
    "&.MuiOutlinedInput-root": {
      background: "rgb(239, 239, 239)",
      borderRadius: "20rem",
    },
  },
}));

const Chat = ({ chatMediaActive, setChatMediaActive }) => {
  const chatLists = [
    {
      id: 0,
      name: "Dr. Halima",
      photo: photo1,
      time: "12:36 AM",
      message: "Hello, we have reviewed your records",
    },
    {
      id: 1,
      name: "Dr. Charles Agbor",
      photo: photo2,
      time: "12:36 AM",
      message: "Hello, we have reviewed your records",
    },
    {
      id: 2,
      name: "Dr. Philip Igbinedion",
      photo: photo3,
      time: "12:45 PM",
      message: "Hello, we have reviewed your records",
    },
    {
      id: 3,
      name: "Dr. Philip Igbinedion",
      photo: photo3,
      time: "12:45 PM",
      message: "Hello, we have reviewed your records",
    },
    {
      id: 4,
      name: "Dr. Philip Igbinedion",
      photo: photo3,
      time: "12:45 PM",
      message: "Hello, we have reviewed your records",
    },
  ];

  const classes = useStyles();

  useEffect(() => {
    setChatMediaActive(true);

    // eslint-disable-next-line
  }, [chatMediaActive]);

  return (
    <Grid container className={classes.parentGridContainer}>
      <Grid item className={classes.leftParentGrid}>
        <Grid container direction="column">
          <Grid item style={{ marginBottom: "2rem" }}>
            <AccountCircleIcon className={classes.contactIcon} />
          </Grid>
          <Grid item style={{ marginBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }}>
            <Search placeholder="Search messages..." className={classes.searchInput} />
          </Grid>
          <Grid item>
            {chatLists.map((list) => (
              <ChatItem key={list.id} chatList={list} />
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.rightParentGrid}>
        <ChatMessagesInterface />
      </Grid>
    </Grid>
  );
};

Chat.propTypes = {
  chatMediaActive: PropTypes.bool.isRequired,
  setChatMediaActive: PropTypes.func.isRequired,
};

export default Chat;
