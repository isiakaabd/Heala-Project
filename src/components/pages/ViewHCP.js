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
const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  height: "8.6rem",
  display: "flex",
  alignItems: "center",
  paddingLeft: "6.3rem",
  color: theme.palette.text.secondary,
}));
const gender = "Female";
// import ResponsiveDatePickers from "components/Utilities/DateComponent";
const useStyles = makeStyles((theme) => ({
  containerGrid: {
    background: "#fbfbfb !important ",
    color: "black !important",
  },
  lightGreen: {
    paddingLeft: "1.6rem",
    color: theme.palette.common.green,
  },

  lightRed: {
    paddingLeft: "1.6rem",
    color: theme.palette.common.red,
  },
  firstGrid: {
    height: "8.6rem",
    display: "flex",
    marginRight: "6.3rem",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    paddingLeft: "6.3rem",
    borderBottom: ".5px solid #F8F8F8",
    width: "100%",
  },
  imageGrid: {
    width: "2.4rem",
    height: "2.4rem",
    background: " #FEF8F7",
    borderRadius: ".5rem",
    display: "grid",
    placeContent: "center",
  },
  center: {
    alignItems: "center",
  },
  fileUpload: {
    borderBottom: "none !important",
  },
  "img .MuiAvatar-img.css-1pqm26d-MuiAvatar-img": {
    width: "1rem",
    "& img": {
      objectFit: "contain",
      width: "30%",
    },
    ".css-1pqm26d-MuiAvatar-img": {
      objectFit: "contain",
      width: "30%",
      height: "30%",
    },
  },
  date: {
    background: "#FEF8F7",
    // width: "2.4rem",
  },
  spacing: {
    borderBottom: ".5px solid #F8F8F8",
    margin: "0 !important",
    width: "100% !important",
    "& > *": {
      padding: "0 !important",
    },
  },
  header: { display: "flex", alignItems: "center", marginBottom: "4.6rem" },
  parentGrid: {
    marginTop: "4.6rem",
    borderRadius: "2rem",
    maxWidth: "94.6rem",
    height: "55rem",
    background: "white",
  },
}));
const ViewHCP = () => {
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
      <Grid item className={classes.parentGrid}>
        <Grid className={classes.firstGrid}>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: "#757886", fontSize: "1.6rem" }}>
              Date:
            </Typography>
            <Grid sx={{ marginLeft: "4.8rem " }}>
              <Grid className={classes.imageGrid}>
                <img src={date} alt="A clock icon" />
              </Grid>
            </Grid>
            <Box component="span" sx={{ marginLeft: "1.2rem" }}>
              7,July 2021
            </Box>
          </Grid>

          <Grid item sx={{ display: "flex", alignItems: "center", padding: " 0 5.1rem 0  1.8rem" }}>
            <Grid className={classes.imageGrid}>
              <img src={clock} className={classes.date} alt="A time icon " />
            </Grid>
            <Box component="span" sx={{ marginLeft: "1.2rem" }}>
              3:30PM
            </Box>
          </Grid>
        </Grid>

        {/* second grid */}
        <Grid container spacing={2} className={classes.spacing}>
          <Grid item xs={5}>
            <Item>
              <Typography variant="h6" sx={{ color: "#757886", fontSize: "1.6rem" }}>
                Patient:
              </Typography>

              <Avatar sx={{ marginLeft: "2rem" }} src={displayPhoto} />
              {/* <Box component="span">Sule muntari</Box> */}
              <Typography
                variant="h3"
                sx={{ color: "#2D2F39", fontSize: "1.6rem", marginLeft: "1.2rem" }}
              >
                Sule Muntari
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Typography variant="h6" sx={{ color: "#757886", fontSize: "1.6rem" }}>
                Medical ID:
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#2D2F39", fontSize: "1.6rem", marginLeft: ".8rem" }}
              >
                217878
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography variant="h6">Gender:</Typography>
              <Typography
                variant="h6"
                className={gender === "Female" ? classes.lightRed : classes.lightGreen}
              >
                {gender}
              </Typography>
            </Item>
          </Grid>
        </Grid>
        {/* third grid */}
        <Grid container spacing={2} className={`${classes.spacing} ${classes.fileUpload}`}>
          <Grid item xs={5} className={classes.fileUpload}>
            <Item>
              <Typography variant="h6" sx={{ color: "#757886", fontSize: "1.6rem" }}>
                File Uploads:
              </Typography>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.spacing}>
          {imageuploadContainer.map((img, index) => {
            return (
              <Grid item xs={4} key={index}>
                <Item>
                  <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                    <Grid item xs={3}>
                      <Avatar variant="square" src={imageUpload} />
                    </Grid>
                    <Grid item xs={7}>
                      <Box component="div" sx={{ fontSize: "1.6rem" }}>
                        {img.text}
                      </Box>
                      <Grid sx={{ marginTop: ".8rem" }}>
                        <Box component="span" sx={{ fontSize: "1.6rem" }}>
                          {img.value}
                        </Box>
                        <Box component="span" sx={{ fontSize: "1.6rem" }}>
                          {img.time}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={1} className={classes.center}>
                      <Avatar
                        variant="square"
                        sx={{ height: "2rem !important", width: ".8rem", objectFit: "contain" }}
                        src={threeDot}
                        className="image"
                      />
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
            );
          })}
        </Grid>

        <Grid
          container
          sx={{
            maxHeight: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
          }}
        >
          <Item
            sx={{
              marginRight: "5rem !important",
            }}
          >
            <IconLabelButtons
              placeholder="Verify HCP"
              height="4.8rem"
              width="14.2rem"
              backgroundColor="#ED3237"
              border="1rem"
              endIcon={<DoneSharpIcon />}
            />
          </Item>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default ViewHCP;
