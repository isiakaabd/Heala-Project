import * as actionTypes from "store/action-types";
const initialState = {
  consultation: null,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENT_CONSULTATION:
      return {
        ...state,
        consultation: action.payload,
      };

    default:
      return state;
  }
};

export default patientReducer;
