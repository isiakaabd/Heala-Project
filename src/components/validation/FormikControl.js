import React from "react";
import Input from "./Input";
import Selects from "./Select";
import Checkbox from "./Checkbox";
import Textarea from "./Textarea";
import PropTypes from "prop-types";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
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
