import { AppBar, Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { H1 } from "components/Utilities/Texts";
import React from "react";
import { makeStyles } from "@mui/styles";
import clock from "assets/images/clock.svg";
import date from "assets/images/date.svg";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import displayPhoto from "assets/images/avatar.png";
import imageUpload from "assets/images/imageUpload.svg";
import threeDot from "assets/images/threeDot.svg";
import IconLabelButtons from "components/Utilities/Button";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TodayIcon from "@mui/icons-material/Today";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  // heigh?t: "8.6rem",
  background: "red",
  maxWidth: 800,
  display: "flex",
  alignItems: "center",
  paddingLeft: "6.3rem",
  color: theme.palette.text.secondary,
}));
const gender = "Female";
const useStyles = makeStyles((theme) => ({
  containerGrid: {
    background: "#fbfbfb !important ",
    color: "black !important",
  },
}));
const ViewHCP2 = () => {
  const imageuploadContainer = [
    {
      value: "74.89KB, ",
      time: "Oct 17",
      text: "X-ray Scan Result",
    },
    {
      value: "74.89KB, ",
      time: "Oct 17",
      text: "X-ray Scan Result",
    },
    {
      value: "74.89KB",
      time: "Oct 17",
      text: "X-ray Scan Result",
    },
    {
      value: "74.89KB, ",
      time: "Oct 17",
      text: "X-ray Scan Result",
    },
    {
      value: "74.89KB, ",
      time: "Oct 17",
      text: "X-ray Scan Result",
    },
    {
      value: "74.89KB",
      time: "Oct 17",
      text: "X-ray Scan Result",
    },
  ];
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.containerGrid}>
      <Box component="span" className={classes.header}>
        <H1 fontSize="3.2rem" color="#4F4F4F">
          HCP view
        </H1>
      </Box>
      <Item sx={{ p: 2, margin: "auto", flexGrow: 1 }}>
        <Grid container direction="column">
          <Grid item></Grid>

          <Grid item container direction="row" sx={{ alignItems: "center" }}>
            <Grid item xs>
              <Typography variant="h4">Date</Typography>
            </Grid>
            <Grid item>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TodayIcon />
                  </ListItemIcon>
                  <ListItemText primary="7 July 2021" />
                </ListItemButton>
              </ListItem>
            </Grid>
          </Grid>

          <Grid item>
            asdfdjkfbsdjhkfbjk.igawFsdfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhkl
          </Grid>
        </Grid>
      </Item>
    </AppBar>
  );
};

export default ViewHCP2;
