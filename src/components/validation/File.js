import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/Utilities/TextError";
import {
  FormControl,
  FormLabel,
  Grid,
  Avatar,
  Button,
  Typography,
} from "@mui/material";

import { Loader } from "components/Utilities";
import { RequiredIcon } from "components/Typography";
import {
  compressAndUploadImage,
  showErrorMsg,
  showSuccessMsg,
  uploadImage,
} from "../../helpers/filterHelperFunctions";

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
      borderRadius: "5px",
      fontSize: "1.4rem",
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
  const fileRef = useRef(null);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [preview, setPreview] = useState("");
  const [isCompleted, setIsCompleted] = React.useState(null);
  const [progress, setProgress] = useState();
  const [isCompressing, setIsCompressing] = React.useState(false);

  React.useEffect(() => {
    isCompleted === "passed" &&
      showSuccessMsg(enqueueSnackbar, Typography, "Image upload complete.");
    if (isCompleted === "failed") {
      showErrorMsg(
        enqueueSnackbar,
        Typography,
        "Image upload failed, Try again."
      );
    }
  }, [isCompleted]);

  const onChange = async (e) => {
    const file = e.target.files[0];
    setProgress(1);
    compressAndUploadImage(
      file,
      uploadImage,
      setPreview,
      name,
      setFieldValue,
      setProgress,
      setIsCompressing,
      setIsCompleted
    );

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => setPreview(reader.result);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {progress < 100 || isCompressing ? (
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography display={"inline"}>
            {isCompressing ? "Compressing image" : "Uploading image"}
          </Typography>
          <Loader />
        </Grid>
      ) : (
        <>
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
            {preview && isCompleted !== "failed" ? (
              <Avatar sx={{ backgroundColor: "#eaeaea" }} src={preview} />
            ) : (
              ""
            )}
          </Grid>
        </>
      )}
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
  const { name, label, isRequired, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>
        {label} {isRequired && <RequiredIcon />}
      </FormLabel>
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
  isRequired: PropTypes.bool,
};

export default Files;
