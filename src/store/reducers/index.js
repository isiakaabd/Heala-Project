import { combineReducers } from "redux";
import tablesReducer from "store/reducers/tablesReducer";
import authReducer from "store/reducers/authReducer";
import patientReducer from "store/reducers/patientReducer";

const reducers = combineReducers({
  tables: tablesReducer,
  auth: authReducer,
  patient: patientReducer,
});

export default reducers;
