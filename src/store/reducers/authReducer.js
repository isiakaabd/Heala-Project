import * as actionTypes from "store/action-types";
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_AUTHENTICATED:
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
