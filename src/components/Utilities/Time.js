import moment from "moment";
export const dateMoment = (dateString) => {
  return moment(dateString).utc().format("DD-MM-YYYY");
};
export const timeMoment = (dateString) => {
  console.log(moment(dateString).format("hh:mm A"));
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
