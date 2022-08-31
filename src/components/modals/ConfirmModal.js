import React from "react";
import PropTypes from "prop-types";
import { Grid, Modal, Fade, Typography, Box, Backdrop } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "components/Utilities";
import { BsExclamationCircle } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    "&.MuiSvgIcon-root": {
      cursor: "pointer",

      "&:hover": {
        color: theme.palette.common.danger,
      },
    },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  minWidth: "40rem",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  padding: "3rem",
};

const ConfirmModal = ({
  open,
  setOpen,
  title,
  confirmationMsg,
  btnValue,
  type,
  onConfirm,
  onCancel,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const rejectBtn = {
    background: theme.palette.disabled.main,
    hover: theme.palette.common.gold,
    active: theme.palette.info.dark,
  };

  const acceptBtn = {
    background: theme.palette.primary.light,
    hover: theme.palette.success.main,
    active: theme.palette.disabled.main,
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
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item alignSelf="flex-end">
              <CloseIcon
                color="primary"
                fontSize="medium"
                className={classes.closeIcon}
                onClick={() => setOpen(false)}
              />
            </Grid>
            <Grid item style={{ marginBottom: "3rem" }}>
              <BsExclamationCircle
                size="10rem"
                color={theme.palette.warning.main}
              />
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <Typography variant="h2">{title}</Typography>
            </Grid>
            <Grid
              item
              style={{ marginBottom: "2rem" }}
              sx={{ textAlign: "center" }}
            >
              <Typography variant="body1">
                {"Are you sure you want to continue?"}
              </Typography>
              <Typography variant="body1">{`${confirmationMsg}`}</Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              gap={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item md>
                <CustomButton
                  title="Cancel"
                  type={rejectBtn}
                  width="100%"
                  onClick={() => setOpen(false)}
                />
              </Grid>
              <Grid item md>
                <CustomButton
                  title={"Confirm"}
                  type={acceptBtn}
                  width="100%"
                  onClick={() => {
                    setOpen(false);
                    onConfirm();
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  confirmationMsg: PropTypes.string.isRequired,
  btnValue: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ConfirmModal;
