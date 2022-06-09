import axios from "axios";
import t from "prop-types";
import React from "react";
import { removeEmptyStringValues } from "./func";

export const showErrorMsg = (enqueueSnackbar, Typography, errorMsg) => {
  enqueueSnackbar(<Typography style={{ fontSize: "1.2rem" }}>{errorMsg}</Typography>, {
    variant: "error",
    preventDuplicate: true,
    anchorOrigin: {
      horizontal: "center",
      vertical: "top",
    },
    autoHideDuration: 10000,
  });
};

export const showSuccessMsg = (enqueueSnackbar, Typography, successMsg) => {
  enqueueSnackbar(<Typography style={{ fontSize: "1.2rem" }}>{successMsg}</Typography>, {
    variant: "success",
    preventDuplicate: true,
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
    autoHideDuration: 5000,
  });
};

export const handleError = (error, enqueueSnackbar, Typography) => {
  if (error?.graphQLErrors && error?.graphQLErrors?.length > 0) {
    (error?.graphQLErrors || []).map((err) =>
      showErrorMsg(enqueueSnackbar, Typography, err.message),
    );
  } else if (error?.networkError) {
    error.networkError?.result?.errors?.map((err) =>
      showErrorMsg(enqueueSnackbar, Typography, err.message || "Something went wrong, try again."),
    );
  } else if (error?.message) {
    showErrorMsg(enqueueSnackbar, Typography, error.message);
  }
};

export const onFilterValueChange = async (
  e,
  name,
  filterValues,
  setFilterValues,
  fetchData,
  variables,
  refetchData,
) => {
  const value = e?.target?.value;
  const newFilterData = { ...filterValues, [name]: value };
  setFilterValues(newFilterData);
  const newData = removeEmptyStringValues(newFilterData);
  if (value !== "") {
    fetchData({
      variables: newData,
    });
  } else {
    delete variables?.[name];
    refetchData();
  }
};

export const resetFilters = (setFilterValues, values, variables, refetchData) => {
  console.log(setFilterValues, values, variables, refetchData);
  setFilterValues(values);
  for (const key in variables) {
    delete variables[key];
  }
  refetchData();
};

export const changeTableLimit = async (limit, fetchFunc) => {
  try {
    fetchFunc({
      variables: {
        first: limit,
      },
    });
  } catch (error) {
    console.log("couldn't change table limit", error);
  }
};

export const handlePageChange = (fetchDataFN, type, pageInfo) => {
  const getData = (pageNumber) => {
    fetchDataFN({
      variables: {
        page: pageNumber,
        first: pageInfo.limit,
      },
    });
  };
  switch (type) {
    case "FIRSTPAGE":
      getData(1);
      break;

    case "NEXTPAGE":
      getData(pageInfo?.nextPage || 1);
      break;

    case "PREVPAGE":
      getData(pageInfo?.prevPage || 1);
      break;

    case "LASTPAGE":
      getData(pageInfo?.totalPages || 1);
      break;

    default:
      break;
  }
};

export const fetchMoreData = async (newPage, fetchData) => {
  fetchData({
    variables: {
      page: newPage,
    },
  });
};

export const trucateString = (word, length) => {
  try {
    const wordArr = word.split("");
    const newWord = `${wordArr.slice(0, length).join("")}...`;
    return newWord;
  } catch (error) {
    console.error("Error from trucateString FN", error);
    return word;
  }
};

trucateString.PropTypes = {
  word: t.string.isRequired,
  length: t.number.isRequired,
};

export const compressAndUploadImage = async (
  img,
  uploadFunc,
  setPreview,
  name,
  setFieldValue,
  setProgress,
  isCompressing,
  setIsCompleted,
) => {
  try {
    if (!img) throw new Error("No file passed to upload function");
    const uploadRes = await uploadFunc(img, setProgress);
    if (uploadRes === undefined) {
      throw new Error("couldn't upload image");
    }
    if (uploadRes) {
      setFieldValue(name, uploadRes);
      setIsCompleted("passed");
      setTimeout(() => {
        setIsCompleted(null);
      }, 1500);
    }
  } catch (error) {
    console.log("Error while trying to upload image", error);
    setProgress(100);
    setIsCompleted("failed");
    setTimeout(() => {
      setPreview(undefined);
      setIsCompleted(null);
    }, 1500);
  }
};

export const uploadImage = async (file, setProgress) => {
  try {
    const form = new FormData();
    form.append("file", file);
    const data = await axios({
      method: "post",
      url: "https://api.heala.io/rest/media/upload/",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
      },
      data: form,
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    return data.data.data.mediaUrl; //data.data.mediaUrl
  } catch (error) {
    console.error(error);
    setProgress(100);
  }
};

export const deleteItem = async (
  deleteMutation,
  id = "",
  resetId,
  refresh,
  Typography,
  enqueueSnackbar,
  setIsDeleting,
  isDeleting,
) => {
  const newIsDeleting = isDeleting;

  try {
    newIsDeleting[id] = true;
    setIsDeleting({ ...newIsDeleting });
    const { data } = await deleteMutation({
      variables: {
        id: id,
      },
    });

    if (!data) {
      resetId(null);
      newIsDeleting[id] = false;
      setIsDeleting({ ...newIsDeleting });
      showErrorMsg(enqueueSnackbar, Typography, "Couldn't delete, Try again.");
      return;
    }

    refresh();
    showSuccessMsg(enqueueSnackbar, Typography, "Partner deleted successfully.");
    resetId(null);
    newIsDeleting[id] = false;
    setIsDeleting({ ...newIsDeleting });
  } catch (error) {
    resetId(null);
    newIsDeleting[id] = false;
    setIsDeleting({ ...newIsDeleting });
    console.log("couldn't delete partner from deletePartner FN", error);
    handleError(error, enqueueSnackbar, Typography);
  }
};

export const IsImg = (file) => {
  const imgFormatsRegex = new RegExp(/(jpeg|png|jpg|webp|jpg|jpeg|jfif|pjpeg|pjp|svg)/);
  try {
    const fileArr = file?.name.split(".");
    const lastItem = fileArr[fileArr.length - 1];
    if (imgFormatsRegex.test(lastItem)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("couldn't check if file is an image", error);
    return false;
  }
};
