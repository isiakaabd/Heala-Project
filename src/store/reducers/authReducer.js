import * as actionTypes from "store/action-types";
const initialState = {
  loading: true,
  authError: {},
  // isAuthenticated: false,
  healaID: null,
  id: localStorage.getItem("user_id"),
  userDetail: null,
  isAuthenticated: localStorage.getItem("auth") ? true : false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("auth", true);
      localStorage.setItem("user_id", action.payload._id);
      localStorage.setItem("token", action.payload.access_token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        healaID: action.payload.dociId,
        authError: action.payload.messages,
        id: action.payload._id,
      };
    case actionTypes.REFRESH_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case actionTypes.USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
        // isAuthenticated: true,
      };
    case actionTypes.LOGIN_FAILURE:
      localStorage.removeItem("auth");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("hcp");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        authError: action.payload,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("auth");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("hcp");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        userId: null,
        authError: {},
        dociId: null,
        healaID: null,
        id: null,
      };
    default:
      return state;
  }
};

export default authReducer;
