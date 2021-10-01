import { combineReducers } from "redux";
import tablesReducer from "store/reducers/tablesReducer";

const reducers = combineReducers({
  tables: tablesReducer,
});

export default reducers;
