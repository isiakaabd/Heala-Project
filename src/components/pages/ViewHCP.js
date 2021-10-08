import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Avatar, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clock from "assets/images/clock.svg";
import date from "assets/images/date.svg";
import displayPhoto from "assets/images/avatar.png";
import imageUpload from "assets/images/imageUpload.svg";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import CustomButton from "components/Utilities/CustomButton";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const gender = "Female";
const useStyles = makeStyles((theme) => ({
  containerGrid: {
    background: "#fbfbfb !important ",
    color: "black !important",
    marginLeft: 0,
  },
  lightGreen: {
    color: theme.palette.common.green,
  },

  lightRed: {
    color: theme.palette.common.red,
  },
  firstGrid: {
    display: "flex",
    // marginRight: "6.3rem",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    paddingLeft: "6.3rem",
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
    margin: "0 !important",
    width: "100% !important",
  },
  parentGrid: {
    marginTop: "4.6rem",
    borderRadius: "2rem",
    maxWidth: "94.6rem",
    background: "white",
    overflow: "hidden",
    boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
    "& > *": {
      borderBottom: ".5px solid #F8F8F8",
      padding: " 0 0 0 6.3rem !important",
      minHeight: "8.3rem",
      "&:hover": {
        background: "#fafafa",
        cursor: "pointer",
      },
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
}));

const ViewHCP = () => {
  const theme = useTheme();
  const redButton = {
    background: theme.palette.error.main,
    hover: theme.palette.error.light,
    active: theme.palette.error.dark,
  };
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

  // useEffect(() => {
  //   setSelectedMenu(7);
  //   setSelectedSubMenu(8);

  //   // eslint-disable-next-line
  // }, [selectedMenu, selectedSubMenu]);
  return (
    <Grid position="static" className={classes.containerGrid}>
      <Grid component="div">
        <Typography variant="h1"> HCP view</Typography>
      </Grid>

      <Grid container className={classes.parentGrid}>
        <Grid item container className={classes.firstGrid} component="row">
          <Grid container sx={{ maxWidth: "40%" }}>
            <Grid
              item
              sm
              container
              sx={{ justifyContent: "space-between", alignItems: "center", minWidth: "60%" }}
            >
              <Grid item>
                <Typography variant="h6" color="text.secondary">
                  Date:
                </Typography>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <img src={date} alt="A clock icon" />
              </Grid>
              <Grid item>
                <Typography variant="h6">7,July 2021</Typography>
              </Grid>
            </Grid>

            <Grid item sm container sx={{ justifyContent: "space-around", alignItems: "center" }}>
              <Grid item className={classes.imageGrid}>
                <img src={clock} className={classes.date} alt="A time icon " />
              </Grid>
              <Grid item>
                <Typography variant="h6" component="span">
                  3:30PM
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* second grid */}
        <Grid container spacing={2}>
          <Grid item sm container xs={5} spacing={2} sx={{ alignItems: "center" }}>
            <Grid item>
              <Typography variant="h6" color="text.secondary">
                Patient:
              </Typography>
            </Grid>
            <Grid item>
              <Avatar src={displayPhoto} />
            </Grid>
            <Grid item>
              <Typography variant="h5">Sule Muntari</Typography>
            </Grid>
          </Grid>
          <Grid item sm container spacing={2} xs={12} sx={{ alignItems: "center" }}>
            <Grid item>
              <Typography variant="h5">Medical ID:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">217878</Typography>
            </Grid>
          </Grid>
          <Grid item sm container spacing={2} xs={12} sx={{ alignItems: "center" }}>
            <Grid item>
              <Typography variant="h6">Gender:</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                className={gender === "Female" ? classes.lightRed : classes.lightGreen}
              >
                {gender}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* third grid */}

        <Grid container>
          <Grid item xs={5} sm={12} component="div">
            <Typography variant="h6" color="text.secondary" sx={{ padding: "2rem 0" }}>
              File Uploads:
            </Typography>
          </Grid>

          <Grid container>
            <Grid item sm container spacing={2} className={classes.spacing}>
              {imageuploadContainer.map((img, index) => {
                return (
                  <Grid container direction="row" xs={4} key={index} sx={{ paddingBottom: "2rem" }}>
                    <Grid item xs={3}>
                      <Avatar variant="square" src={imageUpload} />
                    </Grid>
                    <Grid item xs={7}>
                      <Grid>
                        <Typography variant="h6">{img.text}</Typography>
                      </Grid>
                      <Grid item sm container direction="row">
                        <Typography variant="h6">{img.value}</Typography>
                        <Typography variant="h6">{img.time}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm container>
          <Grid item sx={{ margin: "auto 4rem auto auto" }}>
            <CustomButton endIcon={<DoneSharpIcon />} title="Verify HCP" type={redButton} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

ViewHCP.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default ViewHCP;
