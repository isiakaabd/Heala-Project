import moment from "moment";
export const dateMoment = (dateString) => {
  return moment(dateString).utc().format("DD-MM-YYYY");
};
export const timeMoment = (dateString) => {
  return moment(dateString).format("hh:mm");
};
