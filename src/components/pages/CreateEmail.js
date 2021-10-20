import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CustomButton from "components/Utilities/CustomButton";
import PreviousButton from "components/Utilities/PreviousButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChipInput from "material-ui-chip-input";
import { rows } from "components/Utilities/DataHeader";

import { useActions } from "components/hooks/useActions";

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
  inputChip: {
    marginLeft: ".8rem",
    "& .WAMuiChipInput-chipContainer-21": {
      position: "relative",
      "&::before,&::after": {
        borderBottom: "none !important",
      },
    },
    "& .MuiChip-root": {
      fontSize: "1.3rem",
      fontWeight: 600,
      border: "none !important",
      color: theme.palette.primary.main,
    },
    "& .MuiInputBase-input": {
      fontSize: "1.3rem",
    },
  },
  heading: {
    "&.MuiTypography-root": {
      color: theme.palette.common.grey,
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

const CreateEmail = ({ selectedMenu, selectedSubMenu, setSelectedMenu, setSelectedSubMenu }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { emailData } = useActions();

  const [state, setstate] = useState({
    id: Math.floor(Math.random() * 100 + 1),
    name: [],
    message: "",
    textarea: "",
    entryData: "July 17, 2021",
    plan: "HCP",
    email: "Sule@gmail.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };

  const handleDeleteChip = (chip) => {
    const emails = state.name;
    const filteredMessage = emails.filter((ele) => ele !== chip);

    setstate({ ...state, name: filteredMessage });
  };
  const handleDialogCloses = () => {
    emailData(state);
    setstate({
      name: [],
      message: "",
      textarea: "",
    });
  };
  const handleAddChip = (chip) => {
    setstate({ ...state, name: [...state.name, chip] });
  };
  const { name, message, textarea } = state;

  const greenButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };
  useEffect(() => {
    setSelectedMenu(6);
    setSelectedSubMenu(7);

    // eslint-disable-next-line
  }, [selectedMenu, selectedSubMenu]);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginBottom: "3rem" }}>
        <PreviousButton path={`/email`} />
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: "3rem" }}>
            Create new Email
          </Typography>
        </Grid>
        <Grid item container direction="column" className={classes.gridWrapper}>
          <Grid item style={{ marginBottom: "3rem" }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" className={classes.heading}>
                  Recipient(s):
                </Typography>
              </Grid>
              <Grid item className={classes.inputGrid}>
                <ChipInput
                  value={name}
                  fullWidth
                  className={classes.inputChip}
                  dataSource={rows.email}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
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
                  onChange={handleChange}
                  name="message"
                  value={message}
                  className={classes.formInput}
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
                  name="textarea"
                  value={textarea}
                  onChange={handleChange}
                  className={`${classes.formInput}  ${classes.textArea}`}
                />
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item style={{ alignSelf: "flex-end", marginTop: "2rem" }}>
            <CustomButton
              title="Send Mail"
              type={greenButton}
              onClick={handleDialogCloses}
              endIcon={<ArrowForwardIosIcon style={{ fontSize: "1.5rem" }} />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CreateEmail.propTypes = {
  selectedMenu: PropTypes.number.isRequired,
  selectedSubMenu: PropTypes.number.isRequired,
  setSelectedMenu: PropTypes.func.isRequired,
  setSelectedSubMenu: PropTypes.func.isRequired,
};

export default CreateEmail;
