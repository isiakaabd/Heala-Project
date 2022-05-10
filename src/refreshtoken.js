var refreshToken = "";

export const setRefreshToken = (value) => {
  refreshToken = value;
};

export const getRefreshToken = () => {
  return refreshToken;
};
