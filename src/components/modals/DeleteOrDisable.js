import React from "react";
import PropTypes from "prop-types";
import { Grid, Modal, Fade, Typography, Box, Backdrop } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "components/Utilities";
import { BsExclamationCircle } from "react-icons/bs";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    "&.MuiSvgIcon-root": {
      cursor: "pointer",

      "&:hover": {
        cursor: "pointer",
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
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
};

const DeleteOrDisable = ({
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

  const discardButton = {
    background: theme.palette.info.main,
    hover: theme.palette.common.gold,
    active: theme.palette.info.dark,
  };

  const disableButton = {
    background: theme.palette.primary.main,
    hover: theme.palette.common.danger,
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
        <Box
          sx={style}
          width={{ md: "30vw", sm: "30vw", xs: "80vw" }}
          padding={{ sm: 2, xs: 2, md: 4 }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item alignSelf="flex-end">
              <CloseIcon
                color="primary"
                fontSize="large"
                className={classes.closeIcon}
                onClick={() => setOpen(false)}
              />
            </Grid>
            <Grid item style={{ marginBottom: "3rem" }}>
              {type === "logout" ? (
                <LogoutRoundedIcon
                  sx={{ fontSize: "10rem", color: "red" }}
                  color={theme.palette.warning.main}
                />
              ) : (
                <BsExclamationCircle
                  size="10rem"
                  color={theme.palette.warning.main}
                />
              )}
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <Typography variant="h2">{title}</Typography>
            </Grid>
            <Grid item style={{ marginBottom: "2rem" }}>
              <Typography
                textAlign="center"
                variant="body1"
              >{`Are you sure you want to ${confirmationMsg}?`}</Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              rowGap={3}
              spacing={4}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item columms={{ lg: 6, md: 4, sm: 4, xs: 3 }} flex={1}>
                <CustomButton
                  title="Cancel"
                  textColor={theme.palette.common.black}
                  type={discardButton}
                  width="100%"
                  onClick={() => setOpen(false)}
                />
              </Grid>
              <Grid item columms={{ md: 4, sm: 4, xs: 3 }} flex={1}>
                <CustomButton
                  title={`Yes, ${btnValue}`}
                  type={disableButton}
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

DeleteOrDisable.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  title: PropTypes.string,
  confirmationMsg: PropTypes.string,
  btnValue: PropTypes.string,
  type: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DeleteOrDisable;
