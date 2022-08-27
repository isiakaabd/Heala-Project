import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import CardHeader from "@mui/material/CardHeader";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, ClickAwayListener, Paper, Typography } from "@mui/material";
import { getInitials } from "helpers/func";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "22px",
    fontWeight: "600",
    color: theme.palette.common.gray500,
  },

  subHeader: {
    fontSize: "14px",
    fontWeight: "400",
    color: theme.palette.common.grey,
  },

  btn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },

  editBtn: {
    "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.common.blue,
      borderRadius: "10px 10px 0px 0px",
    },
  },

  delBtn: {
    "&:hover": {
      color: "#fff",
      backgroundColor: theme.palette.common.danger,
      borderRadius: "0px 0px 10px 10px",
    },
  },

  options: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    position: "absolute",
    top: 28,
    right: 15,
    zIndex: 1,

    "&>button": {
      padding: "1rem 2rem",
      fontSize: "14px",
      fontWeight: 400,
      color: "#2D2F39",
      borderBottom: "1px solid #E5E5E5",
      textAlign: "left",
    },

    "&>:last-child": {
      borderBottom: "none",
    },
  },
}));

const HmoCard = ({
  title,
  subTitle,
  onClickEdit,
  onClickDelete,
  linkTo,
  hasMenu = true,
  imgUrl,
  imgAlt,
  variant = "no-img",
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: "400px",
        minWidth: "320px",
        height: "120px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {hasMenu && (
        <div style={{ position: "absolute", right: "5%", top: "5%" }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: "relative" }}>
              <button
                className={classes.btn}
                style={{
                  padding: "0px",
                  margin: "0px",
                }}
                type="button"
                onClick={handleClick}
              >
                <MoreHorizIcon fontSize="large" sx={{ color: "#757886" }} />
              </button>
            </Box>
          </ClickAwayListener>
        </div>
      )}

      {open ? (
        <Paper className={classes.options} elavation={4}>
          <button
            className={`${classes.btn} ${classes.editBtn}`}
            onClick={() => onClickEdit()}
          >
            Edit
          </button>
          <button
            className={`${classes.btn} ${classes.delBtn}`}
            onClick={() => onClickDelete()}
          >
            Delete
          </button>
        </Paper>
      ) : null}

      <Link style={{ textDecoration: "none" }} to={linkTo || "#"}>
        <CardHeader
          avatar={
            <Avatar
              imgProps={{ height: "50px", width: "50px", objectFit: "contain" }}
              src={variant === "no-img" ? "" : imgUrl}
              alt={imgAlt}
              sx={{
                bgcolor: `${variant === "img" ? "#fff" : "#2D2F39"}`,
                height: "50px",
                width: "50px",
              }}
            >
              {getInitials(imgAlt)}
            </Avatar>
          }
          title={<Typography className={classes.title}>{title}</Typography>}
          subheader={
            <Typography className={classes.subHeader}>{subTitle}</Typography>
          }
        />
      </Link>
    </Card>
  );
};

HmoCard.propTypes = {
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
  linkTo: PropTypes.string,
  hasMenu: PropTypes.bool,
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  variant: PropTypes.oneOf(["no-img", "img"]),
};

export const AddHmoCard = () => {
  const classes = useStyles();

  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: "400px",
        minWidth: "320px",
        height: "120px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        border: "2px dashed #DBDBDB",
        cursor: "pointer",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D2F39", height: "50px", width: "50px" }}>
            <AddIcon fontSize="large" />
          </Avatar>
        }
        title={
          <Typography className={classes.title}>Create a new HMO</Typography>
        }
      />
    </Card>
  );
};

export default HmoCard;
