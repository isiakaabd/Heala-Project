import * as actionTypes from "store/action-types";

export const loginUser = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_SUCCESS,
    payload: data.data.login.account,
  });
};
export const userDetail = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_DETAIL,
    payload: data,
  });
};

export const loginFailue = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_FAILURE,
    payload: data,
  });
};
export const refreshAuth = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.REFRESH_USER,
    payload: data,
  });
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
// export const alert
