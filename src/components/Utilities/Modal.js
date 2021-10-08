import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "2rem",
  p: 4,
};
const Modals = ({ isOpen, handleClose, title, color, children }) => {
  const classes = useStyles();
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={3} className={classes.modal}>
            <Grid item container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h3">{title}</Typography>
              </Grid>
              <Grid item>
                <CloseIcon
                  color={color ? color : "secondary"}
                  className={classes.closeIcon}
                  onClick={handleClose}
                />
              </Grid>
            </Grid>
            {children}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Modals;
