var accessToken = "";

export const setAccessToken = (value) => {
  accessToken = value;
};

export const getAccessToken = () => {
  return accessToken;
};
