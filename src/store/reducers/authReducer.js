import * as actionTypes from "store/action-types";
const initialState = {
  loading: false,
  token: localStorage.getItem("token"),
  dociId: localStorage.getItem("dociId"),
  userId: localStorage.getItem("userId"),
  authError: null,
  isAuthenticated: localStorage.getItem("isAuthenticated"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.GET_CREDENTIALS:
    // case actionTypes.GET_USER:
    //   return {
    //     ...state,
    //     loading: true,
    //     user: null,
    //     token: null,
    //     isAutheticated: false,
    //     authError: null,
    //   };
    //   // case actionTypes.USER_LOADED:
    //   localStorage.setItem("isAuthenticated", true);
    //   return {
    //     ...state,
    //     loading: false,
    //     isAuthenticated: true,
    //     user: action.payload,
    //     authError: null,
    //   };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("dociId", action.payload.dociId);
      localStorage.setItem("userId", action.payload._id);
      localStorage.setItem("refresh_token", action.payload.refresh_token);

      return {
        ...state,
        ...action.payload,
        loading: false,
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
