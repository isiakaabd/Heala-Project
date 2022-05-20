import React from "react";
import { ErrorMessage } from "formik";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { TextError } from "components/Utilities/TextError";
import { CustomButton, Loader } from "components/Utilities";
import {
  showErrorMsg,
  showSuccessMsg,
  compressAndUploadImage,
  uploadImage,
} from "helpers/filterHelperFunctions";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  min-height: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #777171;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  backgroundColor: "#eaeaea",
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  backgroundColor: "#eaeaea",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  backgroundColor: "#eaeaea",
  width: "auto",
  height: "100%",
};

const errorContainer = {
  margin: "1rem 0rem",
};

const DragAndDrop = ({ name, setFieldValue, maxFiles }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState();
  const [isCompleted, setIsCompleted] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, open } = useDropzone({
    accept: "application/.csv",
    maxFiles: maxFiles,
    autoFocus: true,
    onDropAccepted: (acceptedFiles) => {
      const filenameArr = acceptedFiles[0].name.split(".");
      if (filenameArr[filenameArr.length - 1] !== "csv") {
        showErrorMsg(
          enqueueSnackbar,
          Typography,
          "This file is not supported. Please select a .CSV file.",
        );
        return;
      }
      setProgress(1);

      compressAndUploadImage(
        acceptedFiles[0],
        uploadImage,
        setPreview,
        name,
        setFieldValue,
        setProgress,
        setIsCompressing,
        setIsCompleted,
      );

      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onloadend = (e) => setPreview(reader.result);
    },
  });

  const buttonType = {
    background: theme.palette.common.black,
    hover: theme.palette.primary.main,
    active: theme.palette.primary.dark,
  };

  useEffect(() => {
    isCompleted === "passed" &&
      showSuccessMsg(enqueueSnackbar, Typography, "Image upload complete.");
    if (isCompleted === "failed") {
      showErrorMsg(enqueueSnackbar, Typography, "Image upload failed, Try again.");
    }
  }, [isCompleted]);

  return (
    <div>
      <div className="container">
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <Typography>
            Drag and drop your file(s), or click to select files or Click on the button below
          </Typography>
          <Grid item container justifyContent="center" style={{ marginTop: "15px" }}>
            <CustomButton
              variant="contained"
              title=" Select file(s)"
              type={buttonType}
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            />
          </Grid>
        </Container>
      </div>
      <div style={errorContainer}>
        <ErrorMessage name={name} component={TextError} />
      </div>
      <aside style={{ marginTop: "1.5rem" }}>
        <Grid item>
          {progress < 100 || isCompressing ? (
            <Grid container item direction="row" justifyContent="center" alignItems="center">
              <Typography display={"inline"}>
                {isCompressing ? "Compressing file" : "Uploading file"}
              </Typography>
              <Loader />
            </Grid>
          ) : preview && isCompleted !== "failed" ? (
            <div style={thumb}>
              <div style={thumbInner}>
                <img src={preview} alt="preview" style={img} />
              </div>
            </div>
          ) : (
            ""
          )}
        </Grid>
      </aside>
    </div>
  );
};

export default DragAndDrop;
