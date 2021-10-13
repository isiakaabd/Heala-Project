import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "components/Utilities/CustomButton";
import { BsExclamationCircle } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    "&.MuiSvgIcon-root": {
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.red,
      },
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "65vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
};

const DisablePatient = ({ open, setOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  const discardButton = {
    background: theme.palette.info.main,
    hover: theme.palette.info.light,
    active: theme.palette.info.dark,
  };

  const disableButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.primary.light,
    active: theme.palette.primary.dark,
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
          <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item alignSelf="flex-end" style={{ padding: "2rem 2rem 3rem 0" }}>
              <CloseIcon
                color="primary"
                className={classes.closeIcon}
                onClick={() => setOpen(false)}
              />
            </Grid>
            <Grid item style={{ marginBottom: "4rem" }}>
              <BsExclamationCircle size="10rem" color={theme.palette.warning.main} />
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <Typography variant="h2">Disable Patient</Typography>
            </Grid>
            <Grid item style={{ marginBottom: "5rem" }}>
              <Typography variant="body1">Are you sure to want to disable patient?</Typography>
            </Grid>
            <Grid item container style={{ padding: "0 7rem" }}>
              <Grid item md style={{ marginRight: "2rem" }}>
                <CustomButton
                  title="Discard"
                  textColor={theme.palette.common.dark}
                  type={discardButton}
                  width="100%"
                />
              </Grid>
              <Grid item md style={{ marginLeft: "2rem" }}>
                <CustomButton title="Yes, disable" type={disableButton} width="100%" />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

DisablePatient.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default DisablePatient;
