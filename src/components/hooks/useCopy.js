import React from "react";
import t from "prop-types";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";

export const useCopy = () => {
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipBoard = (text, name) => {
    try {
      navigator.clipboard.writeText(text);
      enqueueSnackbar(
        <Typography
          style={{
            fontSize: "1.2rem",
            color: "ffffff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >{`${name ? name : "Text"} copied!!!`}</Typography>,
        {
          variant: "success",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        }
      );
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        <Typography
          style={{
            fontSize: "1.2rem",
            color: "ffffff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >{`Couldn't copy ${name ? name : "Text"}!!!`}</Typography>,
        {
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        }
      );
    }
  };

  return {
    copyToClipBoard,
  };
};

useCopy.PropTypes = {
  text: t.string,
  name: t.string,
};
