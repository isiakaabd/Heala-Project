import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import React from "react";

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showErrorMsg = (errorMsg) => {
    return enqueueSnackbar(
      <Typography style={{ fontSize: "1.2rem" }}>{`${errorMsg}`}</Typography>,
      {
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: "center",
          vertical: "top",
        },
        autoHideDuration: 10000,
      }
    );
  };

  const showSuccessMsg = (successMsg) => {
    return enqueueSnackbar(
      <Typography style={{ fontSize: "1.2rem" }}>{successMsg}</Typography>,
      {
        variant: "success",
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        autoHideDuration: 5000,
      }
    );
  };

  const getErrorMsg = (error) => {
    try {
      if (error?.graphQLErrors && error?.graphQLErrors?.length > 0) {
        const errMsgs = (error?.graphQLErrors || []).map((err) => err.message);
        return errMsgs || "Something went wrong. Try again!!!";
      } else if (error?.networkError) {
        const errMsgs = error?.networkError?.result?.errors?.map(
          (err) => err.message
        );
        return errMsgs || "Something went wrong. Try again!!!";
      } else if (error?.message) {
        return error.message;
      }
    } catch (error) {
      console.error("error from get error func.", error);
      return "Something went wrong. Try again!!!";
    }
  };

  const displayAlert = (type, message) => {
    switch (type) {
      case "success":
        return showSuccessMsg(message);

      case "error":
        if (typeof message === "object") {
          return (message || []).map((msg) => showErrorMsg(msg));
        } else {
          return showErrorMsg(message);
        }

      default:
        break;
    }
  };

  const watchFunction = (successMsg, errorMsg, promise) =>
    promise
      .then((data) => {
        if (!data) {
          displayAlert("error", "Something went wrong, try again.");
          throw Error("Something went wrong in watchFunction");
        }
        displayAlert("success", successMsg);
        return data;
      })
      .catch((error) => {
        const msg = getErrorMsg(error);
        displayAlert("error", msg || errorMsg);
        throw error;
      });

  return { displayAlert, watchFunction, getErrorMsg };
};
export default useAlert;
