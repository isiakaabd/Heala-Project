import * as actionTypes from "store/action-types";

export const hcpConsultation = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_DOCTOR_CONSULTATION,
    payload: data,
  });
};
