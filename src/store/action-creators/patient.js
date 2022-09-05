import * as actionTypes from "store/action-types";

export const patientConsultation = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.ADD_PROVIDER,
    payload: data,
  });
};
