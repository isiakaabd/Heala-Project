import * as actionType from "store/action-types";

export const setPage = (page) => {
  return {
    type: actionType.SET_PAGE,
    payload: page,
  };
};

export const setRowsPerPage = (rows) => {
  return {
    type: actionType.SET_ROWS_PER_PAGE,
    payload: rows,
  };
};

export const setSelectedRows = (selected) => {
  return {
    type: actionType.SET_SELECTED_ROWS,
    payload: selected,
  };
};
