import * as actionTypes from "store/action-types";

export const loginUser = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data,
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
