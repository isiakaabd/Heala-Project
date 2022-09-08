import { format } from "date-fns";
import moment from "moment";

export const arrangeItems = (array) => {
  let finalArray = [];
  let n = 0;
  let arrayValues = [];
  let arrayObject = {};
  arrayObject.name = undefined;

  // array.sort();
  array.forEach((element) => {
    let container = element.split(":");
    if (arrayObject.name == container[0]) {
      arrayValues.push(container[1]);
      arrayObject.value = arrayValues;
    } else {
      finalArray[n] = arrayObject;
      arrayValues = [];
      arrayObject = {};
      arrayObject.name = container[0];
      arrayValues.push(container[1]);
      arrayObject.value = arrayValues;
      n += 1;
    }
  });
  finalArray.shift();
  return finalArray;
};

export const removeEmptyStringValues = (obj) => {
  try {
    let newObj = {};
    for (const key in obj) {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  } catch (err) {
    console.err("error from removeEmptyStringValues FN", err);
    return obj;
  }
};

export const setSideNav = (appNavData, pathname, setNav) => {
  try {
    const pathArr = pathname.split("/");
    if (pathArr.length < 2) {
      setNav(0);
      return;
    }

    appNavData.map((data) => {
      if (data.path === `/${pathArr[1]}`) {
        setNav(data?.id);
      }
    });
  } catch (error) {
    console.log("Something sent wrong with setSideNav FN", error);
  }
};

export const dateMoment = (dateString) => {
  const formatedDate = moment(dateString).utc().format("YYYY-MM-DD");
  if (formatedDate === "Invalid date") {
    return null;
  } else {
    return formatedDate;
  }
};

export const getSearchPlaceholder = (filterBy) => {
  return filterBy === "id"
    ? "Search by ID e.g 7NE6ELLO"
    : filterBy === "firstName"
    ? "Search by first name e.g John"
    : filterBy === "lastName"
    ? "Search by last name e.g Doe"
    : "";
};
export const HealGgetSearchPlaceholder = (filterBy) => {
  return filterBy === "id" ? "Search by UserTypesId " : "";
};

export const getDynamicSearchPlaceholder = (
  filterBy,
  obj = { hmoId: "Search by HMO ID" }
) => {
  let placeHolder = "";
  Object.keys(obj).forEach((key) => {
    if (key === filterBy) placeHolder = obj[key];
  });
  return placeHolder;
};

export const getInitials = (name) => {
  try {
    const splitedNamesArr = name.split(" ");

    const initailsArr = splitedNamesArr.map((name) => {
      const splitedNameArr = name.split("");
      return splitedNameArr[0];
    });

    return initailsArr.join("");
  } catch (error) {
    console.error("error from getInitials func.", error);
    return "";
  }
};

export const formatDate = (date, formatType) => {
  try {
    const parsedDate = Date.parse(date);
    const formatedDate = format(parsedDate, formatType);
    return formatedDate;
  } catch (error) {
    console.error(error);
    return "No date";
  }
};
