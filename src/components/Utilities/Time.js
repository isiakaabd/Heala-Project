import moment from "moment";
export const dateMoment = (dateString) => {
  return moment(dateString).utc().format("DD-MM-YYYY");
};
export const timeMoment = (dateString) => {
  return moment(dateString).format("hh:mm A");
};

export const timeConverter = (str) => {
  const date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};

export const hours = (z) => {
  let time = z.split(":")[0];
  if (time < 12) return `${z} AM`;
  if (time > 12) {
    let newTime = +time - 12;
    return `${newTime} PM`;
  } else return `${time} Noon`;
};

export const daily = (value) => {
  let result = "";
  if (value == 1) result = "daily";
  else result = `${value} days`;
  return result;
};
export const duration = (value) => {
  let result = "";
  if (value == 1) result = "once";
  if (value == 2) result = "twice";
  if (value == 3) result = "thrice";
  else if (value > 3) result = `${value} times`;
  return result;
};
