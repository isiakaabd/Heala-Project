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
        color: "red",
      },
    },
  },
}));

const Modals = ({ isOpen, handleClose, title, color, children, rowSpacing, height }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height,
    bgcolor: "background.paper",
    borderRadius: "2rem",
    p: 4,
  };

  const classes = useStyles();
  return (
    <Grid container>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Grid container rowSpacing={rowSpacing ? rowSpacing : 3} className={classes.modal}>
            <Grid item container justifyContent="space-between" alignItems="center" flex="2">
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
    </Grid>
  );
};
Modals.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  height: PropTypes.string,
  rowSpacing: PropTypes.number,
};

Modals.defaultProps = {
  height: "80vh",
};

export default Modals;
