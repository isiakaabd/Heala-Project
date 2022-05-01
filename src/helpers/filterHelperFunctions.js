import { removeEmptyStringValues } from "./func";

export const onGenderValueChange = async (
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
