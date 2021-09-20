import * as actionType from "store/action-types";

export const toggleHelloWorld = () => {
  return {
    type: actionType.TOGGLE_HELLO_WORLD,
  };
};
