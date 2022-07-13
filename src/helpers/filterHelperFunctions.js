import axios from "axios";
import t from "prop-types";
import React from "react";
import { Typography } from "@mui/material";
import { removeEmptyStringValues } from "./func";

export const showErrorMsg = (enqueueSnackbar, errorMsg) => {
  enqueueSnackbar(
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

export const showSuccessMsg = (enqueueSnackbar, Typography, successMsg) => {
  enqueueSnackbar(
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

export const getErrorMsg = (error) => {
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

export const handleError = (error, enqueueSnackbar) => {
  try {
    if (error?.graphQLErrors && error?.graphQLErrors?.length > 0) {
      (error?.graphQLErrors || []).map((err) =>
        showErrorMsg(enqueueSnackbar, err.message)
      );
    } else if (error?.networkError) {
      error.networkError?.result?.errors?.map((err) =>
        showErrorMsg(
          enqueueSnackbar,
          err.message || "Something went wrong, try again."
        )
      );
    } else if (error?.message) {
      console.log(error?.message);
      showErrorMsg(enqueueSnackbar, error.message);
    }
  } catch (error) {
    showErrorMsg(enqueueSnackbar, "Something went wrong. Try again!!!");
  }
};

export const deleteVar = (variable) => {
  for (const key in variable) {
    delete variable[key];
  }
};

export const filterData = async (filterVaribles, queryParams) => {
  try {
    const { fetchData, refetch, variables } = queryParams;
    const newFilterVaribles = removeEmptyStringValues(filterVaribles);
    const getData = () => {
      if (newFilterVaribles === {}) {
        deleteVar(variables);
        return refetch();
      } else {
        return fetchData({ variables: newFilterVaribles });
      }
    };

    const { data } = await getData();

    if (!data) {
      throw Error("something went wrong while filtering by status");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DON'T USE ...
export const onFilterValueChange = async (
  e,
  name,
  filterValues,
  setFilterValues,
  fetchData,
  variables,
  refetchData
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

export const resetFilters = (
  setFilterValues,
  values,
  variables,
  refetchData
) => {
  setFilterValues(values);
  for (const key in variables) {
    delete variables[key];
  }
  refetchData();
};

export const changeTableLimit = async (fetchFunc, variables) => {
  try {
    return fetchFunc({
      variables: variables,
    });
  } catch (error) {
    console.log("couldn't change table limit", error);
  }
};

export const handlePageChange = (fetchDataFN, type, pageInfo, variables) => {
  const getData = (pageNumber) => {
    return fetchDataFN({
      variables: {
        page: pageNumber,
        first: pageInfo?.limit || 10,
        ...variables,
      },
    });
  };
  switch (type) {
    case "FIRSTPAGE":
      return getData(1);

    case "NEXTPAGE":
      return getData(pageInfo?.nextPage || 1);

    case "PREVPAGE":
      return getData(pageInfo?.prevPage || 1);

    case "LASTPAGE":
      return getData(pageInfo?.totalPages || 1);

    default:
      return;
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
  setIsCompleted
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
  isDeleting
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
    showSuccessMsg(
      enqueueSnackbar,
      Typography,
      "Partner deleted successfully."
    );
    resetId(null);
    newIsDeleting[id] = false;
    setIsDeleting({ ...newIsDeleting });
  } catch (error) {
    resetId(null);
    newIsDeleting[id] = false;
    setIsDeleting({ ...newIsDeleting });
    console.log("couldn't delete partner from deletePartner FN", error);
    handleError(error, enqueueSnackbar);
  }
};

export const IsImg = (file) => {
  const imgFormatsRegex = new RegExp(
    /(jpeg|png|jpg|webp|jpg|jpeg|jfif|pjpeg|pjp|svg)/
  );
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
