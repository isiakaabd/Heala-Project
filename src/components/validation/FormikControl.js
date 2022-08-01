import React from "react";
import Input from "./Input";
import Selects from "./Select";
import Checkboxes from "./Checkboxs";
import DateComponent from "./Date";
import Textarea from "./Textarea";
import PropTypes from "prop-types";
import Files from "./File";
import DateTimePicker from "./DateTimePicker";

const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Selects {...rest} />;
    case "check":
      return <Checkboxes {...rest} />;
    case "date":
      return <DateComponent {...rest} />;
    case "file":
      return <Files {...rest} />;
    case "time":
      return <DateTimePicker {...rest} />;
    default:
      return null;
  }
};
FormikControl.propTypes = {
  control: PropTypes.string,
};
export default FormikControl;
