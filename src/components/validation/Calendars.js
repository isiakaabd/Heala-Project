import React from "react";
import { Formik, Form } from "formik";
import { Typography, Container, Button, Box } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

const Calendars = ({ name, label }) => {
  return (
    <Box width="100%" mb={2}>
      {/* Material Ui Date Picker */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          name={name}
          label={label}
          inputVariant="outlined"
          format="MM/dd/yyyy"
          value={value}
          onChange={onChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default Calendars;
