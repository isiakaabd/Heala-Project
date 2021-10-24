import React from "react";
import PropTypes from "prop-types";
import { ChipInput } from "material-ui-formik-components";
import { TextError } from "components/Utilities/TextError";

import { Field, ErrorMessage, useField, useFormik } from "formik";

const ReactSummerNote = (props) => {
  const [field] = useField(props);
  const { value, onChange } = field;
  console.log(props);
  return (
    // <Form
    //   initialValues={{
    //     states: [],
    //   }}
    //   onSubmit={() => console.log("submitted")}
    // >
    // {({ values, onSubmit }) => (
    //   <form onSubmit={onSubmit}>
    <Field name="name">
      {({ value, name, onChange }) => (
        <ChipInput
          value={value}
          disableUnderline
          field={field}
          placeholder="type states here"
          onAdd={(newVal) => {
            if (value.length >= 5) return;
            const newArr = [...value, newVal];
            onChange(newArr);
          }}
          onDelete={(deletedVal) => {
            const newArr = value.filter((state) => state !== deletedVal);
            onChange(newArr);
          }}
        />
      )}
    </Field>
  );
};
// };

ReactSummerNote.propTypes = {};
export default ReactSummerNote;
