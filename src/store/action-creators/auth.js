import * as actionTypes from "store/action-types";

export const loginUser = () => {
  return {
    type: actionTypes.SET_IS_AUTHENTICATED,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
