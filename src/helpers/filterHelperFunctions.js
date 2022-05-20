import t from "prop-types";
import React from "react";
import { Typography } from "@mui/material";
import { removeEmptyStringValues } from "./func";

export const showErrorMsg = (enqueueSnackbar, errorMsg) => {
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

export const showSuccessMsg = (enqueueSnackbar, successMsg) => {
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

export const handleError = (error, enqueueSnackbar) => {
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
  word: t.string,
  length: t.number,
};
