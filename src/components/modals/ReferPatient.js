import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import FormSelect from "components/Utilities/FormSelect";
import CustomButton from "components/Utilities/CustomButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "80vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
};

const useStyles = makeStyles((theme) => ({
  headerGridWrapper: {
    padding: "1.5rem 2rem",
    background: "rgb(251, 251, 251)",
    borderRadius: "1rem",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
  },

  closeIcon: {
    "&.MuiSvgIcon-root": {
      fontSize: "2rem",
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.red,
      },
    },
  },
}));

const referralOptions = ["Hello", "World", "Goodbye", "World"];
const categoryOptions = ["First", "Second", "Third"];

const ReferPatient = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [referral, setReferral] = useState("");
  const [category, setCategory] = useState("");

  const buttonColorStyles = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
  };

  const handleClick = () => {
    console.log("Clicked");

    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Grid container>
            <Grid
              item
              container
              justifyContent="space-between"
              className={classes.headerGridWrapper}
            >
              <Grid item>
                <Typography variant="h5">Refer Patient</Typography>
              </Grid>
              <Grid item>
                <CloseIcon
                  color="secondary"
                  className={classes.closeIcon}
                  onClick={() => setOpen(false)}
                />
              </Grid>
            </Grid>
            <Grid item container style={{ padding: "2rem 2rem 3rem" }}>
              <Grid item md style={{ marginRight: "2rem" }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="body2" gutterBottom>
                      Referral Type
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormSelect
                      options={referralOptions}
                      value={referral}
                      onChange={(event) => setReferral(event.target.value)}
                      placeholderText="Select type"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md style={{ marginLeft: "2rem" }}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="body2" gutterBottom>
                      Category
                    </Typography>
                  </Grid>
                  <Grid item>
                    <FormSelect
                      options={categoryOptions}
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      placeholderText="Select Category"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" style={{ padding: "0 2rem 3rem" }}>
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  Referral Comment
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-multiline-static"
                  aria-label="referral comment"
                  multiline
                  rows={7}
                  fullWidth
                  placeholder="Type your referral comment"
                />
              </Grid>
            </Grid>
            <Grid item container style={{ padding: "2rem 2rem 3rem" }}>
              <CustomButton
                disableRipple
                title="Search available HCP"
                type={buttonColorStyles}
                endIcon={<SearchIcon sx={{ ml: 1 }} />}
                width="100%"
                onClick={handleClick}
              />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

ReferPatient.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ReferPatient;
