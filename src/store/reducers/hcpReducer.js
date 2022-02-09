import * as actionTypes from "store/action-types";
const initialState = {
  consultation: null,
};

const hcpReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DOCTOR_CONSULTATION:
      return {
        ...state,
        consultation: action.payload,
      };

    default:
      return state;
  }
};

export default hcpReducer;
