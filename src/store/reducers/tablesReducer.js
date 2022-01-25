import * as actionType from "store/action-types";
const initialState = {
  page: 0,
  rowsPerPage: 5,
  selectedRows: [],
  emailData: [],
};

const tablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case actionType.SET_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    case actionType.SET_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: action.payload,
      };
    case actionType.EMAIL_DETAILS:
      return {
        ...state,
        emailData: [action.payload, ...state.emailData],
      };
    default:
      return state;
  }
};

export default tablesReducer;
