import React from "react";
import t from "prop-types";
import { CustomButton } from "../Utilities";
import { useTheme } from "@mui/material/styles";

export const ClearFiltersBtn = ({ title, onHandleClick }) => {
  const theme = useTheme();
  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };
  return (
    <CustomButton
      title={title}
      type={buttonType}
      onClick={() => {
        onHandleClick();
      }}
    />
  );
};

ClearFiltersBtn.propTypes = {
  title: t.string,
  onHandleClick: t.func,
};
