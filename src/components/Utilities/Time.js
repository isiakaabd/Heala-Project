import moment from "moment";
export const dateMoment = (dateString) => {
  return moment(dateString).utc().format("DD-MM-YYYY");
};
export const timeMoment = (dateString) => {
  return moment(dateString).format("hh:mm");
};

export const timeConverter = (str) => {
  const date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};
