import { combineReducers } from "redux";
import entitiesReducer from "store/reducers/entitiesReducer";

const reducers = combineReducers({
  entities: entitiesReducer,
});

export default reducers;
