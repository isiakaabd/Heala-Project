import * as actionTypes from "store/action-types";

export const loginUser = (data) => async (dispatch) => {
  const dataValue = await data.login.account;
  try {
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: dataValue,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: actionTypes.LOGIN_FAILURE,
      payload: err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.LOGOUT_FAILURE,
      payload: err,
    });
  }
};
