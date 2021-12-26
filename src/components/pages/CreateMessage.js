import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import Divider from "@mui/material/Divider";
// import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CREATE_MESSAGE } from "components/graphQL/Mutation";
import { useMutation } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    "&.MuiGrid-item": {
      borderRadius: "1rem",
      background: "#fff",
      padding: "2rem 4rem",
      maxWidth: "60rem !important",
      boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.1)",
    },
  },
  inputGrid: {
    flex: 1,
  },
  heading: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
      //   fontSize: "1rem"
    },
  },
  formInput: {
    width: "100%",
    height: "100%",
    fontSize: "1.5rem",
    padding: ".5rem 1rem",
    border: "none",
    background: "transparent",
    color: theme.palette.common.grey,

    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    borderRadius: "0.5rem",
  },
  divider: {
    "&.MuiDivider-root": {
      borderColor: "rgba(0, 0, 0, 0.03)",
    },
  },
}));

const CreateMessage = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  // const theme = useTheme();
  const [createNewMessage] = useMutation(CREATE_MESSAGE);
  // const greenButton = {
  //   background: theme.palette.primary.main,
  //   hover: theme.palette.primary.light,
  //   active: theme.palette.primary.dark,
  // };
  useEffect(() => {
    setSelectedMenu(5);
    setSelectedSubMenu(6);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);
  const [state, setState] = useState({
    subject: "",
    recipient: "",
    textarea: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const { subject, recipient, textarea } = state;
  const submitMesage = async (e) => {
    const id = localStorage.getItem("user_id");
    try {
      const { data } = await createNewMessage({
        variables: {
          sender: id,
          recipient,
          subject,
          body: textarea,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setState({
      subject: "",
      recipient: "",
      textarea: "",
    });
    e.preventDefault();
  };
  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/messages`} />
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: "3rem" }}>
            Create New Message
          </Typography>
        </Grid>
        <Grid item container direction="column" className={classes.gridWrapper}>
          <Grid item style={{ marginBottom: "3rem" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Recipient:{" "}
                </Typography>
              </Grid>
              <Grid item className={classes.inputGrid}>
                <input
                  className={classes.formInput}
                  name="recipient"
                  value={recipient}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item style={{ marginBottom: "3rem" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Subject:{" "}
                </Typography>
              </Grid>
              <Grid item className={classes.inputGrid}>
                <input
                  className={classes.formInput}
                  name="subject"
                  value={subject}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Message:{" "}
                </Typography>
              </Grid>
              <Grid item style={{ height: "15rem" }}>
                <textarea
                  className={`${classes.formInput} ${classes.textArea}`}
                  name="textarea"
                  value={textarea}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item style={{ alignSelf: "flex-end", marginTop: "2rem" }}>
            <CustomButton
              title="Send Message"
              // type={greenButton}
              type="submit"
              onClick={submitMesage}
              endIcon={<ArrowForwardIosIcon style={{ fontSize: "1.5rem" }} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CreateMessage.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default CreateMessage;
