import * as actionTypes from "store/action-types";
const initialState = {
  loading: true,
  token: localStorage.getItem("token"),
  dociId: localStorage.getItem("dociId"),
  userId: localStorage.getItem("userId"),
  authError: null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.login.account.access_token);
      localStorage.setItem("dociId", action.payload.data.login.account.dociId);
      localStorage.setItem("userId", action.payload.data.login.account._id);
      localStorage.setItem("refresh_token", action.payload.data.login.account.refresh_token);

      return {
        ...state,
        ...action.payload,
        loading: action.payload.loading,
        isAuthenticated: true,
      };
    case actionTypes.LOGIN_FAILURE:
      localStorage.removeItem("token");
      localStorage.removeItem("dociId");
      localStorage.removeItem("userId");
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        authError: action.payload,
        token: null,
        userId: null,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("dociId");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("refresh_token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userId: null,
        authError: null,
        dociId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
