export const setAccessToken = (value) => {
  return localStorage.setItem("token", value);
};
export const getAccessToken = () => {
  return localStorage.getItem("token");
};
