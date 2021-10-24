import React from "react";
import Input from "./Input";
import Selects from "./Select";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
    case "select":
      return <Selects {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};
export default FormikControl;
