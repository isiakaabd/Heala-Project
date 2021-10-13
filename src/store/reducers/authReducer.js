import * as actionTypes from "store/action-types";
const initialState = {
  isAuthenticated: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
