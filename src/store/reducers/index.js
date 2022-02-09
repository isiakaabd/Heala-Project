import { combineReducers } from "redux";
import tablesReducer from "./tablesReducer";
import authReducer from "./authReducer";
import patientReducer from "./patientReducer";
import hcpReducer from "./hcpReducer";

const reducers = combineReducers({
  tables: tablesReducer,
  auth: authReducer,
  patient: patientReducer,
  hcp: hcpReducer,
});

export default reducers;
