import React from "react";
import Input from "./Input";
import Selects from "./Select";
import Checkboxs from "./Checkbox";
import DateComponent from "./Date";
import Textarea from "./Textarea";
import PropTypes from "prop-types";
import Files from "./File";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Selects {...rest} />;
    case "checkbox":
      return <Checkboxs {...rest} />;
    case "date":
      return <DateComponent {...rest} />;
    case "file":
      return <Files {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string.isRequired,
};
export default FormikControl;
