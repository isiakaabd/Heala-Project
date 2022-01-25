import * as actionType from "store/action-types";

const initialState = {
  toggleText: false,
};

const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_HELLO_WORLD:
      return {
        toggleText: !state.toggleText,
      };
    default:
      return state;
  }
};

export default entitiesReducer;
