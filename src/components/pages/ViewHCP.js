import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Loader from "components/Utilities/Loader";
import NoData from "components/layouts/NoData";
import PropTypes from "prop-types";
import { Avatar, Grid, Typography, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import clock from "assets/images/clock.svg";
import date from "assets/images/date.svg";
import displayPhoto from "assets/images/avatar.svg";
import imageUpload from "assets/images/imageUpload.svg";
// import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import CustomButton from "components/Utilities/CustomButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PreviousButton from "components/Utilities/PreviousButton";
import { dateMoment, timeMoment } from "components/Utilities/Time";
import { useQuery } from "@apollo/client";
import { verification } from "components/graphQL/useQuery";

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

const ViewHCP = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const theme = useTheme();
  const { viewId } = useParams();
  const { loading, data, error } = useQuery(verification, { variables: { id: viewId } });
  const [respondData, setRespondData] = useState([]); //setRespondData
  useEffect(() => {
    try {
      if (data) {
        setRespondData(data.getVerification);
      }
    } catch (err) {
      console.log(err);
    }
  }, [data]);
  console.log(respondData);

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
    disabled: theme.palette.common.black,
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

  useEffect(() => {
    setSelectedMenu(7);
    setSelectedSubMenu(8);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  if (loading) return <Loader />;
  if (error) return <NoData error={error.message} />;
  return (
    <Grid position="static" className={classes.containerGrid}>
      <Grid item>
        <PreviousButton path="/verification" />
      </Grid>
      <Grid component="div">
        <Typography variant="h1"> HCP view</Typography>
      </Grid>

      <Grid container className={classes.parentGrid}>
        <Grid item container className={classes.firstGrid}>
          <Grid container sx={{ maxWidth: "40%" }}>
            <Grid
              item
              sm
              container
              sx={{ justifyContent: "space-between", alignItems: "center", minWidth: "60%" }}
            >
              <Grid item>
                <Typography variant="h6" color="secondary">
                  Date:
                </Typography>
              </Grid>
              <Grid item className={classes.imageGrid}>
                <img src={date} alt="A clock icon" />
              </Grid>
              <Grid item>
                <Typography variant="h6"> {dateMoment(respondData.updatedAt)}</Typography>
              </Grid>
            </Grid>

            <Grid item sm container sx={{ justifyContent: "space-around", alignItems: "center" }}>
              <Grid item className={classes.imageGrid}>
                <img src={clock} className={classes.date} alt="A time icon " />
              </Grid>
              <Grid item>
                <Typography variant="h6" component="span">
                  {timeMoment(respondData.updatedAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* second grid */}
        <Grid container flexWrap="nowrap" gap={3} alignItems="center">
          <Grid container flexWrap="nowrap" alignItems="center" gap={2} flex item>
            <Grid item>
              <Typography variant="h6" color="text.secondary">
                Patient:
              </Typography>
            </Grid>
            <Grid item>
              <Avatar src={displayPhoto} />
            </Grid>
            <Grid item>
              <Typography variant="h5">{respondData.profileId}</Typography>
            </Grid>
          </Grid>
          <Grid container gap={2} item>
            <Grid item>
              <Typography variant="h5">Medical ID:</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">217878</Typography>
            </Grid>
          </Grid>
          <Grid container gap={2} item>
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
                  <Grid container item xs={4} key={index} sx={{ paddingBottom: "2rem" }}>
                    <Grid item xs={3}>
                      <Avatar variant="square" src={imageUpload} />
                    </Grid>
                    <Grid item xs={7}>
                      <Grid>
                        <Typography variant="h6">{img.text}</Typography>
                      </Grid>
                      <Grid item sm container>
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
            <CustomButton
              title="Verify HCP"
              width="100%"
              type={buttonType}
              // isSubmitting={isSubmitting}
              // disabled={!(dirty || isValid)}
            />
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
