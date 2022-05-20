import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Chip, Divider, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import displayPhoto from "assets/images/avatar.svg";
import { PreviousButton } from "components/Utilities";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReactHTMLParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
  parentGrid: {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0px 0px 5px -1px rgba(0,0,0,0.1)",
  },
  gridWrapper: {
    padding: "3rem 5rem",
  },
  chip: {
    "&.MuiChip-root": {
      fontSize: "1.25rem",
      height: "3rem",
      borderRadius: "1.3rem",
      background: theme.palette.common.white,
      color: theme.palette.common.green,
      "& .MuiChip-deleteIcon": {
        color: "inherit",
        fontSize: "inherit",
      },
    },
  },
}));

const ViewMail = ({ selectedMenu, setSelectedMenu /* selectedSubMenu, setSelectedSubMenu  */ }) => {
  const { emailId } = useParams();

  const classes = useStyles();
  const { emailData } = useSelector((state) => state.tables);
  const details = emailData[emailId];
  const parseTextArea = ReactHTMLParser(details.textarea);

  useEffect(() => {
    setSelectedMenu(6);
    /* setSelectedSubMenu(7); */
    //   eslint-disable-next-line
  }, [selectedMenu /* selectedSubMenu */]);
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/email`} />
      </Grid>
      <Grid item container direction="column" className={classes.parentGrid}>
        <Grid item className={classes.gridWrapper}>
          <Typography variant="h3"> {details.message}</Typography>
        </Grid>
        <Divider />
        <Grid item container style={{ padding: "1.5rem 5rem" }}>
          <Grid container alignItems="center" flexWrap="nowrap">
            <Grid item container alignItems="center" gap={2}>
              <Grid item>
                <Chip
                  avatar={<Avatar alt="name" src={displayPhoto} />}
                  label="Doctor's Name "
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Chip
                  variant="outlined"
                  deleteIcon={<ArrowForwardIosIcon />}
                  onClick={() => window.open(`mailto:${details.email}`, "_blank")}
                  onDelete={() => console.log(" ")}
                  label={details.email}
                  className={classes.chip}
                />
              </Grid>
            </Grid>
            <Divider orientation="vertical" />
            <Divider orientation="vertical" />
            <Grid item container></Grid>
            <Grid item container>
              <Grid container rowSpacing={1} columnSpacing={2}>
                {details.name.map((item) => {
                  return (
                    <Grid item key={item}>
                      <Chip
                        avatar={<Avatar alt={item} src={displayPhoto} />}
                        label={item}
                        variant="outlined"
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item className={classes.gridWrapper} style={{ lineHeight: 1.85, fontSize: "1.5rem" }}>
          {/* <Typography variant="body1" style={{ lineHeight: 1.85 }}> */}
          {parseTextArea}
          {/* </Typography> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

ViewMail.propTypes = {
  selectedMenu: PropTypes.number,
  selectedSubMenu: PropTypes.number,
  setSelectedMenu: PropTypes.func,
  /* setSelectedSubMenu: PropTypes.func, */
};

export default ViewMail;
