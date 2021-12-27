import * as actionTypes from "store/action-types";

export const patientConsultation = (data) => async (dispatch) => {
  console.log(data);
  dispatch({
    type: actionTypes.GET_PATIENT_CONSULTATION,
    payload: data,
  });
};
