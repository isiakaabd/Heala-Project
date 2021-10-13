import { combineReducers } from "redux";
import tablesReducer from "store/reducers/tablesReducer";
import authReducer from "store/reducers/authReducer";

const reducers = combineReducers({
  tables: tablesReducer,
  auth: authReducer,
});

export default reducers;
