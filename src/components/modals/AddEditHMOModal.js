import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Modal, Fade, Typography, Box, Backdrop } from "@mui/material";
import AddEditHMOForm from "components/Forms/AddEditHMOForm";

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

const AddEditHMOModal = ({
  isOpen,
  setIsOpen,
  type,
  initialValues,
  onSuccess,
}) => {
  const classes = useStyles();

  const style = {
    height: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "1rem",
    overflowY: "auto",
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box
          sx={style}
          width={{ md: "70vw", sm: "90vw", lg: "35vw", xs: "35vw" }}
          padding={{ sm: 2, xs: 2, md: 4 }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              item
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
                  {type === "edit" ? "Edit HMO" : "Add New HMO"}
                </Typography>
              </Grid>
              <Grid item>
                <CloseIcon
                  color="primary"
                  fontSize="large"
                  className={classes.closeIcon}
                  onClick={() => setIsOpen(false)}
                />
              </Grid>
            </Grid>
            <Grid item style={{ marginBottom: "3rem", width: "100%" }}>
              <AddEditHMOForm
                type={type}
                initialValues={initialValues}
                onSuccess={() => onSuccess()}
              />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

AddEditHMOModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["edit", "add"]),
  initialValues: PropTypes.object.isRequired,
};

export default AddEditHMOModal;
