import React, { useRef, useState } from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import LinearWithValueLabel from "components/Utilities/LinearProgress";
import PropTypes from "prop-types";
import { FormControl, FormLabel, Grid, Avatar, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
  uploadBtn: {
    "&.MuiButton-root": {
      ...theme.typography.btn,
      background: "#f2f2f2",
      boxShadow: "none",
      color: theme.palette.common.black,

      "&:hover": {
        background: "#f2f3f3",
        boxShadow: "none",
      },

      "&:active": {
        boxShadow: "none",
      },
    },
  },
}));

export const Formiks = ({ name, setFieldValue, onBlur }) => {
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState();
  const classes = useStyles();
  const uploadImage = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      const data = await axios({
        method: "post",
        url: "https://api-staging.heala.io/rest/media/upload/",
        data: form,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
      return data.data.data.mediaUrl; //data.data.mediaUrl
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    const files = await uploadImage(file);
    setFieldValue(name, files);
  };
  const fileRef = useRef(null);
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <FormControl fullWidth>
          <Grid item container>
            <input
              accept="image/*"
              onChange={onChange}
              type="file"
              name={name}
              onBlur={onBlur}
              hidden
              ref={fileRef}
            />
            <Button
              variant="contained"
              onClick={() => fileRef.current.click()}
              component="span"
              className={classes.uploadBtn}
            >
              Upload Photo
            </Button>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item>
        {progress < 100 ? (
          <LinearWithValueLabel progres={progress} />
        ) : (
          preview && <Avatar src={preview} />
        )}
      </Grid>
    </Grid>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
};

const Files = (props) => {
  const { name, label, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={Formiks} label={label} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Files.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Files;
