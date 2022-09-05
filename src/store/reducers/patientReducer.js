import * as actionTypes from "store/action-types";
const initialState = {
  provider: "",
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROVIDER:
      localStorage.setItem("provider", action.payload);
      return {
        provider: action.payload,
      };

    default:
      return state;
  }
};

export default patientReducer;
